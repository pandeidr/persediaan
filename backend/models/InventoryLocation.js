const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const InventoryLocation = sequelize.define('InventoryLocation', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'inventorylocations'
  });

  return InventoryLocation;
};
