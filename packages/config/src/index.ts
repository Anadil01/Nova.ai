export const config = {
    DATABASE_URL:            process.env.DATABASE_URL!,
    // REDIS_URL:               process.env.REDIS_URL!,
    // WATI_API_URL:            process.env.WATI_API_URL ?? 'https://live-mt-server.wati.io',
    // WATI_API_TOKEN:          process.env.WATI_API_TOKEN!,
    // WATI_WEBHOOK_TOKEN:      process.env.WATI_WEBHOOK_TOKEN!,
    // ANTHROPIC_API_KEY:       process.env.ANTHROPIC_API_KEY!,
    // CLAUDE_MODEL:            process.env.CLAUDE_MODEL ?? 'claude-sonnet-4-6',
    // RAZORPAY_KEY_ID:         process.env.RAZORPAY_KEY_ID!,
    // RAZORPAY_KEY_SECRET:     process.env.RAZORPAY_KEY_SECRET!,
    // RAZORPAY_WEBHOOK_SECRET: process.env.RAZORPAY_WEBHOOK_SECRET!,
    // R2_ACCOUNT_ID:           process.env.R2_ACCOUNT_ID!,
    // R2_ACCESS_KEY:           process.env.R2_ACCESS_KEY!,
    // R2_SECRET_KEY:           process.env.R2_SECRET_KEY!,
    // R2_BUCKET:               process.env.R2_BUCKET ?? 'nova-resumes',
    // R2_PUBLIC_URL:           process.env.R2_PUBLIC_URL!,
    // NEXT_PUBLIC_APP_URL:     process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
    // BOT_PORT:                Number(process.env.BOT_PORT ?? 3001),
    // NODE_ENV:                process.env.NODE_ENV ?? 'development',
    // JWT_SECRET:              process.env.JWT_SECRET ?? 'dev-secret-change-in-production',
    // PLANS: {
    //   FREE:  { appsPerMonth: 3,   resumesTotal: 1,   matchesPerWeek: 5   },
    //   PRO:   { appsPerMonth: 50,  resumesTotal: 999, matchesPerWeek: 999 },
    //   POWER: { appsPerMonth: 999, resumesTotal: 999, matchesPerWeek: 999 },
    // },
  } as const
  
  export type Config = typeof config