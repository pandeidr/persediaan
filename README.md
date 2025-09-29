# Persediaan - Complete Web-Based Accounting Software

A comprehensive accounting software web application designed for small to medium businesses. Built with React.js frontend and Node.js backend with PostgreSQL database.

## Features

### Dashboard & Analytics
- Financial overview with key performance indicators
- Interactive charts (income vs expenses, cash flow)
- Recent transactions summary
- Quick access to common tasks
- Monthly/quarterly comparisons

### Comprehensive Invoicing System
- Professional invoice creation with templates
- Automated invoice numbering
- Multiple payment terms and methods
- Invoice status tracking (Draft, Sent, Paid, Overdue)
- Automated payment reminders
- PDF generation and email integration
- Tax calculations (VAT, GST support)

### Advanced Purchase Order System
- Create and manage purchase orders
- PO approval workflow (Draft → Approved → Sent → Received)
- Vendor comparison and selection
- Convert POs to bills automatically
- Track delivery status and partial receipts
- Purchase analytics and reporting

### Inventory Management
- Complete product catalog with SKUs
- Real-time stock tracking
- Multi-location inventory support
- Automated reorder points and alerts
- Inventory valuation (FIFO, LIFO, Average Cost)
- Stock movement history and audit trail
- Barcode scanning support

### Financial Management Core
- Complete Chart of Accounts setup
- Double-entry bookkeeping system
- General ledger with detailed transactions
- Bank account reconciliation
- Multi-currency support
- Recurring transactions and automation
- Expense categorization and tracking

### Comprehensive Reporting Suite
- Profit & Loss Statement (P&L)
- Balance Sheet with comparative periods
- Cash Flow Statement (Direct/Indirect method)
- Trial Balance with adjustments
- Aged Receivables/Payables reports
- Inventory reports (valuation, movement, aging)
- Sales performance analytics
- Purchase analysis reports
- Tax reporting (VAT returns, GST reports)
- Custom report builder

### Customer & Vendor Management
- Complete customer database with credit terms
- Vendor management with performance tracking
- Contact management and communication history
- Credit limit monitoring
- Payment history and analytics
- Customer/Vendor profitability analysis

### Security & User Management
- Multi-level user authentication
- Role-based access control (Admin, Accountant, Sales, Inventory)
- Audit trail for all transactions
- Data backup and restore functionality
- Password policies and session management
- Activity logging

## Technology Stack

### Frontend
- React.js 18+
- Material-UI (MUI) for design system
- Chart.js/Recharts for data visualization
- React Router for navigation
- Axios for API communication

### Backend
- Node.js with Express.js
- PostgreSQL database
- JWT for authentication
- Multer for file handling
- Nodemailer for email services
- bcrypt for password hashing

### DevOps & Deployment
- Docker containerization
- PostgreSQL database
- PM2 for process management
- Nginx for reverse proxy

## Quick Start

### Prerequisites
- Node.js 16+ 
- PostgreSQL 12+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/pandeidr/persediaan.git
cd persediaan
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Setup environment variables:
```bash
# Copy example environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Edit the environment files with your configuration
```

5. Setup database:
```bash
cd backend
npm run migrate
npm run seed
```

6. Start the application:
```bash
# Start backend (from backend directory)
npm run dev

# Start frontend (from frontend directory, in new terminal)
cd ../frontend
npm start
```

7. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Project Structure

```
persediaan/
├── frontend/                 # React.js frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Dashboard/
│   │   │   ├── Invoicing/
│   │   │   ├── PurchaseOrders/
│   │   │   ├── Inventory/
│   │   │   ├── Financial/
│   │   │   ├── Reports/
│   │   │   └── Common/
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── utils/           # Utility functions
│   │   ├── contexts/        # React contexts
│   │   └── App.js          # Main app component
│   └── package.json
├── backend/                 # Node.js backend application
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── services/           # Business logic services
│   ├── config/             # Configuration files
│   ├── migrations/         # Database migrations
│   ├── seeds/              # Database seed files
│   └── server.js           # Express server
├── docs/                   # Documentation
│   ├── user-manual/
│   ├── api-documentation/
│   └── setup-guide/
├── docker-compose.yml      # Docker configuration
└── README.md
```

## API Documentation

The API follows RESTful conventions with the following base endpoints:

- `/api/auth` - Authentication endpoints
- `/api/users` - User management
- `/api/accounts` - Chart of accounts
- `/api/transactions` - Financial transactions
- `/api/invoices` - Invoice management
- `/api/purchase-orders` - Purchase order management
- `/api/inventory` - Inventory management
- `/api/customers` - Customer management
- `/api/vendors` - Vendor management
- `/api/reports` - Reporting endpoints

For detailed API documentation, see [docs/api-documentation/](docs/api-documentation/).

## User Manual

For comprehensive user guides and tutorials, see [docs/user-manual/](docs/user-manual/).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please contact the development team or create an issue in the repository.