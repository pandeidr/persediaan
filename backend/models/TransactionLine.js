const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TransactionLine = sequelize.define('TransactionLine', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    line_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    account_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'chart_of_accounts',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.TEXT
    },
    debit_amount: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0.00,
      validate: {
        min: 0
      }
    },
    credit_amount: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0.00,
      validate: {
        min: 0
      }
    },
    quantity: {
      type: DataTypes.DECIMAL(10, 4),
      defaultValue: 1.0000
    },
    unit_price: {
      type: DataTypes.DECIMAL(15, 4),
      defaultValue: 0.0000
    },
    discount_percentage: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0.00,
      validate: {
        min: 0,
        max: 100
      }
    },
    tax_amount: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0.00
    },
    tax_rate: {
      type: DataTypes.DECIMAL(5, 4),
      defaultValue: 0.0000
    },
    customer_id: {
      type: DataTypes.UUID,
      references: {
        model: 'customers',
        key: 'id'
      }
    },
    vendor_id: {
      type: DataTypes.UUID,
      references: {
        model: 'vendors',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.UUID,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    project_id: {
      type: DataTypes.UUID
    },
    department: {
      type: DataTypes.STRING(100)
    },
    class_code: {
      type: DataTypes.STRING(50)
    },
    memo: {
      type: DataTypes.TEXT
    },
    reference: {
      type: DataTypes.STRING(100)
    },
    is_billable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    billable_rate: {
      type: DataTypes.DECIMAL(15, 4)
    }
  }, {
    tableName: 'transaction_lines',
    indexes: [
      {
        fields: ['transaction_id', 'line_number']
      },
      {
        fields: ['account_id']
      },
      {
        fields: ['customer_id']
      },
      {
        fields: ['vendor_id']
      },
      {
        fields: ['product_id']
      },
      {
        fields: ['project_id']
      }
    ],
    validate: {
      debitOrCreditRequired() {
        if (this.debit_amount === 0 && this.credit_amount === 0) {
          throw new Error('Either debit_amount or credit_amount must be greater than zero');
        }
      },
      debitAndCreditMutuallyExclusive() {
        if (this.debit_amount > 0 && this.credit_amount > 0) {
          throw new Error('A line cannot have both debit and credit amounts');
        }
      }
    }
  });

  // Instance methods
  TransactionLine.prototype.getAmount = function() {
    return Math.max(this.debit_amount, this.credit_amount);
  };

  TransactionLine.prototype.isDebit = function() {
    return this.debit_amount > 0;
  };

  TransactionLine.prototype.isCredit = function() {
    return this.credit_amount > 0;
  };

  TransactionLine.prototype.calculateTotal = function() {
    const subtotal = this.quantity * this.unit_price;
    const discount = subtotal * (this.discount_percentage / 100);
    const afterDiscount = subtotal - discount;
    const tax = afterDiscount * (this.tax_rate / 100);
    return afterDiscount + tax;
  };

  return TransactionLine;
};