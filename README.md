# Spark CRM - AI-Powered Minimal CRM for Agencies

> A lightweight, intelligent CRM built for creative agencies. Spark CRM helps you manage clients, projects, and proposals without the complexity of enterprise tools.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-actively%20maintained-brightgreen.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![Next.js](https://img.shields.io/badge/nextjs-16.2%2B-black)

## 🎯 Overview

Spark CRM is an open-source CRM designed specifically for marketing, design, and development agencies (10-50 people). It solves the problem of bloated enterprise CRMs by offering a minimal, AI-powered solution that lets teams focus on client relationships, not software training.

**Key differentiators:**
- ⚡ AI-assisted email drafts and proposal generation
- 🎨 Minimal, intuitive UI (add a client in <30 seconds)
- 📊 Smart client health scoring and segmentation
- 🚀 Built on modern stack: Next.js, Supabase, Vercel AI SDK
- 📱 Mobile-responsive for field usage
- 🔐 Row-level security via Supabase RLS policies

**[Live Demo](https://spark-crm-seven.vercel.app)** | **[Backend Repo](https://github.com/arfin-web/spark-crm-backend)** | **[API Documentation](https://spark-crm-backend-production.up.railway.app/docs)** 

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
  - ✨ **Email Draft Generator**: Contextual follow-up emails powered by Claude via Groq
  - ✨ **Proposal Generator**: Auto-generate project proposals from brief descriptions
  - Activity logging with timestamps
  - Rich text note taking

- **Authentication & Security**
  - Clerk Auth (OAuth + Email/Password)
  - Supabase RLS policies for row-level data isolation
  - Secure Server Actions for all mutations
  - HTTPS-only deployment

- **Dashboard & Analytics**
  - Overview metrics (active clients, project status, pending follow-ups)
  - Recent activity feed
  - Upcoming deadline alerts
  - Client health overview

- **Developer Experience**
  - TypeScript strict mode
  - Zod validation schemas
  - React Query for data fetching
  - ESLint + Prettier configured
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

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 16.2+ (App Router) | React server/client components |
| **UI** | Shadcn UI + TailwindCSS | Component library + styling |
| **Database** | Supabase (PostgreSQL) | Data storage + RLS + real-time |
| **Auth** | Clerk | User authentication + management |
| **AI** | Vercel AI SDK + Groq | LLM integration for email/proposal generation |
| **Forms** | React Hook Form + Zod | Type-safe form handling |
| **Data Fetching** | React Query (TanStack) | Server state management |
| **Drag-Drop** | @dnd-kit | Kanban pipeline interactions |
| **Hosting** | Vercel | Edge deployment + functions |
| **Language** | TypeScript | Type safety across the stack |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- Supabase account (free tier OK)
- Clerk account (free tier OK)
- Groq API key (free tier: 14,400 req/day)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/pitch-crm.git
cd pitch-crm
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_KEY=eyJxxx... # Server-side only

# AI - Groq (Free tier: 14,400 req/day)
GROQ_API_KEY=gsk_...

# Optional: Vercel AI Gateway (for multi-provider support)
AI_GATEWAY_API_KEY=...
```

### 4. Set Up Supabase

```bash
# Create tables and apply migrations
npm run db:migrate

# Or manually import schema from /sql/schema.sql in Supabase dashboard
```

Apply RLS policies:
```sql
-- See /sql/rls-policies.sql
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Create First User

- Click "Sign Up"
- Authenticate via Google OAuth or email
- Complete onboarding (agency name, use case)
- Start adding clients!

---

---

## 🤖 AI Features Explained

### Email Draft Generator

Uses **Groq's Llama 3.1 8B** for fast, cost-efficient email generation.

Example:
Purpose: "follow_up"
Client: "Acme Design Co."
Last Activity: "Sent proposal 5 days ago"

Generated:
Subject: "Following up on your proposal"
Body: "Hi [client], I hope you've had a chance to review the proposal..."
```

**Why Groq?**
- ⚡ 800+ tokens/second (fastest inference)
- 💰 Free tier: 14,400 requests/day
- 📉 Scales to $0.05/M tokens after free tier
- OpenAI-compatible API (easy switching)

### Proposal Generator

Uses **Groq's Llama 3.3 70B** for higher-quality, longer-form content.

```typescript
// Input: Brief description, client details
// Output: Structured proposal with scope, timeline, cost

Generates:
- Deliverables
- Project timeline
- Cost estimate
- Terms & conditions (template)
```

---

## 🔐 Security

- **Authentication**: Clerk handles OAuth and MFA
- **Database Security**: Supabase RLS policies enforce user-level data isolation
- **API Security**: All mutations via Server Actions (no exposed endpoints)
- **Secrets**: Never commit `.env.local`; use Vercel dashboard for prod
- **HTTPS**: Always enabled on Vercel
- **Validation**: Zod schemas validate all inputs server-side

Example RLS Policy:
```sql
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_can_see_own_clients" ON clients
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "users_can_insert_own_clients" ON clients
  FOR INSERT WITH CHECK (user_id = auth.uid());
```

---

## 📊 API & Data

### Server Actions (Preferred over REST API)

All data mutations use Server Actions for simplicity and type safety.

```typescript
// /app/server/actions/clients.ts

'use server'

export async function addClient(data: AddClientInput) {
  const user = await auth(); // Clerk
  if (!user) throw new Error('Unauthorized');

  const validated = AddClientSchema.parse(data);
  const { data: client, error } = await supabase
    .from('clients')
    .insert({ user_id: user.id, ...validated })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return client;
}
```

### Database Schema

**Key Tables:**
- `users` (Clerk auth)
- `clients` (contacts, companies)
- `projects` (deals, pipelines)
- `proposals` (AI-generated or manual)
- `activities` (interaction log)
- `email_drafts` (AI-generated emails)

[See full schema](./sql/schema.sql)

---

## 🧪 Development

### Run Tests (Planned)

```bash
npm run test
```

### Linting & Formatting

```bash
npm run lint          # Run ESLint
npm run format        # Run Prettier
npm run type-check    # TypeScript check
```

### Build for Production

```bash
npm run build
npm start
```

---

## 📈 Performance Metrics

- **Lighthouse (Desktop):** 90+ performance
- **First Contentful Paint:** <2s
- **Time to Interactive:** <3s
- **API Response Time:** <500ms (Groq baseline)
- **Database Queries:** Indexed on `user_id`, `client_id`, `project_id`

---

## 🤝 Contributing

Contributions are welcome! We're actively developing new features and appreciate community feedback.

### How to Contribute

1. Fork the repository
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

- **TypeScript**: Strict mode required
- **Formatting**: Prettier + ESLint
- **Naming**: camelCase for variables, PascalCase for components
- **Comments**: Document complex logic
- **Tests**: Add tests for new features

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 💬 Community & Support

- **Discussions**: [GitHub Discussions](https://github.com/yourusername/pitch-crm/discussions)
- **Issues**: [Report bugs here](https://github.com/yourusername/pitch-crm/issues)
- **Twitter**: [@yourhandle](https://twitter.com/yourhandle)
- **Email**: support@pitch-crm.app (if applicable)

---

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Open-source Firebase
- [Shadcn UI](https://shadcn-ui.com/) - Component library
- [Vercel AI SDK](https://sdk.vercel.ai/) - AI integration
- [Groq](https://groq.com/) - Lightning-fast inference
- [Clerk](https://clerk.com/) - Authentication

---

## 📅 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history and updates.

### v0.9 (Current - MVP)
- ✅ Core client/project CRUD
- ✅ Kanban pipeline
- ✅ AI email & proposal generation
- ✅ Activity logging
- ✅ CSV export
- 🚧 Email sync (in progress)

### v1.0 (Next)
- Email calendar integration
- Slack notifications
- Team collaboration
- Advanced filtering

---

## 📊 Status

**Development Stage:** MVP (Actively Maintained)

- [x] Phase 1: Foundation & Auth
- [x] Phase 2: Client Management
- [x] Phase 3: Project Tracking
- [x] Phase 4: Activity Logging
- [x] Phase 5: AI Features
- [x] Phase 6: Dashboard
- [x] Phase 7: Settings & Export
- [x] Phase 8: Error Handling & Performance
- [ ] Phase 9: Email Integration
- [ ] Phase 10: Advanced Analytics

**Next Milestone:** Email sync + Slack integration (v1.0)

---

## ⚠️ Known Limitations

- Free tier rate limits: 14,400 requests/day on Groq
- Single-user (team features coming v1.1+)
- Email send requires external provider (Resend, SendGrid)
- Mobile app coming later (web is mobile-responsive)

---

## 📚 Documentation

- **[Setup Guide](./docs/SETUP.md)** - Detailed installation
- **[Architecture](./docs/ARCHITECTURE.md)** - System design
- **[AI Integration](./docs/AI.md)** - How Groq & Vercel AI SDK work
- **[Database](./docs/DATABASE.md)** - Schema & RLS policies
- **[Deployment](./docs/DEPLOYMENT.md)** - Vercel production setup

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

- **GitHub**: [github.com/arfin-web/spark-crm](https://github.com/arfin-web/spark-crm)
- **Live Demo**: [spark-crm.com](https://spark-crm-seven.vercel.app/)
- **Portfolio**: [arfins-portfolio.com](https://arfins-portfolio.vercel.app)

---

**Made with ❤️ by [Arfin Noor Rahman](https://arfins-portfolio.vercel.app/)**

Last updated: `[June 11, 2026]`  
Version: `v0.9 (MVP)`