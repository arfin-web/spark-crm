# Spark CRM - AI-Powered Minimal CRM for Agencies

> A lightweight, intelligent CRM built for creative agencies. Spark CRM helps you manage clients, projects, and proposals without the complexity of enterprise tools.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-actively%20maintained-brightgreen.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![Next.js](https://img.shields.io/badge/nextjs-16.2%2B-black)
![Python](https://img.shields.io/badge/python-3.10%2B-blue)
![FastAPI](https://img.shields.io/badge/fastapi-0.100%2B-green)

## 🎯 Overview

Spark CRM is an open-source CRM designed specifically for marketing, design, and development agencies (10-50 people). It solves the problem of bloated enterprise CRMs by offering a minimal, AI-powered solution that lets teams focus on client relationships, not software training.

**Key differentiators:**
- ⚡ AI-assisted email drafts and proposal generation (Groq LLM backend)
- 🎨 Minimal, intuitive UI (add a client in <30 seconds)
- 📊 Smart client health scoring and segmentation
- 🚀 Modern architecture: Next.js frontend + FastAPI backend
- 📱 Mobile-responsive for field usage
- 🔐 JWT-based authentication with secure API layer

**[Live Demo](https://spark-crm-seven.vercel.app)** | **[Frontend Repo](https://github.com/arfin-web/spark-crm)** | **[Backend Repo](https://github.com/arfin-web/spark-crm-backend)** | **[API Docs](https://spark-crm-backend-production.up.railway.app/docs)** 

---

## ✨ Features

### ✅ Implemented (MVP)

- **Client Management**
  - Add/edit/delete contacts with tags and custom fields
  - Client health score calculation (0-100)
  - Search and advanced filtering by status, industry, tags
  - Bulk CSV export

- **Project & Pipeline Tracking**
  - Visual Kanban pipeline (Prospect → Proposal → In Progress → Completed)
  - Drag-and-drop project status updates
  - Project-client linking with budget tracking
  - Timeline and deliverable management

- **AI-Powered Features**
  - ✨ **Email Draft Generator**: Contextual follow-up emails powered by Groq LLM (backend)
  - ✨ **Proposal Generator**: Auto-generate project proposals from brief descriptions
  - Activity logging with timestamps
  - Rich text note taking

- **Authentication & Security**
  - JWT-based token authentication
  - Secure API endpoints with role-based access
  - Password hashing and validation
  - Refresh token mechanism

- **Dashboard & Analytics**
  - Overview metrics (active clients, project status, pending follow-ups)
  - Recent activity feed
  - Upcoming deadline alerts
  - Client health overview

- **Developer Experience**
  - TypeScript strict mode (frontend)
  - Zod validation schemas (frontend)
  - React Hook Form for form management
  - FastAPI auto-generated OpenAPI docs
  - Comprehensive error handling

### 🚧 Roadmap (v1.1+)

- [ ] Email sync (Gmail/Outlook calendar integration)
- [ ] Slack notifications
- [ ] Advanced reporting and analytics
- [ ] CSV bulk import
- [ ] Client portal (share proposals, track status)
- [ ] Time tracking and invoicing
- [ ] Team/multi-user support
- [ ] Zapier integration
- [ ] Custom API for integrations

---

## 🏗️ Tech Stack

### Frontend
| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 16.2+ (App Router) | React server/client components |
| **Language** | TypeScript | Type safety |
| **Styling** | Tailwind CSS 4 | Utility-first CSS |
| **UI Components** | Shadcn UI | Component library |
| **Forms** | React Hook Form + Zod | Type-safe form handling & validation |
| **Data Fetching** | TanStack Query (React Query) | Server state management |
| **Drag-Drop** | @dnd-kit | Kanban pipeline interactions |
| **Hosting** | Vercel | Edge deployment + functions |

### Backend
| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | FastAPI (Python 3.10+) | High-performance API |
| **Language** | Python | Backend logic |
| **Database** | NeonDB PostgreSQL | Data storage (serverless) |
| **Authentication** | JWT (PyJWT) | Token-based auth |
| **ORM** | SQLAlchemy | Database abstraction |
| **AI Integration** | Groq SDK | LLM inference for email/proposal generation |
| **Validation** | Pydantic | Data validation |
| **Hosting** | Railway | Backend deployment |

---

## 🚀 Getting Started

### Prerequisites

**Frontend:**
- Node.js 18+ 
- npm or pnpm

**Backend:**
- Python 3.10+
- pip (Python package manager)
- NeonDB PostgreSQL connection string
- Groq API key (free tier: 14,400 req/day)

### Frontend Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/arfin-web/spark-crm.git
cd spark-crm
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Set Up Environment Variables

Create a `.env.local` file:

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000
# or for production: https://spark-crm-backend-production.up.railway.app

# Clerk Authentication (if using Clerk, optional)
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
# CLERK_SECRET_KEY=sk_test_...
```

#### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

#### 5. Build for Production

```bash
npm run build
npm start
```

---

### Backend Setup

#### 1. Clone Backend Repository

```bash
git clone https://github.com/arfin-web/spark-crm-backend.git
cd spark-crm-backend
```

#### 2. Create Virtual Environment

```bash
python -m venv venv

# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate
```

#### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

#### 4. Set Up Environment Variables

Create a `.env` file:

```env
# Database
DATABASE_URL=postgresql://user:password@host:port/dbname
# NeonDB format: postgresql://user:password@[project-id].neon.tech/[db-name]

# Security
SECRET_KEY=your-super-secret-jwt-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# AI - Groq
GROQ_API_KEY=gsk_...

# CORS
FRONTEND_URL=http://localhost:3000
# Production: https://spark-crm-seven.vercel.app
```

#### 5. Run Database Migrations

```bash
# Using Alembic (if configured)
alembic upgrade head

# Or manually create tables via SQL
# See /sql/schema.sql
```

#### 6. Run Development Server

```bash
uvicorn main:app --reload --port 8000
```

Backend API available at [http://localhost:8000](http://localhost:8000)
Interactive API docs at [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🤖 AI Features Explained

### Email Draft Generator

Uses **Groq's Llama 3.1 8B** backend integration for fast, cost-efficient email generation.

**Flow:**
1. Frontend sends client context + email purpose to backend
2. Backend constructs prompt with client details
3. Groq LLM generates email in real-time
4. Response streamed back to frontend
5. User edits and saves to database

**Example:**
Purpose: "follow_up"
Client: "Acme Design Co."

Last Activity: "Sent proposal 5 days ago"
Generated Email:

Subject: "Following up on your proposal"
Body: "Hi [client], I hope you've had a chance to review the proposal..."

**Why Groq Backend?**
- ⚡ 800+ tokens/second (fastest inference)
- 💰 Free tier: 14,400 requests/day
- 📉 Scales to $0.05/M tokens after free tier
- Python SDK integrates seamlessly with FastAPI
- Cost-efficient processing server-side

## 🔐 Security

- **Authentication**: JWT tokens with access/refresh token pattern
- **API Security**: Secure endpoints with token validation
- **Password Security**: Bcrypt hashing for password storage
- **Secrets**: Environment variables stored in Railway/Vercel dashboards
- **HTTPS**: Enforced on production deployments
- **CORS**: Configured to allow only frontend domain
- **Validation**: Pydantic schemas validate all API inputs

**Full API docs**: [http://localhost:8000/docs](http://localhost:8000/docs) (Swagger UI)

### Database Schema

**Key Tables:**
- `users` - User accounts with hashed passwords
- `clients` - Client/contact information
- `projects` - Deals, pipelines, budgets
- `proposals` - AI-generated or manual proposals
- `activities` - Interaction log (emails, calls, meetings)
- `email_drafts` - AI-generated email drafts

---

## 🧪 Development

### Frontend

```bash
# Linting & Formatting
npm run lint          # Run ESLint
npm run format        # Run Prettier
npm run type-check    # TypeScript check

# Build & Test
npm run build         # Production build
npm run test          # Run tests (when configured)
```

### Backend

```bash
# Linting & Type Checking
python -m flake8 .    # Lint Python code
python -m mypy .      # Type checking

# Running Server
uvicorn main:app --reload          # Development
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app  # Production

# Database
alembic init migrations             # Initialize migrations
alembic revision --autogenerate     # Generate migration
alembic upgrade head                # Apply migrations
```

---

## 📈 Performance Metrics

- **Frontend Lighthouse (Desktop):** 90+ performance
- **Frontend First Contentful Paint:** <2s
- **Frontend Time to Interactive:** <3s
- **Backend API Response Time:** <500ms (Groq baseline)
- **Database Queries:** Indexed on user_id, client_id, project_id
- **Backend Throughput:** 1000+ concurrent requests (FastAPI + Uvicorn)

---

## 🤝 Contributing

Contributions are welcome! We're actively developing new features and appreciate community feedback.

### How to Contribute

1. Fork the repository (frontend or backend)
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request with a clear description

### Contribution Areas

- 🐛 **Bug fixes**: Report issues in GitHub Issues
- ✨ **Features**: Check the roadmap; suggest new ideas
- 📖 **Documentation**: Improve guides and API docs
- 🧪 **Tests**: Add unit/integration tests
- 🎨 **UI/UX**: Design improvements
- 🚀 **Performance**: Optimization suggestions

### Code Standards

**Frontend:**
- **TypeScript**: Strict mode required
- **Formatting**: Prettier + ESLint
- **Naming**: camelCase for variables, PascalCase for components

**Backend:**
- **Python**: PEP 8 compliant
- **Type Hints**: All functions typed
- **Docstrings**: Document complex functions
- **Testing**: Add unit tests for new endpoints

## 🙏 Acknowledgments

Built with:

**Frontend:**
- [Next.js](https://nextjs.org/) - React framework
- [Shadcn UI](https://shadcn-ui.com/) - Component library
- [TailwindCSS](https://tailwindcss.com/) - Styling

**Backend:**
- [FastAPI](https://fastapi.tiangolo.com/) - Modern Python web framework
- [SQLAlchemy](https://sqlalchemy.org/) - ORM
- [Pydantic](https://docs.pydantic.dev/) - Data validation
- [Groq](https://groq.com/) - Lightning-fast inference
- [NeonDB](https://neon.tech/) - Serverless PostgreSQL

---

## 📅 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history and updates.

### v0.9 (Current - MVP)
- ✅ Frontend: Client/project CRUD, Kanban pipeline
- ✅ Backend: FastAPI REST API with JWT auth
- ✅ AI: Email & proposal generation via Groq
- ✅ Database: NeonDB PostgreSQL schema
- ✅ Activity logging & CSV export
- 🚧 Email sync (in progress)

### v1.0 (Next)
- Email calendar integration
- Slack notifications
- Team collaboration
- Advanced analytics

---

## 📊 Status

**Development Stage:** MVP (Actively Maintained)

### Frontend
- [x] Client Management UI
- [x] Project & Pipeline
- [x] Dashboard & Overview
- [x] Settings & Export
- [x] Error Handling & Performance

### Backend
- [x] Authentication (JWT)
- [x] Client API endpoints
- [x] Project API endpoints
- [x] AI endpoints (Groq integration)
- [x] Activity logging
- [ ] Email sync
- [ ] Advanced analytics

**Next Milestone:** Email sync + Slack integration (v1.0)

---

## ⚠️ Known Limitations

- Free tier rate limits: 14,400 requests/day on Groq
- Single-user (team features coming v1.1+)
- Email send requires external provider (Resend, SendGrid)
- Mobile app coming later (web is mobile-responsive)

---

## 📚 Documentation

- **[Frontend Setup Guide](./docs/SETUP.md)** - Detailed installation
- **[Backend API Docs](https://spark-crm-backend-production.up.railway.app/docs)** - Swagger UI
- **[Architecture](./docs/ARCHITECTURE.md)** - System design
- **[Database Schema](./docs/DATABASE.md)** - NeonDB structure
- **[Deployment](./docs/DEPLOYMENT.md)** - Vercel + Railway setup
- **[API Integration](./docs/API.md)** - Frontend-backend communication

---

## 🎯 Roadmap

See [ROADMAP.md](./docs/ROADMAP.md) for detailed feature plans.

**Q1 2026 (v1.0):**
- Email sync (Gmail/Outlook)
- Slack notifications
- Team management

**Q2 2026 (v1.1):**
- Client portal
- Invoicing
- Time tracking

**Q3 2026 (v1.2):**
- API & webhooks
- Zapier integration
- Advanced AI (churn prediction, deal scoring)

---

## 💰 Pricing (Future)

**Vision**: Freemium model
- Free tier: 1 user, 5 clients, basic AI features
- Pro: $29/month, 3 users, unlimited clients, advanced AI
- Enterprise: Custom pricing for teams 10+

*Currently in development; free for testing.*

---

## 🔗 Links

- **Frontend GitHub**: [github.com/arfin-web/spark-crm](https://github.com/arfin-web/spark-crm)
- **Backend GitHub**: [github.com/arfin-web/spark-crm-backend](https://github.com/arfin-web/spark-crm-backend)
- **Live Demo**: [spark-crm.com](https://spark-crm-seven.vercel.app/)
- **API Docs**: [spark-crm-api.app/docs](https://spark-crm-backend-production.up.railway.app/docs)
- **Portfolio**: [arfins-portfolio.com](https://arfins-portfolio.vercel.app)

---

**Made with ❤️ by [Arfin Noor Rahman](https://arfins-portfolio.vercel.app/)**

Last updated: `June 11, 2026`  
Version: `v0.9 (MVP)`  