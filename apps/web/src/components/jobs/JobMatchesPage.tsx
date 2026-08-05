'use client'
import { useState } from 'react'
import { JobFilters }    from './JobFilters'
import { JobList }       from './JobList'
import { JobDrawer }     from './JobDrawer'
import type { JobCard }  from '@/types'

// ── Mock data ─────────────────────────────────────────────
export const MOCK_JOBS: JobCard[] = [
  {
    id: '1',
    title:      'Senior React Developer',
    company:    'Razorpay',
    initials:   'RZ',
    location:   'Bangalore + Remote',
    workMode:   'HYBRID',
    salaryMin:  18,
    salaryMax:  22,
    skills:     ['React.js', 'Node.js', 'TypeScript', 'REST APIs', 'Jest'],
    missingSkills: ['TypeScript'],
    source:     'Naukri',
    sourceUrl:  'https://naukri.com',
    postedAt:   new Date(Date.now() - 6 * 3600000).toISOString(),
    matchScore: 96,
    ghostScore: 98,
    tags:       ['New today', 'Remote ok'],
    applied:    false,
    description: 'We are looking for a Senior React Developer to join our payments dashboard team. You will build high-performance frontend experiences used by 50M+ businesses across India.',
    responsibilities: [
      'Build and maintain React-based frontend for Razorpay Dashboard',
      'Collaborate with backend team on API design and integration',
      'Lead code reviews and mentor junior developers',
      'Optimise performance for high-traffic payment flows',
    ],
    coverLetter: "Dear Hiring Team at Razorpay, I'm excited to apply for the Senior React Developer role. With 3 years of experience building high-performance React applications and a proven track record in Node.js and MongoDB, I believe I can contribute meaningfully to your payments dashboard team...",
  },
  {
    id: '2',
    title:      'Full Stack Engineer',
    company:    'Zepto',
    initials:   'ZP',
    location:   'Mumbai',
    workMode:   'ONSITE',
    salaryMin:  16,
    salaryMax:  20,
    skills:     ['React', 'MongoDB', 'Node.js', 'AWS'],
    missingSkills: ['AWS'],
    source:     'LinkedIn',
    sourceUrl:  'https://linkedin.com',
    postedAt:   new Date(Date.now() - 9 * 3600000).toISOString(),
    matchScore: 91,
    ghostScore: 95,
    tags:       ['New today'],
    applied:    false,
    description: 'Join Zepto\'s fast-moving engineering team to build the infrastructure powering India\'s fastest grocery delivery platform.',
    responsibilities: [
      'Build scalable full stack features across React frontend and Node.js backend',
      'Design and optimize MongoDB schemas for high-throughput operations',
      'Integrate AWS services for storage, queues, and notifications',
      'Ship features rapidly in a high-ownership environment',
    ],
    coverLetter: "Dear Zepto Team, I'm very interested in the Full Stack Engineer position. My experience building scalable applications with React, Node.js, and MongoDB aligns perfectly with your tech stack...",
  },
  {
    id: '3',
    title:      'Frontend Lead',
    company:    'CRED',
    initials:   'CR',
    location:   'Bangalore',
    workMode:   'ONSITE',
    salaryMin:  20,
    salaryMax:  24,
    skills:     ['React', 'TypeScript', 'GraphQL', 'Design Systems'],
    missingSkills: ['GraphQL', 'Design Systems'],
    source:     'Naukri',
    sourceUrl:  'https://naukri.com',
    postedAt:   new Date(Date.now() - 24 * 3600000).toISOString(),
    matchScore: 88,
    ghostScore: 90,
    tags:       [],
    applied:    false,
    description: 'CRED is looking for a Frontend Lead to own our design system and lead a team of 4 engineers building world-class financial product interfaces.',
    responsibilities: [
      'Own and evolve the CRED design system',
      'Lead a team of 4 frontend engineers',
      'Drive TypeScript migration of core product modules',
      'Partner with design to implement pixel-perfect, accessible UI',
    ],
    coverLetter: "Dear CRED Team, I'm excited about the Frontend Lead opportunity. My experience leading frontend teams and building design systems makes me a strong candidate...",
  },
  {
    id: '4',
    title:      'Node.js Backend Developer',
    company:    'PhonePe',
    initials:   'PP',
    location:   'Bangalore',
    workMode:   'HYBRID',
    salaryMin:  14,
    salaryMax:  18,
    skills:     ['Node.js', 'PostgreSQL', 'Redis', 'Microservices'],
    missingSkills: [],
    source:     'LinkedIn',
    sourceUrl:  'https://linkedin.com',
    postedAt:   new Date(Date.now() - 48 * 3600000).toISOString(),
    matchScore: 79,
    ghostScore: 88,
    tags:       [],
    applied:    true,
    description: 'PhonePe is hiring Node.js developers to build the payment infrastructure handling 4 billion transactions per year.',
    responsibilities: [
      'Build high-throughput APIs handling millions of transactions daily',
      'Design microservices architecture for payment processing',
      'Implement Redis caching strategies for low-latency operations',
      'Write comprehensive tests for mission-critical financial flows',
    ],
    coverLetter: '',
  },
  {
    id: '5',
    title:      'MERN Stack Developer',
    company:    'Swiggy',
    initials:   'SW',
    location:   'Bangalore',
    workMode:   'HYBRID',
    salaryMin:  12,
    salaryMax:  16,
    skills:     ['React', 'Express', 'MongoDB', 'Node.js'],
    missingSkills: [],
    source:     'Indeed',
    sourceUrl:  'https://indeed.com',
    postedAt:   new Date(Date.now() - 72 * 3600000).toISOString(),
    matchScore: 74,
    ghostScore: 72,
    tags:       [],
    applied:    false,
    description: 'Join Swiggy\'s restaurant tech team as a MERN developer to build tools used by 150,000+ restaurant partners.',
    responsibilities: [
      'Build features for Swiggy restaurant partner portal',
      'Develop RESTful APIs with Express and MongoDB',
      'Implement real-time order tracking with Socket.io',
      'Optimize React app performance for low-end Android devices',
    ],
    coverLetter: '',
  },
  {
    id: '6',
    title:      'React Native Developer',
    company:    'Groww',
    initials:   'GW',
    location:   'Bangalore + Remote',
    workMode:   'REMOTE',
    salaryMin:  16,
    salaryMax:  22,
    skills:     ['React Native', 'TypeScript', 'Redux', 'iOS', 'Android'],
    missingSkills: ['React Native', 'iOS'],
    source:     'Naukri',
    sourceUrl:  'https://naukri.com',
    postedAt:   new Date(Date.now() - 96 * 3600000).toISOString(),
    matchScore: 68,
    ghostScore: 85,
    tags:       ['Remote'],
    applied:    false,
    description: 'Groww is building India\'s largest investment platform. Join us to build the mobile app used by 7 million investors.',
    responsibilities: [
      'Build and ship React Native features for Groww mobile app',
      'Implement complex financial data visualisations',
      'Optimise app performance on low-memory Android devices',
      'Collaborate with iOS and Android native teams',
    ],
    coverLetter: '',
  },
]

export type Filters = {
  matchMin:  number
  jobType:   string[]
  locations: string[]
  salaryMin: number
  salaryMax: number
  sources:   string[]
  workMode:  string[]
}

const DEFAULT_FILTERS: Filters = {
  matchMin:  0,
  jobType:   [],
  locations: [],
  salaryMin: 0,
  salaryMax: 50,
  sources:   [],
  workMode:  [],
}

export function JobMatchesPage() {
  const [filters, setFilters]       = useState<Filters>(DEFAULT_FILTERS)
  const [selected, setSelected]     = useState<JobCard | null>(MOCK_JOBS[0])
  const [saved, setSaved]           = useState<string[]>([])
  const [drawerOpen, setDrawerOpen] = useState(true)

  const toggleSave = (id: string) =>
    setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  // Apply filters
  const filtered = MOCK_JOBS.filter(j => {
    if (filters.matchMin > 0 && (j.matchScore ?? 0) < filters.matchMin) return false
    if (filters.workMode.length && !filters.workMode.includes(j.workMode)) return false
    if (filters.sources.length && !filters.sources.includes(j.source)) return false
    if (filters.salaryMax < 50 && (j.salaryMin ?? 0) > filters.salaryMax) return false
    return true
  })

  return (
    <div className="flex h-full overflow-hidden">
      {/* Filter panel */}
      <JobFilters filters={filters} setFilters={setFilters} total={filtered.length} />

      {/* Results */}
      <JobList
        jobs={filtered}
        selected={selected}
        saved={saved}
        onSelect={j => { setSelected(j); setDrawerOpen(true) }}
        onToggleSave={toggleSave}
      />

      {/* Detail drawer */}
      {selected && drawerOpen && (
        <JobDrawer
          job={selected}
          saved={saved.includes(selected.id)}
          onToggleSave={() => toggleSave(selected.id)}
          onClose={() => setDrawerOpen(false)}
        />
      )}
    </div>
  )
}