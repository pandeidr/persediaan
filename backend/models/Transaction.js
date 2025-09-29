const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Transaction = sequelize.define('Transaction', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    transaction_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    reference_number: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    memo: {
      type: DataTypes.TEXT
    },
    total_amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    status: {
      type: DataTypes.ENUM('draft', 'posted', 'voided'),
      defaultValue: 'draft'
    },
    transaction_type: {
      type: DataTypes.ENUM(
        'journal_entry',
        'invoice',
        'payment',
        'expense',
        'deposit',
        'transfer',
        'adjustment',
        'opening_balance'
      ),
      allowNull: false
    },
    source_document_type: {
      type: DataTypes.ENUM(
        'manual',
        'invoice',
        'purchase_order',
        'bank_import',
        'inventory_adjustment',
        'payroll',
        'tax_payment'
      ),
      defaultValue: 'manual'
    },
    source_document_id: {
      type: DataTypes.UUID
    },
    posted_date: {
      type: DataTypes.DATE
    },
    voided_date: {
      type: DataTypes.DATE
    },
    void_reason: {
      type: DataTypes.TEXT
    },
    attachments: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    is_reconciled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    reconciliation_date: {
      type: DataTypes.DATE
    }
  }, {
    tableName: 'transactions',
    indexes: [
      {
        unique: true,
        fields: ['company_id', 'reference_number']
      },
      {
        fields: ['transaction_date']
      },
      {
        fields: ['status']
      },
      {
        fields: ['transaction_type']
      },
      {
        fields: ['source_document_type']
      },
      {
        fields: ['source_document_id']
      },
      {
        fields: ['created_by']
      },
      {
        fields: ['is_reconciled']
      }
    ]
  });

  // Instance methods
  Transaction.prototype.post = async function() {
    if (this.status !== 'draft') {
      throw new Error('Only draft transactions can be posted');
    }
    
    // Validate that debits equal credits
    const lines = await this.getTransactionLines();
    const totalDebits = lines.reduce((sum, line) => sum + parseFloat(line.debit_amount || 0), 0);
    const totalCredits = lines.reduce((sum, line) => sum + parseFloat(line.credit_amount || 0), 0);
    
    if (Math.abs(totalDebits - totalCredits) > 0.01) {
      throw new Error('Transaction is not balanced: debits must equal credits');
    }
    
    // Update account balances
    for (const line of lines) {
      const account = await line.getChartOfAccount();
      if (line.debit_amount > 0) {
        await account.updateBalance(line.debit_amount, true);
      }
      if (line.credit_amount > 0) {
        await account.updateBalance(line.credit_amount, false);
      }
    }
    
    this.status = 'posted';
    this.posted_date = new Date();
    return this.save();
  };

  Transaction.prototype.void = async function(reason) {
    if (this.status !== 'posted') {
      throw new Error('Only posted transactions can be voided');
    }
    
    // Reverse account balance changes
    const lines = await this.getTransactionLines();
    for (const line of lines) {
      const account = await line.getChartOfAccount();
      if (line.debit_amount > 0) {
        await account.updateBalance(-line.debit_amount, true);
      }
      if (line.credit_amount > 0) {
        await account.updateBalance(-line.credit_amount, false);
      }
    }
    
    this.status = 'voided';
    this.voided_date = new Date();
    this.void_reason = reason;
    return this.save();
  };

  Transaction.prototype.isBalanced = async function() {
    const lines = await this.getTransactionLines();
    const totalDebits = lines.reduce((sum, line) => sum + parseFloat(line.debit_amount || 0), 0);
    const totalCredits = lines.reduce((sum, line) => sum + parseFloat(line.credit_amount || 0), 0);
    
    return Math.abs(totalDebits - totalCredits) < 0.01;
  };

  // Class methods
  Transaction.generateReferenceNumber = async function(companyId, transactionType) {
    const prefix = transactionType.toUpperCase().substring(0, 3);
    const year = new Date().getFullYear();
    
    const lastTransaction = await this.findOne({
      where: {
        company_id: companyId,
        transaction_type: transactionType,
        reference_number: {
          [sequelize.Sequelize.Op.like]: `${prefix}-${year}-%`
        }
      },
      order: [['created_at', 'DESC']]
    });
    
    let nextNumber = 1;
    if (lastTransaction) {
      const match = lastTransaction.reference_number.match(/(\d+)$/);
      if (match) {
        nextNumber = parseInt(match[1]) + 1;
      }
    }
    
    return `${prefix}-${year}-${nextNumber.toString().padStart(4, '0')}`;
  };

  return Transaction;
};