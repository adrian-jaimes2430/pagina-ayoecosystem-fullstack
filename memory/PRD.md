# A&O Ecosystem - Product Requirements Document

## Original Problem Statement
Build a full-stack web platform for "Company A&O Ecosystem," a parent company that manages several digital business models including:
- **A&O Ecosistema**: Corporate landing page
- **ANMA Soluciones**: E-commerce and dropshipping platform with AI assistant (LucidBot)
- **NomadHive**: Remote work platform for brand promoters with tasks, points, and rewards
- **Inverfact**: Investment education platform with strategy activation system
- **InverPulse**: Internal broker platform with multi-level investor system

## User Personas
- **Super Admin**: Full platform control (jaimesblandon.adrianfelipe@gmail.com)
- **Admin Marca**: Brand-specific management
- **Impulsador**: NomadHive promoters earning commissions
- **Inversor**: Inverfact/InverPulse investors
- **Miembro**: Regular platform member

## Tech Stack
- **Backend**: FastAPI, MongoDB (motor async driver), JWT Authentication
- **Frontend**: React, React Router, TailwindCSS, Shadcn/UI
- **Integrations**: OpenAI GPT-5.2 (LucidBot), Stripe (payments), Emergent LLM Key

---

## What's Been Implemented

### Session: February 1, 2026

#### Core Authentication & Platform
- ✅ JWT-based user authentication (register, login, logout)
- ✅ Session management with HTTP-only cookies
- ✅ CORS configuration fixed for cross-origin requests
- ✅ Super Admin user created and configured

#### Landing Pages
- ✅ A&O Ecosystem main landing
- ✅ ANMA Soluciones landing
- ✅ NomadHive landing
- ✅ Inverfact landing with investment strategies
- ✅ InverPulse landing

#### ANMA E-commerce
- ✅ Product catalog with 6 sample products
- ✅ Shopping experience with LucidBot AI chat
- ✅ Stripe payment integration ready

#### InverPulse Broker Platform
- ✅ Multi-level investor system (Hierro → Rubí)
- ✅ KYC verification system
- ✅ Deposit management
- ✅ Trading signals system
- ✅ Referral code system
- ✅ Admin dashboard for InverPulse

#### Inverfact Investment Education
- ✅ **Dashboard with conditional logic**
  - Shows active strategies when available
  - Shows contact form when no strategies
- ✅ Strategy activation system (GT-KWNEX, InCruises, Trii, InverPulse)
- ✅ Contact form submission to inverfactcol@gmail.com
- ✅ Admin can activate/deactivate strategies per user

#### NomadHive Promoter Platform
- ✅ **Complete dashboard with 5 tabs:**
  - Overview: Stats, referral code, quick actions
  - Tasks: Daily, weekly, onboarding missions (+points)
  - Rewards: Redeemable rewards catalog
  - Orders: Commission tracking
  - Leaderboard: Top impulsadores ranking
- ✅ Points system with task completion
- ✅ Referral code generation
- ✅ Profile with level progression

#### Admin Dashboard (Centralized)
- ✅ **Multi-section admin panel:**
  - Resumen General: Platform stats overview
  - Productos ANMA: CRUD operations
  - Usuarios y Roles: Role management
  - Inverfact Estrategias: Toggle strategies per user
  - InverPulse: View investors list
- ✅ Quick access links to all dashboards

---

## Prioritized Backlog

### P0 - Critical (Completed)
- ~~Fix frontend login~~ ✅ DONE

### P1 - High Priority
- [ ] Email notifications via Resend (API key needed)
- [ ] Complete order flow for ANMA products
- [ ] PayPal integration for payments

### P2 - Medium Priority
- [ ] Google OAuth integration (Emergent-managed)
- [ ] Legal document acceptance system
- [ ] Full referral tracking in NomadHive

### P3 - Future Features
- [ ] Mobile-responsive optimizations
- [ ] Real financial integration for InverPulse
- [ ] Advanced analytics dashboard
- [ ] Multi-language support (ES/EN fully)

---

## API Endpoints Summary

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Products (ANMA)
- `GET /api/products` - List products
- `POST /api/products` - Create product (admin)
- `PUT /api/products/{id}` - Update product (admin)
- `DELETE /api/products/{id}` - Deactivate product (admin)

### Inverfact
- `GET /api/inverfact/strategies` - List available strategies
- `GET /api/inverfact/user/strategies` - Get user's active strategies
- `POST /api/inverfact/admin/users/{id}/strategies` - Activate strategy
- `DELETE /api/inverfact/admin/users/{id}/strategies/{sid}` - Deactivate strategy
- `POST /api/inverfact/contact` - Submit contact form

### NomadHive
- `GET /api/nomadhive/profile` - Get impulsador profile
- `GET /api/nomadhive/tasks` - Get available tasks
- `POST /api/nomadhive/tasks/{id}/complete` - Complete a task
- `GET /api/nomadhive/rewards` - Get available rewards
- `POST /api/nomadhive/rewards/{id}/redeem` - Redeem a reward
- `GET /api/nomadhive/orders` - Get impulsador orders
- `GET /api/nomadhive/leaderboard` - Get top impulsadores

### InverPulse
- `POST /api/inverpulse/register` - Register as investor
- `GET /api/inverpulse/profile` - Get investor profile
- `POST /api/inverpulse/deposits` - Create deposit
- `GET /api/inverpulse/signals` - Get trading signals
- `GET /api/inverpulse/investors` - List all investors (admin)

---

## Database Collections
- `users` - User accounts
- `products` - ANMA products
- `orders` - Product orders
- `user_sessions` - Authentication sessions
- `inverfact_user_strategies` - Strategy activations
- `inverfact_contacts` - Contact form submissions
- `nomadhive_profiles` - Impulsador profiles
- `nomadhive_completed_tasks` - Task completions
- `nomadhive_redemptions` - Reward redemptions
- `inversores_inverpulse` - InverPulse investors
- `inverpulse_deposits` - Investor deposits
- `inverpulse_signals` - Trading signals

---

## Test Credentials
- **Email**: jaimesblandon.adrianfelipe@gmail.com
- **Password**: Fagipitu2430*
- **Role**: super_admin
- **InverPulse Level**: RUBI (highest)
- **NomadHive Referral Code**: NH33E053
- **Inverfact Active Strategies**: GT-KWNEX, InverPulse
