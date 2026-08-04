Nova Platform
│
├── 🤖 AGENT LAYER
│   ├── CrewAI          — multi-agent orchestration
│   ├── LangGraph       — stateful agent workflows  
│   └── n8n             — no-code automation glue
│
├── 📄 RESUME LAYER
│   ├── Reactive Resume — builder UI + templates (self-hosted)
│   └── PyMuPDF / pdfminer — PDF parsing + text extraction
│
├── 📊 ATS / SCORING LAYER
│   ├── spaCy           — NLP, keyword extraction
│   └── Claude API      — semantic scoring + gap analysis
│
├── 💬 WHATSAPP LAYER
│   └── OpenWA          — self-hosted gateway (free)
│
├── 🔍 JOB SCRAPING LAYER
│   ├── JobSpy          — LinkedIn + Indeed + Naukri unified scraper
│   └── Playwright      — Naukri fallback (headless browser)
│
├── 🎤 INTERVIEW PREP LAYER
│   └── DeepInterview   — voice-first mock interviewer (self-hosted)
│
├── ⚙️ WORKFLOW AUTOMATION
│   └── n8n             — daily digests, notifications, triggers
│
└── 🗃️ INFRA LAYER
    ├── PostgreSQL + Prisma — database
    ├── Redis (Upstash)    — caching + queues
    ├── Cloudflare R2      — PDF storage
    └── Railway / Render   — hosting



User: "Apply to Senior React jobs in Bangalore"
  ↓
Job Scout Agent    → finds 10 matching jobs via JobSpy
Resume Agent       → tailors resume for top 3
ATS Scorer Agent   → verifies score > 80 before sending
Cover Letter Agent → writes per-company cover letters
Apply Agent        → submits applications