import { RecruiterLanding } from '@/components/recruiter/RecruiterLanding'

export const metadata = { title: 'Hire smarter — Nova for Employers' }

// Override the hire layout for the landing page — no sidebar needed
export default function HireLanding() {
  return <RecruiterLanding />
}