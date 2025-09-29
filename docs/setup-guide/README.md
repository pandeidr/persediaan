# Persediaan Accounting Software - Setup Guide

This guide will help you set up the Persediaan accounting software on your local machine or server.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16 or higher)
- **PostgreSQL** (version 12 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/pandeidr/persediaan.git
cd persediaan
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Environment Configuration
```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your configuration
nano .env
```

Key environment variables to configure:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=persediaan_accounting
DB_USER=postgres
DB_PASSWORD=your_database_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_very_long_and_secure

# Email Configuration (for sending invoices)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_email_password
```

#### Database Setup
```bash
# Create the database
createdb persediaan_accounting

# Run migrations (when available)
npm run migrate

# Seed the database with initial data (when available)
npm run seed
```

### 3. Frontend Setup

#### Install Dependencies
```bash
cd ../frontend
npm install
```

#### Environment Configuration
```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file if needed
nano .env
```

### 4. Running the Application

#### Development Mode

**Start the Backend:**
```bash
cd backend
npm run dev
```
The backend API will be available at `http://localhost:5000`

**Start the Frontend:**
```bash
cd frontend
npm start
```
The frontend will be available at `http://localhost:3000`

#### Production Mode with Docker

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Initial Setup

### 1. Create Your First Account

1. Navigate to `http://localhost:3000/register`
2. Fill in your company and personal details
3. Create your admin account

### 2. Basic Configuration

After logging in, go to Settings to configure:

- Company information
- Chart of accounts
- Tax settings
- Invoice templates
- User roles and permissions

## Troubleshooting

### Common Issues

#### Database Connection Errors
- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Verify database exists: `psql -l`

#### Port Already in Use
- Backend: Change `PORT` in backend `.env`
- Frontend: Change port with `PORT=3001 npm start`

#### Permission Errors
- Ensure proper file permissions
- Check PostgreSQL user permissions

### Getting Help

- Check the [User Manual](../user-manual/README.md)
- Review [API Documentation](../api-documentation/README.md)
- Create an issue on GitHub

## Security Considerations

### Production Deployment

1. **Environment Variables:**
   - Use strong, unique JWT secrets
   - Secure database credentials
   - Configure proper CORS origins

2. **Database Security:**
   - Use dedicated database user
   - Enable SSL connections
   - Regular backups

3. **Server Security:**
   - Enable HTTPS
   - Configure firewall rules
   - Regular security updates

4. **Application Security:**
   - Regular dependency updates
   - Enable audit logging
   - Monitor for suspicious activity

## Performance Optimization

### Database
- Regular VACUUM and ANALYZE
- Proper indexing
- Connection pooling

### Application
- Enable compression
- Optimize images
- Use CDN for static assets

### Monitoring
- Application performance monitoring
- Database query analysis
- Error tracking and logging

## Backup and Recovery

### Database Backups
```bash
# Daily backup
pg_dump persediaan_accounting > backup_$(date +%Y%m%d).sql

# Restore from backup
psql persediaan_accounting < backup_20241201.sql
```

### File Backups
- Upload directories
- Configuration files
- SSL certificates

## Next Steps

After successful installation:

1. [User Manual](../user-manual/README.md) - Learn how to use the software
2. [API Documentation](../api-documentation/README.md) - For developers
3. [Advanced Configuration](advanced-configuration.md) - Custom setups