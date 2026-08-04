import type { Metadata } from 'next'
import { DM_Sans, Syne } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import '@/styles/globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nova — Your next career, supercharged.',
  description:
    'Nova finds jobs, builds your resume, writes cover letters, and applies for you — all on WhatsApp. No app needed.',
  keywords: ['job search', 'AI job agent', 'resume builder', 'WhatsApp jobs', 'Nova AI'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${syne.variable}`}>
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0a0f1e',
              color: '#f0f0f8',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '10px',
            },
          }}
        />
      </body>
    </html>
  )
}