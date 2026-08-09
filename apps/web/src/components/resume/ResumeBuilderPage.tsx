'use client'
import { useState } from 'react'
import { ResumeList }    from './ResumeList'
import { ResumePreview } from './ResumePreview'
import { AtsPanel }      from './AtsPanel'

export interface ResumeVersion {
  id:        string
  name:      string
  targetJob: string
  version:   number
  atsScore:  number
  updatedAt: string
  isDefault: boolean
}

export interface ResumeContent {
  name:        string
  role:        string
  email:       string
  phone:       string
  location:    string
  linkedin:    string
  summary:     string
  experience:  {
    title:   string
    company: string
    period:  string
    bullets: string[]
  }[]
  skills:      string[]
  education:   {
    degree:  string
    school:  string
    year:    string
  }[]
  keywords: string[]   // highlighted ATS keywords
}

export const MOCK_RESUMES: ResumeVersion[] = [
  {
    id:        '1',
    name:      'React Developer — Razorpay',
    targetJob: 'Senior React Developer · Razorpay',
    version:   3,
    atsScore:  82,
    updatedAt: '2d ago',
    isDefault: true,
  },
  {
    id:        '2',
    name:      'Full Stack — Zepto',
    targetJob: 'Full Stack Engineer · Zepto',
    version:   2,
    atsScore:  78,
    updatedAt: '4d ago',
    isDefault: false,
  },
  {
    id:        '3',
    name:      'Generic Resume',
    targetJob: 'General · not job-specific',
    version:   1,
    atsScore:  61,
    updatedAt: '8d ago',
    isDefault: false,
  },
]

export const MOCK_CONTENT: ResumeContent = {
  name:     'Arjun Rao',
  role:     'Senior React Developer',
  email:    'arjun@email.com',
  phone:    '+91 98765 43210',
  location: 'Bangalore',
  linkedin: 'linkedin.com/in/arjunrao',
  summary:
    'Results-driven React Developer with 3+ years of experience building scalable, high-performance web applications. Proven expertise in React.js, Node.js, and MongoDB. Strong background in payment systems and fintech products.',
  keywords: ['React.js', 'Node.js', 'MongoDB', 'REST APIs', 'payment systems', 'fintech'],
  experience: [
    {
      title:   'Frontend Developer',
      company: 'TechCorp Solutions · Bangalore · Full-time',
      period:  'Jan 2022 – Present',
      bullets: [
        'Built React.js dashboards handling 50K+ daily active users across payment portal',
        'Integrated REST APIs with Node.js backend, reducing latency by 35%',
        'Led migration of legacy jQuery codebase to modern React.js component architecture',
        'Reduced page load time by 40% via code-splitting and lazy loading',
      ],
    },
    {
      title:   'Junior React Developer',
      company: 'StartupXYZ · Remote · Contract',
      period:  'Jun 2021 – Dec 2021',
      bullets: [
        'Developed reusable component library using React.js and Storybook',
        'Worked with cross-functional teams in an Agile environment',
        'Built REST APIs integrations for third-party fintech services',
      ],
    },
  ],
  skills: [
    'React.js', 'Node.js', 'MongoDB', 'REST APIs', 'Git',
    'JavaScript', 'TypeScript', 'Redux', 'Jest', 'HTML/CSS',
  ],
  education: [
    {
      degree: 'B.Tech Computer Science Engineering',
      school: 'VIT University · Vellore',
      year:   '2021',
    },
  ],
}

export function ResumeBuilderPage() {
  const [selected, setSelected]   = useState<ResumeVersion>(MOCK_RESUMES[0])
  const [generating, setGenerating] = useState(false)

  const handleGenerate = async () => {
    setGenerating(true)
    // TODO: POST /api/resumes/generate
    await new Promise(r => setTimeout(r, 2000))
    setGenerating(false)
  }

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left — resume list */}
      <ResumeList
        resumes={MOCK_RESUMES}
        selected={selected}
        onSelect={setSelected}
        onGenerate={handleGenerate}
        generating={generating}
      />

      {/* Center — PDF preview */}
      <ResumePreview content={MOCK_CONTENT} resume={selected} />

      {/* Right — ATS panel */}
      <AtsPanel resume={selected} />
    </div>
  )
}