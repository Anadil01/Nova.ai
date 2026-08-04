nova-ai/                          ← your Next.js monorepo
│
├── apps/web/                     ← job seeker + recruiter portal
├── apps/bot/                     ← WhatsApp handler (Node.js)
│
├── services/ (Docker Compose)
│   ├── openwa/                   ← OpenWA container (:2785)
│   ├── reactive-resume/          ← RxResume container (:3050)
│   ├── n8n/                      ← n8n workflows (:5678)
│   └── deepinterview/            ← interview coach (:3100)
│
├── agents/ (Python — CrewAI)
│   ├── job_scout.py              ← JobSpy + ranking
│   ├── resume_tailor.py          ← Claude rewrites bullets
│   ├── ats_scorer.py             ← spaCy + Claude scoring
│   ├── cover_letter.py           ← Claude per-company
│   └── crew.py                   ← CrewAI orchestration
│
└── packages/
    ├── db/                       ← Prisma + PostgreSQL
    └── config/                   ← shared env vars