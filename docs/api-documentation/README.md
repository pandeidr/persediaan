# Persediaan API Documentation

This document provides comprehensive information about the Persediaan Accounting Software REST API.

## Base URL

```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Getting a Token

**POST** `/auth/login`

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "admin"
  },
  "company": {
    "id": "uuid",
    "name": "Company Name"
  }
}
```

## Error Handling

The API returns standard HTTP status codes and error messages in JSON format:

```json
{
  "error": "Error Type",
  "message": "Detailed error message"
}
```

### Common Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

## API Endpoints

### Authentication

#### Login
**POST** `/auth/login`

#### Register
**POST** `/auth/register`

#### Get Current User
**GET** `/auth/me`

#### Change Password
**POST** `/auth/change-password`

### Users

#### List Users
**GET** `/users`

#### Get User
**GET** `/users/:id`

#### Create User
**POST** `/users`

#### Update User
**PUT** `/users/:id`

#### Delete User
**DELETE** `/users/:id`

### Chart of Accounts

#### List Accounts
**GET** `/accounts`

```json
{
  "accounts": [
    {
      "id": "uuid",
      "code": "1000",
      "name": "Cash",
      "account_type": "asset",
      "account_subtype": "current_asset",
      "current_balance": "5000.00",
      "is_active": true
    }
  ]
}
```

#### Get Account
**GET** `/accounts/:id`

#### Create Account
**POST** `/accounts`

```json
{
  "code": "1000",
  "name": "Cash",
  "account_type": "asset",
  "account_subtype": "current_asset",
  "normal_balance": "debit",
  "opening_balance": "0.00"
}
```

#### Update Account
**PUT** `/accounts/:id`

#### Delete Account
**DELETE** `/accounts/:id`

### Transactions

#### List Transactions
**GET** `/transactions`

Query Parameters:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 25)
- `status` - Filter by status (draft, posted, voided)
- `type` - Filter by transaction type
- `date_from` - Start date filter
- `date_to` - End date filter

#### Get Transaction
**GET** `/transactions/:id`

#### Create Transaction
**POST** `/transactions`

```json
{
  "transaction_date": "2024-01-15",
  "description": "Sample transaction",
  "transaction_type": "journal_entry",
  "lines": [
    {
      "account_id": "uuid",
      "description": "Debit entry",
      "debit_amount": "1000.00",
      "credit_amount": "0.00"
    },
    {
      "account_id": "uuid",
      "description": "Credit entry",
      "debit_amount": "0.00",
      "credit_amount": "1000.00"
    }
  ]
}
```

#### Update Transaction
**PUT** `/transactions/:id`

#### Post Transaction
**POST** `/transactions/:id/post`

#### Void Transaction
**POST** `/transactions/:id/void`

### Customers

#### List Customers
**GET** `/customers`

#### Get Customer
**GET** `/customers/:id`

#### Create Customer
**POST** `/customers`

```json
{
  "name": "ABC Corporation",
  "email": "contact@abc.com",
  "phone": "+1-555-0123",
  "address": "123 Business St, City, State 12345",
  "credit_limit": "10000.00",
  "payment_terms": "Net 30"
}
```

#### Update Customer
**PUT** `/customers/:id`

#### Delete Customer
**DELETE** `/customers/:id`

### Vendors

#### List Vendors
**GET** `/vendors`

#### Get Vendor
**GET** `/vendors/:id`

#### Create Vendor
**POST** `/vendors`

#### Update Vendor
**PUT** `/vendors/:id`

#### Delete Vendor
**DELETE** `/vendors/:id`

### Products

#### List Products
**GET** `/inventory/products`

#### Get Product
**GET** `/inventory/products/:id`

#### Create Product
**POST** `/inventory/products`

```json
{
  "sku": "PROD-001",
  "name": "Sample Product",
  "description": "Product description",
  "category": "Electronics",
  "cost_price": "50.00",
  "selling_price": "75.00",
  "stock_quantity": 100,
  "reorder_point": 10,
  "is_active": true
}
```

#### Update Product
**PUT** `/inventory/products/:id`

#### Delete Product
**DELETE** `/inventory/products/:id`

### Invoices

#### List Invoices
**GET** `/invoices`

#### Get Invoice
**GET** `/invoices/:id`

#### Create Invoice
**POST** `/invoices`

```json
{
  "customer_id": "uuid",
  "invoice_date": "2024-01-15",
  "due_date": "2024-02-14",
  "payment_terms": "Net 30",
  "lines": [
    {
      "product_id": "uuid",
      "description": "Product description",
      "quantity": 2,
      "unit_price": "75.00",
      "tax_rate": "0.10"
    }
  ],
  "notes": "Invoice notes"
}
```

#### Update Invoice
**PUT** `/invoices/:id`

#### Send Invoice
**POST** `/invoices/:id/send`

#### Mark as Paid
**POST** `/invoices/:id/mark-paid`

#### Generate PDF
**GET** `/invoices/:id/pdf`

### Purchase Orders

#### List Purchase Orders
**GET** `/purchase-orders`

#### Get Purchase Order
**GET** `/purchase-orders/:id`

#### Create Purchase Order
**POST** `/purchase-orders`

#### Approve Purchase Order
**POST** `/purchase-orders/:id/approve`

#### Send Purchase Order
**POST** `/purchase-orders/:id/send`

### Reports

#### Profit & Loss
**GET** `/reports/profit-loss`

Query Parameters:
- `start_date` - Report start date
- `end_date` - Report end date
- `format` - Response format (json, pdf)

#### Balance Sheet
**GET** `/reports/balance-sheet`

#### Cash Flow Statement
**GET** `/reports/cash-flow`

#### Trial Balance
**GET** `/reports/trial-balance`

#### Sales Report
**GET** `/reports/sales`

#### Aged Receivables
**GET** `/reports/aged-receivables`

#### Aged Payables
**GET** `/reports/aged-payables`

### Dashboard

#### Get Dashboard Data
**GET** `/dashboard`

```json
{
  "stats": {
    "total_revenue": "127850.00",
    "pending_invoices": 23,
    "active_customers": 156,
    "low_stock_items": 7
  },
  "recent_activities": [
    {
      "type": "invoice",
      "description": "Invoice INV-2024-0001 created",
      "timestamp": "2024-01-15T10:30:00Z"
    }
  ],
  "charts": {
    "revenue_trend": [],
    "expense_breakdown": []
  }
}
```

## Pagination

Most list endpoints support pagination:

```json
{
  "data": [...],
  "pagination": {
    "current_page": 1,
    "per_page": 25,
    "total": 100,
    "total_pages": 4,
    "has_next": true,
    "has_prev": false
  }
}
```

## Filtering and Sorting

Many endpoints support filtering and sorting:

**Query Parameters:**
- `filter[field]` - Filter by field value
- `sort` - Sort field (prefix with `-` for descending)
- `search` - Full-text search

Example:
```
GET /invoices?filter[status]=sent&sort=-created_at&search=ABC
```

## Rate Limiting

The API implements rate limiting:
- 100 requests per 15 minutes per IP address
- Higher limits for authenticated users
- Rate limit headers included in responses

## Webhooks

Configure webhooks to receive real-time notifications:

**Events:**
- `invoice.created`
- `invoice.sent`
- `invoice.paid`
- `transaction.posted`
- `user.created`

**Webhook Format:**
```json
{
  "event": "invoice.paid",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "id": "uuid",
    "invoice_number": "INV-2024-0001",
    "amount": "1500.00"
  }
}
```

## SDK and Libraries

Official SDKs available for:
- JavaScript/Node.js
- Python
- PHP
- C#

## Testing

Use the sandbox environment for testing:
```
Base URL: https://sandbox-api.persediaan.com/api
```

Test data is reset daily at midnight UTC.

## Support

For API support:
- Email: api-support@persediaan.com
- Documentation: https://docs.persediaan.com
- Status Page: https://status.persediaan.com