const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Customer = sequelize.define('Customer', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING(20)
    },
    address: {
      type: DataTypes.TEXT
    },
    credit_limit: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0.00
    },
    payment_terms: {
      type: DataTypes.STRING(100),
      defaultValue: 'Net 30'
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'customers'
  });

  return Customer;
};