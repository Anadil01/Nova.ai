import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow'

export const metadata = { title: 'Set up your profile — Nova' }

export default function OnboardPage() {
  return (
    <main className="min-h-screen bg-[#050810] flex flex-col items-center justify-center px-4 py-12">
      <OnboardingFlow />
    </main>
  )
}