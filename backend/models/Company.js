const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Company = sequelize.define('Company', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    legal_name: {
      type: DataTypes.STRING(255)
    },
    registration_number: {
      type: DataTypes.STRING(100)
    },
    tax_identification_number: {
      type: DataTypes.STRING(100)
    },
    vat_number: {
      type: DataTypes.STRING(100)
    },
    address_line_1: {
      type: DataTypes.STRING(255)
    },
    address_line_2: {
      type: DataTypes.STRING(255)
    },
    city: {
      type: DataTypes.STRING(100)
    },
    state_province: {
      type: DataTypes.STRING(100)
    },
    postal_code: {
      type: DataTypes.STRING(20)
    },
    country: {
      type: DataTypes.STRING(100)
    },
    phone: {
      type: DataTypes.STRING(20)
    },
    fax: {
      type: DataTypes.STRING(20)
    },
    email: {
      type: DataTypes.STRING(255),
      validate: {
        isEmail: true
      }
    },
    website: {
      type: DataTypes.STRING(255),
      validate: {
        isUrl: true
      }
    },
    logo: {
      type: DataTypes.STRING
    },
    industry: {
      type: DataTypes.STRING(100)
    },
    description: {
      type: DataTypes.TEXT
    },
    fiscal_year_start: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        min: 1,
        max: 12
      }
    },
    default_currency: {
      type: DataTypes.STRING(3),
      defaultValue: 'USD',
      validate: {
        len: [3, 3]
      }
    },
    default_tax_rate: {
      type: DataTypes.DECIMAL(5, 4),
      defaultValue: 0.0000
    },
    default_payment_terms: {
      type: DataTypes.STRING(100),
      defaultValue: 'Net 30'
    },
    invoice_numbering_prefix: {
      type: DataTypes.STRING(10),
      defaultValue: 'INV'
    },
    invoice_numbering_format: {
      type: DataTypes.STRING(50),
      defaultValue: '{prefix}-{year}-{number:0000}'
    },
    po_numbering_prefix: {
      type: DataTypes.STRING(10),
      defaultValue: 'PO'
    },
    po_numbering_format: {
      type: DataTypes.STRING(50),
      defaultValue: '{prefix}-{year}-{number:0000}'
    },
    enable_multi_currency: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    enable_inventory_tracking: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    enable_purchase_approvals: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    settings: {
      type: DataTypes.JSONB,
      defaultValue: {}
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    subscription_plan: {
      type: DataTypes.ENUM('trial', 'basic', 'professional', 'enterprise'),
      defaultValue: 'trial'
    },
    subscription_expires: {
      type: DataTypes.DATE
    }
  }, {
    tableName: 'companies',
    indexes: [
      {
        fields: ['name']
      },
      {
        fields: ['registration_number']
      },
      {
        fields: ['tax_identification_number']
      },
      {
        fields: ['is_active']
      },
      {
        fields: ['subscription_plan']
      }
    ]
  });

  // Instance methods
  Company.prototype.getFullAddress = function() {
    const parts = [
      this.address_line_1,
      this.address_line_2,
      this.city,
      this.state_province,
      this.postal_code,
      this.country
    ].filter(part => part && part.trim());
    
    return parts.join(', ');
  };

  Company.prototype.generateInvoiceNumber = function(sequenceNumber) {
    const year = new Date().getFullYear();
    return this.invoice_numbering_format
      .replace('{prefix}', this.invoice_numbering_prefix)
      .replace('{year}', year)
      .replace(/{number:(\d+)}/g, (match, padding) => {
        return sequenceNumber.toString().padStart(parseInt(padding.slice(1)), '0');
      });
  };

  Company.prototype.generatePONumber = function(sequenceNumber) {
    const year = new Date().getFullYear();
    return this.po_numbering_format
      .replace('{prefix}', this.po_numbering_prefix)
      .replace('{year}', year)
      .replace(/{number:(\d+)}/g, (match, padding) => {
        return sequenceNumber.toString().padStart(parseInt(padding.slice(1)), '0');
      });
  };

  return Company;
};