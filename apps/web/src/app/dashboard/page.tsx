import { DashboardStats }     from '@/components/dashboard/DashboardStats'
import { ProfileProgress }    from '@/components/dashboard/ProfileProgress'
import { QuickActions }       from '@/components/dashboard/QuickActions'
import { JobMatchCards }      from '@/components/dashboard/JobMatchCards'
import { InterviewWidget }    from '@/components/dashboard/InterviewWidget'
import { ResumeHealthWidget } from '@/components/dashboard/ResumeHealthWidget'
import { ActivityFeed }       from '@/components/dashboard/ActivityFeed'

export const metadata = { title: 'Dashboard — Nova' }

export default function DashboardPage() {
  return (
    <div className="p-5 space-y-5 max-w-[1400px]">

      {/* Row 1 — stats */}
      <DashboardStats />

      {/* Row 2 — profile + quick actions */}
      <div className="grid grid-cols-[1fr_320px] gap-4">
        <ProfileProgress />
        <QuickActions />
      </div>

      {/* Row 3 — jobs (main) + right column */}
      <div className="grid grid-cols-[1fr_300px] gap-4">
        <JobMatchCards />
        <div className="flex flex-col gap-4">
          <InterviewWidget />
          <ResumeHealthWidget />
          <ActivityFeed />
        </div>
      </div>

    </div>
  )
}