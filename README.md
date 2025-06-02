<div align="center">

# 💼 Corporate Finance Hub

<img src="public/assets/images/logo-banner.png" alt="Corporate Finance Hub" width="600"/>

### Integrated Financial Management Platform for Large Enterprises

<p>
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version"/>
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License"/>
  <img src="https://img.shields.io/badge/node.js-18%2B-brightgreen.svg" alt="Node.js"/>
  <img src="https://img.shields.io/badge/postgresql-14%2B-blue.svg" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/build-passing-brightgreen.svg" alt="Build Status"/>
</p>

**A comprehensive financial system designed to provide complete control over cashflow, payments, compliance, and trade finance for large corporations.**

[🚀 Live Demo](https://demo.corporate-finance-hub.com) | [📖 Documentation](https://docs.corporate-finance-hub.com) | [🐛 Report Bug](https://github.com/[your-username]/corporate-finance-hub/issues)

</div>

---

<table>
  <tr>
    <td>
      <img src="./frontend/public/thumbs/login_FE.png" width="100%" />
    </td>
    <td>
      <img src="./frontend/public/thumbs/dashboard_FE.png" width="100%" />
    </td>
  </tr>
</table>

---

## 📋 Table of Contents

<details>
<summary>Click to expand</summary>

- [🌟 Key Features](#-key-features)
- [📱 Screenshots](#-screenshots)
- [🏗️ Architecture](#️-architecture)
- [🚀 Quick Start](#-quick-start)
- [📦 Installation](#-installation)
- [🗃️ Database Schema](#️-database-schema)
- [📚 API Documentation](#-api-documentation)
- [🧪 Testing](#-testing)
- [🐳 Docker](#-docker)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

</details>

---

## 🌟 Key Features

<table>
<tr>
<td width="50%">

### <img src="public/assets/images/icons/auth-icon.png" width="24" height="24"/> Authentication & Authorization
- **Multi-role System**: Client, Admin, RM, Finance Controller
- **Two-Factor Authentication** (2FA)
- **Role-based Access Control** (RBAC)
- **Approval Matrix** for hierarchical approvals

### <img src="public/assets/images/icons/cash-icon.png" width="24" height="24"/> Cash Management
- **Virtual Accounts** for each client
- **Real-time Cash Position** monitoring
- **Cash Pooling** across accounts
- **Scheduled Payments** & auto-sweeping

### <img src="public/assets/images/icons/payment-icon.png" width="24" height="24"/> Payment & Collection
- **Bulk Payments** (payroll/vendor)
- **E-invoicing** & e-collection
- **Auto Reconciliation**
- **QRIS & VA Integration**

</td>
<td width="50%">

### <img src="public/assets/images/icons/trade-icon.png" width="24" height="24"/> Trade Finance
- **Letter of Credit** (L/C), SKBDN, Invoice Financing
- **Import/Export** tracking
- **Document Exchange** & approval workflow

### <img src="public/assets/images/icons/treasury-icon.png" width="24" height="24"/> Treasury & FX
- **FX Trading** & hedging tools
- **Real-time FX Rates** monitoring
- **Intercompany Settlement**

### <img src="public/assets/images/icons/compliance-icon.png" width="24" height="24"/> Tax & Compliance
- **e-Faktur Export** & regulatory reporting
- **AML/CFT Compliance** checks

### <img src="public/assets/images/icons/analytics-icon.png" width="24" height="24"/> Analytics Dashboard
- **Cash Flow Forecasting**
- **Multi-dimensional Reports**
- **Risk Scoring** & suspicious transaction heatmaps

</td>
</tr>
</table>

---

## 📱 Screenshots

<div align="center">

### 🏠 Main Dashboard
<img src="public/assets/images/screenshots/dashboard.png" alt="Dashboard Screenshot" width="800"/>

> *[Real-time financial overview with comprehensive KPIs and interactive charts]*

<details>
<summary>View More Screenshots</summary>

### 💰 Cash Management Interface
<img src="public/assets/images/screenshots/cash-management.png" alt="Cash Management" width="700"/>

> *[Virtual account management with cash pooling and real-time balances]*

### 💸 Payment Processing System
<img src="public/assets/images/screenshots/payment-system.png" alt="Payment System" width="700"/>

> *[Bulk payment interface with approval workflow and transaction tracking]*

### 🌍 Trade Finance Module
<img src="public/assets/images/screenshots/trade-finance.png" alt="Trade Finance" width="700"/>

> *[L/C management with document tracking and workflow automation]*

### 📊 Analytics & Reporting
<img src="public/assets/images/screenshots/analytics.png" alt="Analytics Dashboard" width="700"/>

> *[Advanced analytics with forecasting and risk assessment tools]*

</details>

</div>

---

## 🏗️ Architecture

<div align="center">
<img src="public/assets/images/diagrams/architecture-overview.png" alt="System Architecture" width="800"/>
</div>

### 🔧 Technology Stack

<table>
<tr>
<td>

**Backend**
<img src="public/assets/images/icons/backend-icon.png" width="20" height="20"/>
- Node.js + Express
- GraphQL + Apollo Server
- PostgreSQL Database
- JWT Authentication
- Redis Caching

</td>
<td>

**Frontend** 
<img src="public/assets/images/icons/frontend-icon.png" width="20" height="20"/>
- Next.js 15 + TypeScript
- Apollo Client (GraphQL)
- Tailwind CSS
- Responsive Design
- PWA Support

</td>
<td>

**Infrastructure**
<img src="public/assets/images/icons/infrastructure-icon.png" width="20" height="20"/>
- Docker Containerization
- Nginx Load Balancer
- PostgreSQL + Redis
- CI/CD Pipeline
- Cloud Deployment

</td>
</tr>
</table>

### 🏛️ System Design Principles

```mermaid
graph TB
    A[Client Request] --> B[Next.js Frontend]
    B --> C[GraphQL Gateway]
    C --> D[Authentication Middleware]
    D --> E[Business Logic Layer]
    E --> F[Database Layer]
    F --> G[(PostgreSQL)]
    E --> H[(Redis Cache)]
```

> **Modular Architecture**: Each domain (auth, payments, trade finance) is isolated with clear interfaces

---

## 🚀 Quick Start

### Prerequisites Checklist

- [ ] **Node.js** v18+ installed
- [ ] **PostgreSQL** 14+ running
- [ ] **Redis** server (optional but recommended)
- [ ] **Git** for version control

### ⚡ One-Command Setup

```bash
# Clone and setup everything
curl -fsSL https://raw.githubusercontent.com/[your-username]/corporate-finance-hub/main/scripts/quick-start.sh | bash
```

### 🛠️ Manual Setup

<details>
<summary>Click for detailed installation steps</summary>

## 📦 Installation

### 1️⃣ Clone Repository
```bash
git clone https://github.com/[your-username]/corporate-finance-hub.git
cd corporate-finance-hub
```

### 2️⃣ Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Configure your environment variables
nano .env
```

**Required Environment Variables:**
```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/corporate_finance
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# External APIs
BANK_API_KEY=[your-bank-api-key]
EXCHANGE_RATE_API_KEY=[your-fx-api-key]
```

### 3️⃣ Install Dependencies
```bash
# Backend dependencies
npm install

# Frontend dependencies  
cd frontend && npm install && cd ..
```

### 4️⃣ Database Setup
```bash
# Create database and run migrations
npm run db:create
npm run db:migrate

# Seed with sample data
npm run db:seed
```

### 5️⃣ Start Development Servers
```bash
# Start backend (Terminal 1)
npm run dev

# Start frontend (Terminal 2) 
cd frontend && npm run dev
```

### 6️⃣ Access Application
| Service | URL | Description |
|---------|-----|-------------|
| 🌐 **Frontend** | http://localhost:3000 | Main application |
| 🔧 **GraphQL Playground** | http://localhost:4000/graphql | API testing |
| 📚 **API Docs** | http://localhost:4000/docs | Documentation |
| 📊 **Admin Panel** | http://localhost:3000/admin | Admin interface |

</details>

---

## 🗃️ Database Schema

<div align="center">
<img src="public/assets/images/diagrams/db-schema.png" alt="Database Schema" width="900"/>
</div>

### 📋 Schema Overview

Our database follows a **domain-driven design** approach with clear separation:

| Domain | Tables | Purpose |
|--------|--------|---------|
| 🔐 **Auth** | users, roles, permissions | Authentication & authorization |
| 💰 **Cash Management** | accounts, virtual_accounts, cash_positions | Account & balance management |
| 💸 **Payments** | transactions, bulk_payments, reconciliations | Payment processing |
| 🌍 **Trade Finance** | letters_of_credit, trade_documents, shipments | L/C & trade operations |
| 💱 **Treasury** | fx_rates, fx_transactions, hedging_contracts | FX & treasury operations |
| 📊 **Analytics** | reports, dashboards, alerts | Reporting & analytics |

> 📄 **Full Schema**: View complete database documentation in [`docs/database-schema.md`](docs/database-schema.md)

---

## 📚 API Documentation

### 🔄 GraphQL API

Our API uses **GraphQL** for flexible, type-safe data fetching:

<details>
<summary>📋 Sample Queries & Mutations</summary>

**Query: Get Cash Position**
```graphql
query GetCashPosition($clientId: ID!) {
  client(id: $clientId) {
    cashPosition {
      totalBalance
      availableBalance
      blockedAmount
      virtualAccounts {
        accountNumber
        balance
        currency
        status
      }
    }
  }
}
```

**Mutation: Create Payment**
```graphql
mutation CreatePayment($input: PaymentInput!) {
  createPayment(input: $input) {
    id
    amount
    currency
    status
    recipient {
      name
      accountNumber
    }
    createdAt
  }
}
```

**Subscription: Real-time Balance Updates**
```graphql
subscription BalanceUpdates($clientId: ID!) {
  balanceUpdated(clientId: $clientId) {
    accountNumber
    newBalance
    timestamp
  }
}
```

</details>

### 🔗 REST Endpoints

Some specialized endpoints use REST for webhooks and file operations:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | User authentication |
| `POST` | `/api/webhooks/payment` | Bank payment webhooks |
| `GET` | `/api/export/transactions` | Transaction export |
| `POST` | `/api/upload/documents` | Document upload |

> 🔍 **Interactive API Docs**: Explore our API at [GraphQL Playground](http://localhost:4000/graphql)

---

## 🧪 Testing

### 🎯 Test Coverage

<div align="center">
<img src="https://img.shields.io/badge/coverage-92%25-brightgreen.svg" alt="Test Coverage"/>
<img src="https://img.shields.io/badge/tests-passing-brightgreen.svg" alt="Test Status"/>
</div>

### 🔬 Running Tests

```bash
# Run all tests
npm test

# Run with coverage report
npm run test:coverage

# Run specific test suite
npm test -- --testPathPattern=auth

# Run tests in watch mode
npm run test:watch

# Generate test report
npm run test:report
```

### 📊 Test Structure
```
tests/
├── unit/          # Unit tests for individual functions
├── integration/   # Integration tests for API endpoints  
├── e2e/          # End-to-end tests with Playwright
└── fixtures/     # Test data and mocks
```

---

## 🐳 Docker

### 🚀 Quick Start with Docker

```bash
# Build and run all services
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### ⚙️ Docker Services

| Service | Port | Description |
|---------|------|-------------|
| 🌐 **frontend** | 3000 | Next.js application |
| 🔧 **backend** | 4000 | Node.js API server |
| 🗄️ **postgres** | 5432 | PostgreSQL database |
| 🔴 **redis** | 6379 | Redis cache |
| 🔄 **nginx** | 80 | Load balancer |

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### 🚀 Quick Contribution Steps

```bash
# Fork the repository
gh repo fork [your-username]/corporate-finance-hub

# Create feature branch
git checkout -b feature/amazing-feature

# Make your changes and test
npm test

# Commit your changes
git commit -m "Add amazing feature"

# Push to your fork
git push origin feature/amazing-feature

# Create Pull Request
gh pr create --title "Add amazing feature" --body "Description of changes"
```

### 👥 Contributors

<div align="center">
<img src="public/assets/images/contributors.png" alt="Contributors" width="600"/>
</div>

---

## 📈 Project Status

<div align="center">

| Metric | Status |
|--------|--------|
| **Build** | ![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg) |
| **Tests** | ![Test Coverage](https://img.shields.io/badge/coverage-92%25-brightgreen.svg) |
| **Security** | ![Security Score](https://img.shields.io/badge/security-A-brightgreen.svg) |
| **Performance** | ![Performance Score](https://img.shields.io/badge/performance-95%2F100-brightgreen.svg) |

</div>

---

## 📞 Support & Contact

<div align="center">

**Need Help?**

[📖 Documentation](https://docs.corporate-finance-hub.com) • [💬 Discord](https://discord.gg/corporate-finance) • [📧 Email](mailto:support@corporate-finance-hub.com)

[🐛 Report Issues](https://github.com/[your-username]/corporate-finance-hub/issues) • [💡 Feature Requests](https://github.com/[your-username]/corporate-finance-hub/discussions)

</div>

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

<img src="public/assets/images/footer-banner.png" alt="Footer" width="600"/>

*Built with ❤️ by the Corporate Finance Hub Team*

</div>
