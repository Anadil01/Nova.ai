nova-ai/
├── apps/
│   ├── web/                          ← Next.js frontend
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── marketing/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── auth/
│   │   │   │   │   ├── login/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── onboard/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── dashboard/
│   │   │   │   │   ├── layout.tsx
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── jobs/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── resume/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── tracker/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── profile/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── settings/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── api/
│   │   │   │       ├── users/
│   │   │   │       │   └── route.ts
│   │   │   │       ├── jobs/
│   │   │   │       │   └── route.ts
│   │   │   │       └── applications/
│   │   │   │           └── route.ts
│   │   │   ├── components/
│   │   │   │   ├── ui/
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Badge.tsx
│   │   │   │   │   ├── Card.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── layout/
│   │   │   │   │   ├── Sidebar.tsx
│   │   │   │   │   ├── DashboardTopbar.tsx
│   │   │   │   │   ├── SiteNav.tsx
│   │   │   │   │   └── SiteFooter.tsx
│   │   │   │   ├── dashboard/
│   │   │   │   │   ├── DashboardStats.tsx
│   │   │   │   │   ├── JobMatchCards.tsx
│   │   │   │   │   ├── ResumeHealthWidget.tsx
│   │   │   │   │   ├── ActivityFeed.tsx
│   │   │   │   │   ├── InterviewWidget.tsx
│   │   │   │   │   ├── QuickActions.tsx
│   │   │   │   │   └── ProfileProgress.tsx
│   │   │   │   └── onboarding/
│   │   │   │       ├── LoginForm.tsx
│   │   │   │       └── OnboardingFlow.tsx
│   │   │   ├── lib/
│   │   │   │   ├── utils/
│   │   │   │   │   └── index.ts
│   │   │   │   └── api/
│   │   │   │       └── client.ts
│   │   │   ├── hooks/
│   │   │   │   └── useUser.ts
│   │   │   ├── types/
│   │   │   │   └── index.ts
│   │   │   └── styles/
│   │   │       └── globals.css
│   │   ├── next.config.js
│   │   ├── tailwind.config.ts
│   │   ├── postcss.config.js
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── bot/                          ← WhatsApp bot (Node.js)
│       ├── src/
│       │   ├── index.ts
│       │   ├── routes/
│       │   │   ├── webhook.ts
│       │   │   └── health.ts
│       │   ├── handlers/
│       │   │   ├── message.ts
│       │   │   ├── onboarding/
│       │   │   │   └── onboarding.handler.ts
│       │   │   ├── jobs/
│       │   │   │   └── jobs.handler.ts
│       │   │   ├── resume/
│       │   │   │   └── resume.handler.ts
│       │   │   └── tracker/
│       │   │       └── tracker.handler.ts
│       │   ├── services/
│       │   │   ├── user.ts
│       │   │   └── wati/
│       │   │       ├── sender.ts
│       │   │       └── types.ts
│       │   ├── ai/
│       │   │   └── agents/
│       │   │       └── intent.ts
│       │   ├── middleware/
│       │   │   └── auth.ts
│       │   └── utils/
│       │       ├── logger.ts
│       │       └── cron.ts
│       ├── tsconfig.json
│       └── package.json
│
├── packages/
│   ├── db/
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   ├── src/
│   │   │   └── index.ts
│   │   └── package.json
│   └── config/
│       ├── src/
│       │   └── index.ts
│       └── package.json
│
├── package.json
├── turbo.json
├── tsconfig.json
├── .gitignore
├── .env.example
└── README.md