export interface NavUser {
    id: string
    name: string | null
    phone: string
    plan: 'FREE' | 'PRO' | 'POWER'
  }
  
  export interface JobCard {
    id: string
    title: string
    company: string
    location: string | null
    workMode: string
    salaryMin: number | null
    salaryMax: number | null
    skills: string[]
    source: string
    sourceUrl: string
    postedAt: string | null
    matchScore?: number
  }
  
  export interface ResumeVersion {
    id: string
    name: string
    targetRole: string | null
    atsScore: number | null
    version: number
    pdfUrl: string | null
    updatedAt: string
  }
  
  export interface ApplicationRow {
    id: string
    status: string
    appliedAt: string
    autoApplied: boolean
    job: {
      id: string
      title: string
      company: string
      location: string | null
      salaryMin: number | null
      salaryMax: number | null
      source: string
    }
  }
  
  export interface DashboardStats {
    totalApplied: number
    profileViews: number
    callbacks: number
    interviews: number
  }
  
  export interface OnboardingState {
    step: 1 | 2 | 3 | 4 | 5
    role: string
    experience: number
    skills: string[]
    city: string
    workMode: string
    salaryMin: number
    salaryMax: number
  }