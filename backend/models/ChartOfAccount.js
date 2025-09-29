const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ChartOfAccount = sequelize.define('ChartOfAccount', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        len: [1, 20]
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    description: {
      type: DataTypes.TEXT
    },
    account_type: {
      type: DataTypes.ENUM(
        'asset',
        'liability', 
        'equity',
        'revenue',
        'expense',
        'cost_of_goods_sold'
      ),
      allowNull: false
    },
    account_subtype: {
      type: DataTypes.ENUM(
        // Asset subtypes
        'current_asset',
        'fixed_asset',
        'other_asset',
        'bank',
        'accounts_receivable',
        'inventory',
        'prepaid_expense',
        
        // Liability subtypes  
        'current_liability',
        'long_term_liability',
        'accounts_payable',
        'credit_card',
        'loan',
        'other_current_liability',
        
        // Equity subtypes
        'equity',
        'retained_earnings',
        
        // Revenue subtypes
        'income',
        'other_income',
        
        // Expense subtypes
        'expense',
        'other_expense',
        
        // COGS subtypes
        'cost_of_goods_sold'
      )
    },
    parent_id: {
      type: DataTypes.UUID,
      references: {
        model: 'chart_of_accounts',
        key: 'id'
      }
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    is_system: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    can_be_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    normal_balance: {
      type: DataTypes.ENUM('debit', 'credit'),
      allowNull: false
    },
    current_balance: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0.00
    },
    opening_balance: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0.00
    },
    opening_balance_date: {
      type: DataTypes.DATE
    },
    tax_code: {
      type: DataTypes.STRING(20)
    },
    is_reconcilable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    bank_account_number: {
      type: DataTypes.STRING(50)
    },
    routing_number: {
      type: DataTypes.STRING(20)
    },
    bank_name: {
      type: DataTypes.STRING(255)
    },
    iban: {
      type: DataTypes.STRING(34)
    },
    swift_code: {
      type: DataTypes.STRING(11)
    },
    notes: {
      type: DataTypes.TEXT
    },
    sort_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'chart_of_accounts',
    indexes: [
      {
        unique: true,
        fields: ['company_id', 'code']
      },
      {
        fields: ['account_type']
      },
      {
        fields: ['account_subtype']
      },
      {
        fields: ['parent_id']
      },
      {
        fields: ['is_active']
      },
      {
        fields: ['sort_order']
      }
    ]
  });

  // Instance methods
  ChartOfAccount.prototype.getFullCode = function() {
    // Returns hierarchical code like "1000.1100.1110"
    if (this.Parent) {
      return `${this.Parent.getFullCode()}.${this.code}`;
    }
    return this.code;
  };

  ChartOfAccount.prototype.getFullName = function() {
    // Returns hierarchical name like "Assets > Current Assets > Cash"
    if (this.Parent) {
      return `${this.Parent.getFullName()} > ${this.name}`;
    }
    return this.name;
  };

  ChartOfAccount.prototype.isDebitAccount = function() {
    return this.normal_balance === 'debit';
  };

  ChartOfAccount.prototype.isCreditAccount = function() {
    return this.normal_balance === 'credit';
  };

  ChartOfAccount.prototype.updateBalance = function(amount, isDebit = true) {
    const adjustment = isDebit ? amount : -amount;
    
    if (this.normal_balance === 'debit') {
      this.current_balance = parseFloat(this.current_balance) + adjustment;
    } else {
      this.current_balance = parseFloat(this.current_balance) - adjustment;
    }
    
    return this.save();
  };

  // Class methods
  ChartOfAccount.getAccountsByType = function(companyId, accountType) {
    return this.findAll({
      where: {
        company_id: companyId,
        account_type: accountType,
        is_active: true
      },
      order: [['sort_order', 'ASC'], ['code', 'ASC']]
    });
  };

  ChartOfAccount.getAccountHierarchy = function(companyId) {
    return this.findAll({
      where: {
        company_id: companyId,
        is_active: true
      },
      include: [{
        model: this,
        as: 'Children',
        include: [{
          model: this,
          as: 'Children'
        }]
      }],
      order: [
        ['sort_order', 'ASC'],
        ['code', 'ASC'],
        [{ model: this, as: 'Children' }, 'sort_order', 'ASC'],
        [{ model: this, as: 'Children' }, 'code', 'ASC']
      ]
    });
  };

  return ChartOfAccount;
};