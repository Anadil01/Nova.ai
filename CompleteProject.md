# Nova AI — Complete Build Plan

> India's first WhatsApp AI job agent.
> Find jobs · build resumes · auto-apply · all on WhatsApp.

---

## What is Nova?

Nova is a job platform that solves three problems the 2026 market created:

1. **For job seekers** — AI-flooded job boards, ghost jobs everywhere, ATS filters blocking real talent
2. **For recruiters** — 1,000 AI-generated resumes per role, can't find real candidates
3. **For tier-2 India** — Naukri and LinkedIn never really worked for people outside metros

Nova fixes all three: verified candidates, real job listings only, WhatsApp-native for everyone.

---

## Architecture decision — Next.js vs Express

```
Browser request  →  Next.js API routes (/app/api/)  →  PostgreSQL
WhatsApp message →  Express bot (apps/bot/)          →  Next.js API  →  PostgreSQL
Cron job         →  Express bot (apps/bot/)          →  Next.js API  →  PostgreSQL
```

**Rule:** User-triggered actions = Next.js API routes. Bot + cron = Express.
The bot never talks to the DB directly — it calls the Next.js APIs.
This gives one source of truth and one place to add auth/validation.

---

## Tech stack

| Layer              | Technology                          | Why                                      |
|--------------------|-------------------------------------|------------------------------------------|
| Web frontend       | Next.js 14, Tailwind CSS, Zustand   | Full-stack, Vercel deploy, fast           |
| Web backend        | Next.js API routes                  | Same repo, no extra server               |
| WhatsApp bot       | Node.js + Express (apps/bot/)       | Persistent process, webhook receiver      |
| AI / LLM           | Claude API (claude-sonnet-4-6)      | Best for structured extraction + writing |
| Resume builder     | Reactive Resume (self-hosted)       | 38k stars, MIT, 15+ templates, free      |
| WhatsApp gateway   | OpenWA (self-hosted) → WATI later   | Free, self-hosted, swap in one file      |
| Job scraping       | JobSpy (Python)                     | LinkedIn + Naukri + Indeed unified       |
| ATS scoring        | spaCy + Claude                      | spaCy for speed, Claude for semantics    |
| Agent orchestration| CrewAI (Python)                     | Multi-agent job search pipeline          |
| Workflow automation| n8n (self-hosted)                   | Daily digests, cron triggers, free       |
| Interview coach    | DeepInterview (self-hosted)         | Voice mock interviews, open source       |
| Database           | PostgreSQL + Prisma ORM             | Railway free tier                        |
| Cache / queues     | Redis (Upstash free tier)           | Session state, bot conversation state   |
| File storage       | Cloudflare R2 (10GB free)           | Resume PDFs                              |
| Payments           | Razorpay                            | UPI + card, India-first                 |
| Hosting (web)      | Vercel                              | Free tier, auto-deploy                  |
| Hosting (bot)      | Railway                             | Always-on Node.js process               |

---

## Monorepo structure

```
nova-ai/
│
├── apps/
│   ├── web/                          ← Next.js 14 (frontend + API)
│   │   └── src/
│   │       ├── app/
│   │       │   ├── layout.tsx
│   │       │   ├── marketing/        ← landing page (/)
│   │       │   │   └── page.tsx
│   │       │   ├── auth/
│   │       │   │   ├── login/        ← phone OTP login
│   │       │   │   │   └── page.tsx
│   │       │   │   └── onboard/      ← 5-step profile setup
│   │       │   │       └── page.tsx
│   │       │   ├── dashboard/        ← job seeker portal (/dashboard)
│   │       │   │   ├── layout.tsx    ← sidebar + topbar
│   │       │   │   ├── page.tsx      ← dashboard home
│   │       │   │   ├── jobs/         ← job matches
│   │       │   │   ├── resume/       ← resume builder
│   │       │   │   ├── tracker/      ← application tracker
│   │       │   │   ├── profile/      ← user profile
│   │       │   │   ├── settings/     ← settings + billing
│   │       │   │   ├── interview/    ← interview coach
│   │       │   │   ├── skills/       ← skill gap
│   │       │   │   └── salary/       ← salary data
│   │       │   ├── hire/             ← recruiter portal (/hire)
│   │       │   │   ├── layout.tsx    ← green sidebar
│   │       │   │   ├── page.tsx      ← recruiter landing
│   │       │   │   ├── signup/       ← recruiter signup
│   │       │   │   ├── dashboard/    ← recruiter dashboard
│   │       │   │   ├── post/         ← post a job
│   │       │   │   ├── pipeline/     ← candidate pipeline
│   │       │   │   ├── candidate/
│   │       │   │   │   └── [id]/     ← candidate profile view
│   │       │   │   ├── billing/      ← employer billing
│   │       │   │   └── analytics/    ← hiring analytics
│   │       │   └── api/              ← Next.js API routes
│   │       │       ├── auth/
│   │       │       │   ├── send-otp/
│   │       │       │   └── verify-otp/
│   │       │       ├── users/
│   │       │       │   ├── route.ts  ← GET/POST user
│   │       │       │   ├── me/       ← current user
│   │       │       │   └── profile/  ← update profile
│   │       │       ├── jobs/
│   │       │       │   ├── route.ts  ← list jobs
│   │       │       │   ├── [id]/     ← single job
│   │       │       │   └── match/    ← AI matching
│   │       │       ├── applications/
│   │       │       │   ├── route.ts  ← list/create
│   │       │       │   └── [id]/     ← update status
│   │       │       ├── resumes/
│   │       │       │   ├── route.ts  ← list resumes
│   │       │       │   ├── generate/ ← Claude resume gen
│   │       │       │   └── [id]/     ← single resume
│   │       │       ├── recruiter/
│   │       │       │   ├── jobs/     ← recruiter job posts
│   │       │       │   └── candidates/ ← pipeline
│   │       │       └── webhooks/
│   │       │           ├── razorpay/ ← payment webhook
│   │       │           └── openwa/   ← WhatsApp status
│   │       ├── components/
│   │       │   ├── ui/               ← Button, Badge, Card
│   │       │   ├── layout/           ← Sidebar, SiteNav, SiteFooter
│   │       │   ├── marketing/        ← all landing page sections
│   │       │   ├── dashboard/        ← all dashboard widgets
│   │       │   ├── jobs/             ← job cards, filters, drawer
│   │       │   ├── resume/           ← resume builder components
│   │       │   ├── tracker/          ← kanban board
│   │       │   ├── recruiter/        ← recruiter portal components
│   │       │   └── onboarding/       ← LoginForm, OnboardingFlow
│   │       ├── lib/
│   │       │   ├── utils/            ← cn, formatLPA, timeAgo
│   │       │   ├── api/              ← fetch client
│   │       │   └── validators/       ← Zod schemas
│   │       ├── hooks/
│   │       │   ├── useUser.ts
│   │       │   ├── useJobs.ts
│   │       │   └── useApplications.ts
│   │       ├── types/
│   │       │   └── index.ts
│   │       └── styles/
│   │           └── globals.css
│   │
│   └── bot/                          ← Express WhatsApp bot
│       └── src/
│           ├── index.ts              ← Express server
│           ├── routes/
│           │   ├── webhook.ts        ← WhatsApp webhook receiver
│           │   ├── health.ts         ← health check
│           │   └── test.ts           ← dev-only message simulator
│           ├── handlers/
│           │   ├── message.ts        ← intent router
│           │   ├── onboarding/       ← 4-step WhatsApp onboarding
│           │   ├── jobs/             ← job search via WhatsApp
│           │   ├── resume/           ← resume request handler
│           │   ├── tracker/          ← application status
│           │   └── payments/         ← upgrade flow
│           ├── services/
│           │   ├── whatsapp/
│           │   │   ├── sender.ts     ← MockSender / OpenWA / WATI
│           │   │   └── types.ts
│           │   └── nova-api.ts       ← calls Next.js API internally
│           ├── ai/
│           │   └── agents/
│           │       └── intent.ts     ← Claude intent classifier
│           ├── middleware/
│           │   └── auth.ts
│           └── utils/
│               ├── logger.ts
│               └── cron.ts           ← 8AM digest, 6h scraper trigger
│
├── packages/
│   ├── db/                           ← Prisma schema + client (shared)
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── src/
│   │       └── index.ts
│   └── config/                       ← env vars (shared)
│       └── src/
│           └── index.ts
│
├── agents/                           ← Python AI agents (CrewAI)
│   ├── job_scout.py                  ← JobSpy scraper + ranking
│   ├── resume_tailor.py              ← Claude resume per job
│   ├── ats_scorer.py                 ← spaCy + Claude ATS scoring
│   ├── cover_letter.py               ← Claude cover letter gen
│   ├── crew.py                       ← CrewAI orchestration
│   └── requirements.txt
│
├── package.json                      ← monorepo root
├── turbo.json
├── tsconfig.json
├── .gitignore
├── .env.example
└── README.md
```

---

## Database schema — all 12 models

```
User              → core account (phone, email, plan)
Session           → auth tokens
UserProfile       → role, skills, city, salary, preferences
Experience        → work history (belongs to UserProfile)
Education         → education (belongs to UserProfile)
Job               → scraped job listings
Resume            → AI-generated resumes (JSON content + PDF URL)
Application       → user applied to job (status: APPLIED→OFFER)
Conversation      → WhatsApp bot state machine (per user)
RecruiterProfile  → employer account
JobPost           → recruiter-created job listings
Candidate         → recruiter's view of a candidate (pipeline stage)
```

---

## Environment variables

```env
# ── Database ─────────────────────────────────
DATABASE_URL="postgresql://..."

# ── Redis (Upstash) ──────────────────────────
REDIS_URL="redis://..."

# ── Auth ─────────────────────────────────────
JWT_SECRET="min-32-chars"
NEXTAUTH_SECRET="random-string"
NEXTAUTH_URL="http://localhost:3000"

# ── Claude AI ────────────────────────────────
ANTHROPIC_API_KEY="sk-ant-..."
CLAUDE_MODEL="claude-sonnet-4-6"

# ── WhatsApp ─────────────────────────────────
WHATSAPP_PROVIDER="mock"          # mock | openwa | wati
OPENWA_URL="http://localhost:2785"
OPENWA_API_KEY=""
WATI_API_URL=""                   # fill when switching to WATI
WATI_API_TOKEN=""
WATI_WEBHOOK_TOKEN=""

# ── Razorpay ─────────────────────────────────
RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_SECRET=""
RAZORPAY_WEBHOOK_SECRET=""

# ── Cloudflare R2 ────────────────────────────
R2_ACCOUNT_ID=""
R2_ACCESS_KEY=""
R2_SECRET_KEY=""
R2_BUCKET="nova-resumes"
R2_PUBLIC_URL=""

# ── Self-hosted services ─────────────────────
RESUME_BUILDER_URL="http://localhost:3050"  # Reactive Resume
DEEPINTERVIEW_URL="http://localhost:3100"   # Interview coach

# ── App ──────────────────────────────────────
NEXT_PUBLIC_APP_URL="http://localhost:3000"
BOT_PORT=3001
NODE_ENV="development"
```

---

## Complete build checklist

Everything that needs to be built, in order. Check off as you go.

---

### ✅ Sprint 1 — Foundation (DONE)

- [x] Monorepo setup (Turborepo + npm workspaces)
- [x] Prisma schema (User, Profile, Job, Resume, Application, Conversation)
- [x] Shared config package (all env vars)
- [x] Next.js app shell (layout, fonts, global CSS)
- [x] Tailwind config with Nova design tokens
- [x] Shared UI primitives (Button, Badge, Card)
- [x] Sidebar navigation with active states
- [x] Dashboard layout (Sidebar + Topbar)
- [x] Express bot skeleton (webhook receiver, intent classifier)
- [x] WhatsApp MockSender (console logs, no real WhatsApp needed)
- [x] Bot conversation state machine
- [x] WhatsApp onboarding flow (4-step: role → exp → skills → city)
- [x] Bot test endpoint (POST /test/message — simulate WhatsApp)
- [x] API route stubs (users, jobs, applications)

---

### ✅ Sprint 2 — Web pages (IN PROGRESS)

#### Landing page ✅
- [x] SiteNav (sticky, mobile menu)
- [x] HeroSection (headline, CTA, WhatsApp mockup)
- [x] MarqueeSection (company logos)
- [x] HowItWorksSection (4 steps)
- [x] FeaturesSection (8 feature cards)
- [x] TrustSection (crisis stats + trust features)
- [x] TestimonialsSection (3 testimonials)
- [x] CompareSection (vs Naukri/LinkedIn/Indeed)
- [x] PricingSection (Free/Pro/Power)
- [x] CtaSection (final CTA)
- [x] SiteFooter

#### Auth pages ✅
- [x] Login page (phone input + OTP boxes)
- [x] Onboarding flow (5 steps: role, experience, skills, location, success)

#### Dashboard ✅
- [x] DashboardStats (4 stat cards with trends)
- [x] ProfileProgress (SVG ring + checklist)
- [x] QuickActions (4 action tiles)
- [x] JobMatchCards (5 live cards + auto-apply bar + save toggle)
- [x] InterviewWidget (upcoming interviews)
- [x] ResumeHealthWidget (ATS ring + bars + missing keywords)
- [x] ActivityFeed (timeline with 5 event types)
- [x] All stub pages (jobs, resume, tracker, profile, settings, interview)

#### Job matches page — NEXT
- [ ] Filter panel (match score, job type, location, salary, source)
- [ ] Job results list (cards with match %, skills, ghost score)
- [ ] Auto-apply banner
- [ ] Job detail drawer (match band, skills legend, JD, cover letter preview)
- [ ] Save/unsave toggle
- [ ] Applied state

#### Resume builder page
- [ ] Resume version list (left panel)
- [ ] PDF preview with keyword highlighting (center)
- [ ] ATS score ring + breakdown bars (right panel)
- [ ] Missing keyword list with severity
- [ ] Nova suggestions list
- [ ] Regenerate CTA

#### Application tracker page
- [ ] Stats row (6 metrics)
- [ ] Kanban board (5 columns: Applied/Viewed/Interview/Offer/Rejected)
- [ ] Drag-to-move cards (react-beautiful-dnd or dnd-kit)
- [ ] Bulk action bar (shortlist, schedule, move, reject)
- [ ] Application detail drawer (status stepper, timeline, notes)
- [ ] Add manually button

#### Profile page
- [ ] Profile card (avatar, name, completeness ring)
- [ ] Basic info form (name, phone, email, LinkedIn, portfolio)
- [ ] Skills section (primary + secondary, add/remove)
- [ ] Work experience timeline (add/edit/delete)
- [ ] Education section
- [ ] Job preferences grid

#### Settings page
- [ ] Settings side nav (Plan / Preferences / Account / Danger)
- [ ] Current plan card (usage bars, upgrade banner)
- [ ] Plan comparison (Free/Pro/Power)
- [ ] Payment history table
- [ ] Notification toggles (8 toggles)
- [ ] WhatsApp connection status
- [ ] Nova agent behaviour toggles
- [ ] Security section (OTP, 2FA, sessions)
- [ ] Danger zone (export, pause, delete)

#### Recruiter portal
- [ ] Employer landing page (/hire)
- [ ] Recruiter signup/login
- [ ] Recruiter dashboard (stats, active jobs, pipeline funnel)
- [ ] Post a job (5-step form + live preview)
- [ ] Candidate pipeline (kanban + bulk actions + detail drawer)
- [ ] Candidate profile view
- [ ] Recruiter billing page

---

### 🔲 Sprint 3 — API layer (Next.js API routes)

#### Auth API
- [ ] POST /api/auth/send-otp   → send OTP via SMS (Fast2SMS or MSG91)
- [ ] POST /api/auth/verify-otp → verify + issue JWT session
- [ ] POST /api/auth/google     → Google OAuth callback
- [ ] GET  /api/auth/me         → current session user
- [ ] POST /api/auth/logout     → clear session

#### Users API
- [ ] GET  /api/users/me           → current user + profile
- [ ] POST /api/users/profile      → create/update profile
- [ ] GET  /api/users/stats        → dashboard stats
- [ ] GET  /api/users/activity     → activity feed

#### Jobs API
- [ ] GET  /api/jobs               → list jobs (filter: city, skills, salary, source)
- [ ] GET  /api/jobs/[id]          → single job detail
- [ ] GET  /api/jobs/match         → AI-matched jobs for current user
- [ ] POST /api/jobs/ghost-check   → score a job for authenticity

#### Applications API
- [ ] GET    /api/applications          → list all for user
- [ ] POST   /api/applications          → apply to a job
- [ ] PATCH  /api/applications/[id]     → update status
- [ ] DELETE /api/applications/[id]     → withdraw
- [ ] POST   /api/applications/bulk     → auto-apply to multiple

#### Resumes API
- [ ] GET    /api/resumes               → list all resumes for user
- [ ] POST   /api/resumes/generate      → AI generate resume (Claude)
- [ ] POST   /api/resumes/tailor        → tailor existing resume for a JD
- [ ] GET    /api/resumes/[id]          → single resume
- [ ] DELETE /api/resumes/[id]          → delete resume
- [ ] POST   /api/resumes/[id]/score    → ATS score against a JD (spaCy + Claude)
- [ ] POST   /api/resumes/[id]/pdf      → generate PDF + upload to R2

#### Recruiter API
- [ ] POST /api/recruiter/signup        → create recruiter account
- [ ] GET  /api/recruiter/jobs          → recruiter's job posts
- [ ] POST /api/recruiter/jobs          → create job post
- [ ] GET  /api/recruiter/jobs/[id]     → single job post + applicants
- [ ] GET  /api/recruiter/candidates    → all candidates in pipeline
- [ ] PATCH /api/recruiter/candidates/[id] → update stage

#### Payments API
- [ ] POST /api/payments/create-order   → Razorpay order
- [ ] POST /api/webhooks/razorpay       → payment confirmation webhook
- [ ] POST /api/payments/verify         → verify payment signature

---

### 🔲 Sprint 4 — AI features

#### Resume generation (Claude)
- [ ] Claude prompt for resume content generation
- [ ] Section-by-section generation (summary, bullets, skills)
- [ ] Tailoring logic (inject job keywords into bullets)
- [ ] ATS keyword matching (spaCy exact + Claude semantic)
- [ ] Score calculation (keyword match + format + readability)
- [ ] Gap analysis (what's missing from JD)
- [ ] PDF generation (pdfkit → upload to R2)

#### Job matching (Claude + spaCy)
- [ ] User profile → skill vector
- [ ] Job JD → skill extraction
- [ ] Match score calculation (0–100)
- [ ] Ghost job scoring (days posted, careers page check, source quality)
- [ ] Job ranking algorithm

#### Cover letter generation (Claude)
- [ ] Per-job cover letter prompt
- [ ] Company research injection
- [ ] Length and tone calibration
- [ ] User voice preservation

#### CrewAI agents (Python)
- [ ] Job Scout agent (JobSpy → scrape → score → store)
- [ ] Resume Tailor agent (Claude → per-job resume)
- [ ] ATS Scorer agent (spaCy + Claude → score + gaps)
- [ ] Cover Letter agent (Claude → per-company letter)
- [ ] Apply Agent (submit applications via API)
- [ ] Crew orchestration (all agents in pipeline)

---

### 🔲 Sprint 5 — Bot completion + automation

#### WhatsApp bot handlers (all complete)
- [ ] /jobs → show today's top 5 matches
- [ ] /apply all → auto-apply to 90%+ matches
- [ ] /resume → show ATS score + download link
- [ ] /status → show last 5 applications + statuses
- [ ] /interview → start mock interview session
- [ ] /upgrade → show plans + Razorpay payment link
- [ ] /stop → pause all messages
- [ ] /help → command menu
- [ ] Hindi language support (Claude translation layer)

#### n8n automation workflows
- [ ] Daily 8 AM job digest (top 5 matches → WhatsApp)
- [ ] Application status change notification
- [ ] Interview reminder (24h before + 1h before)
- [ ] Follow-up nudge (no response after 5 days)
- [ ] Profile completion nudge (after 3 days inactive)
- [ ] Weekly performance report

#### OpenWA integration
- [ ] Docker Compose setup for OpenWA
- [ ] QR code scan flow
- [ ] Switch MockSender → OpenWASender (one file change)
- [ ] Incoming message webhook wired to Express bot

---

### 🔲 Sprint 6 — Self-hosted services

#### Reactive Resume (resume builder UI)
- [ ] Docker Compose setup
- [ ] Running at resume.yourdomain.com
- [ ] Nova profile data pre-fill via JWT
- [ ] PDF export → R2 storage
- [ ] ATS template selection

#### DeepInterview (voice interview coach)
- [ ] Docker Compose setup
- [ ] Running at interview.yourdomain.com
- [ ] JD-specific question generation
- [ ] Voice session (LiveKit integration)
- [ ] Feedback scoring → sent back to Nova dashboard
- [ ] Embed in /dashboard/interview page

#### JobSpy scraper (Python)
- [ ] Scheduled via Express cron → triggers Python script
- [ ] Naukri + LinkedIn + Indeed unified
- [ ] Deduplication by sourceUrl
- [ ] Ghost job scoring on ingest
- [ ] Store to PostgreSQL via API
- [ ] Run every 6 hours

---

### 🔲 Sprint 7 — Trust layer (Nova's moat)

- [ ] Nova Trust Score algorithm (GitHub + skills test + profile completeness)
- [ ] GitHub OAuth integration (auto-pull repos + commit activity)
- [ ] 5-minute skill mini-tests (AI-generated per role)
- [ ] Test result → Trust Score update
- [ ] Shareable Trust Score badge (public URL)
- [ ] Ghost job detector improvements (ML scoring)
- [ ] Recruiter response rate tracking
- [ ] Recruiter honesty score (public, on job cards)
- [ ] Salary transparency engine (anonymous data collection)

---

### 🔲 Sprint 8 — Recruiter portal completion

- [ ] Recruiter onboarding flow
- [ ] Company profile page
- [ ] AI candidate matching (best matches auto-surfaced)
- [ ] WhatsApp outreach to candidates (via OpenWA)
- [ ] Interview scheduling (Google Calendar integration)
- [ ] Offer letter sending
- [ ] Hiring analytics dashboard
- [ ] Team member invites (multi-seat)
- [ ] Recruiter billing (Razorpay subscription)

---

### 🔲 Sprint 9 — Scale + polish

- [ ] Hindi language full support (all 5 WhatsApp steps)
- [ ] Tamil + Telugu basic support
- [ ] Mobile-responsive web app (all pages)
- [ ] PWA (add to home screen)
- [ ] Email notifications (Resend)
- [ ] Referral system ("invite a friend → 1 free month Pro")
- [ ] College WhatsApp group campaign tools
- [ ] SEO (job listing pages indexed by Google)
- [ ] OpenGraph / social cards
- [ ] Error monitoring (Sentry)
- [ ] Analytics (PostHog)

---

## How to run locally

### Prerequisites
- Node.js 20+
- PostgreSQL (local or Railway free tier)
- Python 3.11+ (for agents — optional for Sprint 2)

### Setup

```bash
# 1. Clone and install
git clone https://github.com/your-org/nova-ai
cd nova-ai
npm install

# 2. Environment
cp .env.example .env
# Edit .env — minimum needed for Sprint 2:
#   DATABASE_URL, JWT_SECRET, ANTHROPIC_API_KEY

# 3. Database
npm run db:generate    # generate Prisma client
npm run db:migrate     # create all tables

# 4. Run
npm run dev            # web :3000 + bot :3001

# 5. Open
# Landing page:  http://localhost:3000/marketing
# Login:         http://localhost:3000/auth/login
# Onboarding:    http://localhost:3000/auth/onboard
# Dashboard:     http://localhost:3000/dashboard
```

### Test the bot locally (no WhatsApp needed)

```bash
curl -X POST http://localhost:3001/test/message \
  -H "Content-Type: application/json" \
  -d '{"phone": "9876543210", "message": "hi i am looking for a react job in bangalore"}'

# Watch the terminal — Nova replies in console logs
```

### Simulate WhatsApp onboarding end-to-end

```bash
# Step 1 — start
curl -X POST http://localhost:3001/test/message \
  -d '{"phone":"9876543210","message":"start"}'

# Step 2 — set role
curl -X POST http://localhost:3001/test/message \
  -d '{"phone":"9876543210","message":"React Developer"}'

# Step 3 — set experience
curl -X POST http://localhost:3001/test/message \
  -d '{"phone":"9876543210","message":"2"}'

# Step 4 — add skills
curl -X POST http://localhost:3001/test/message \
  -d '{"phone":"9876543210","message":"React, Node.js, MongoDB"}'

# Step 5 — set city
curl -X POST http://localhost:3001/test/message \
  -d '{"phone":"9876543210","message":"Bangalore"}'
```

---

## Cost at each stage

| Stage | Monthly cost | Notes |
|---|---|---|
| Dev / early build | ~₹0 | All free tiers, MockSender |
| First 100 users | ~₹400 | Claude API calls only |
| First 1,000 users | ~₹1,500 | Claude + Railway + R2 |
| First paying users (10× Pro) | ₹2,990 revenue vs ₹1,500 cost | Profitable |
| 500+ users | Consider WATI/Twilio | OpenWA may get flaky at scale |

---

## What we are NOT building (intentional)

| Feature | Why we're skipping it |
|---|---|
| Native mobile app | WhatsApp IS the mobile app for Nova |
| Custom video calling | DeepInterview handles interview coach |
| Resume template editor | Reactive Resume handles all of this |
| Job scraping from scratch | JobSpy already does Naukri + LinkedIn + Indeed |
| Custom auth SMS | Use Fast2SMS (₹0.10/OTP) or MSG91 |
| Our own LLM | Claude API is cheaper than hosting a model |

---

## Current status (August 2026)

| Component | Status |
|---|---|
| Project structure + monorepo | ✅ Done |
| Prisma schema | ✅ Done |
| Bot skeleton (Express + intent AI) | ✅ Done |
| WhatsApp onboarding (bot) | ✅ Done |
| Landing page (all sections) | ✅ Done |
| Auth pages (login + onboarding) | ✅ Done |
| Dashboard (all widgets) | ✅ Done |
| Job matches page | 🔲 Next |
| Resume builder page | 🔲 Queued |
| Application tracker page | 🔲 Queued |
| Profile + Settings pages | 🔲 Queued |
| Recruiter portal | 🔲 Queued |
| Next.js API routes | 🔲 Sprint 3 |
| AI resume generation | 🔲 Sprint 4 |
| Job scraper + matching | 🔲 Sprint 4 |
| Bot completion | 🔲 Sprint 5 |
| OpenWA integration | 🔲 Sprint 5 |
| Trust Score + skill tests | 🔲 Sprint 7 |
| Hindi language | 🔲 Sprint 9 |