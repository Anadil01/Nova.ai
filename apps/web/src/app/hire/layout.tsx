'use client'
import { usePathname } from 'next/navigation'
import { RecruiterSidebar } from '@/components/recruiter/RecruiterSidebar'
import { RecruiterTopbar }  from '@/components/recruiter/RecruiterTopbar'

export default function HireLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLanding = pathname === '/hire'

  if (isLanding) return <>{children}</>

  return (
    <div className="flex h-screen overflow-hidden bg-[#060810]">
      <RecruiterSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <RecruiterTopbar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}