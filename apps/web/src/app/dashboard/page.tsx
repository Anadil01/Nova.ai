import { DashboardStats }     from '@/components/dashboard/DashboardStats'
import { JobMatchCards }      from '@/components/dashboard/JobMatchCards'
import { ResumeHealthWidget } from '@/components/dashboard/ResumeHealthWidget'
import { ActivityFeed }       from '@/components/dashboard/ActivityFeed'
import { InterviewWidget }    from '@/components/dashboard/InterviewWidget'
import { QuickActions }       from '@/components/dashboard/QuickActions'
import { ProfileProgress }    from '@/components/dashboard/ProfileProgress'

export const metadata = { title: 'Dashboard — Nova' }

export default function DashboardPage() {
  return (
    <div className="p-5 space-y-5">
      <DashboardStats />
      <div className="grid grid-cols-2 gap-4">
        <ProfileProgress />
        <QuickActions />
      </div>
      <div className="grid grid-cols-[1fr_320px] gap-4">
        <JobMatchCards />
        <div className="space-y-4">
          <InterviewWidget />
          <ResumeHealthWidget />
          <ActivityFeed />
        </div>
      </div>
    </div>
  )
}