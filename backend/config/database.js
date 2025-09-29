const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'persediaan_accounting',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'password',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true
    }
  }
);

// Import models
const User = require('../models/User')(sequelize);
const Company = require('../models/Company')(sequelize);
const ChartOfAccount = require('../models/ChartOfAccount')(sequelize);
const Transaction = require('../models/Transaction')(sequelize);
const TransactionLine = require('../models/TransactionLine')(sequelize);
const Customer = require('../models/Customer')(sequelize);
const Vendor = require('../models/Vendor')(sequelize);
const Product = require('../models/Product')(sequelize);
const Invoice = require('../models/Invoice')(sequelize);
const InvoiceLine = require('../models/InvoiceLine')(sequelize);
const PurchaseOrder = require('../models/PurchaseOrder')(sequelize);
const PurchaseOrderLine = require('../models/PurchaseOrderLine')(sequelize);
const StockMovement = require('../models/StockMovement')(sequelize);
const InventoryLocation = require('../models/InventoryLocation')(sequelize);

// Define associations
const defineAssociations = () => {
  // User associations
  User.belongsTo(Company);
  Company.hasMany(User);

  // Chart of Accounts associations
  ChartOfAccount.belongsTo(ChartOfAccount, { as: 'Parent', foreignKey: 'parent_id' });
  ChartOfAccount.hasMany(ChartOfAccount, { as: 'Children', foreignKey: 'parent_id' });
  ChartOfAccount.belongsTo(Company);
  Company.hasMany(ChartOfAccount);

  // Transaction associations
  Transaction.belongsTo(Company);
  Transaction.belongsTo(User, { as: 'CreatedBy' });
  Transaction.hasMany(TransactionLine);
  
  TransactionLine.belongsTo(Transaction);
  TransactionLine.belongsTo(ChartOfAccount);

  // Customer associations
  Customer.belongsTo(Company);
  Company.hasMany(Customer);

  // Vendor associations
  Vendor.belongsTo(Company);
  Company.hasMany(Vendor);

  // Product associations
  Product.belongsTo(Company);
  Company.hasMany(Product);

  // Invoice associations
  Invoice.belongsTo(Company);
  Invoice.belongsTo(Customer);
  Invoice.belongsTo(User, { as: 'CreatedBy' });
  Invoice.hasMany(InvoiceLine);
  
  InvoiceLine.belongsTo(Invoice);
  InvoiceLine.belongsTo(Product);

  // Purchase Order associations
  PurchaseOrder.belongsTo(Company);
  PurchaseOrder.belongsTo(Vendor);
  PurchaseOrder.belongsTo(User, { as: 'CreatedBy' });
  PurchaseOrder.belongsTo(User, { as: 'ApprovedBy' });
  PurchaseOrder.hasMany(PurchaseOrderLine);
  
  PurchaseOrderLine.belongsTo(PurchaseOrder);
  PurchaseOrderLine.belongsTo(Product);

  // Stock Movement associations
  StockMovement.belongsTo(Company);
  StockMovement.belongsTo(Product);
  StockMovement.belongsTo(InventoryLocation);
  StockMovement.belongsTo(User, { as: 'CreatedBy' });

  // Inventory Location associations
  InventoryLocation.belongsTo(Company);
  InventoryLocation.hasMany(StockMovement);
  Company.hasMany(InventoryLocation);
};

// Initialize associations
defineAssociations();

// Database sync function
const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log('✅ Database synced successfully');
  } catch (error) {
    console.error('❌ Database sync failed:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  models: {
    User,
    Company,
    ChartOfAccount,
    Transaction,
    TransactionLine,
    Customer,
    Vendor,
    Product,
    Invoice,
    InvoiceLine,
    PurchaseOrder,
    PurchaseOrderLine,
    StockMovement,
    InventoryLocation
  },
  syncDatabase
};