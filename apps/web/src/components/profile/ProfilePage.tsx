'use client'
import { useState } from 'react'
import { ProfileCard }      from './ProfileCard'
import { ProfileCompletion } from './ProfileCompletion'
import { ProfileStats }     from './ProfileStats'
import { BasicInfoForm }    from './BasicInfoForm'
import { SkillsSection }    from './SkillsSection'
import { ExperienceSection } from './ExperienceSection'
import { EducationSection } from './EducationSection'
import { JobPreferences }   from './JobPreferences'

export interface ProfileData {
  name:        string
  role:        string
  email:       string
  phone:       string
  city:        string
  linkedin:    string
  portfolio:   string
  summary:     string
  primarySkills:   string[]
  secondarySkills: string[]
  experience: {
    id:          string
    title:       string
    company:     string
    location:    string
    type:        string
    startDate:   string
    endDate:     string
    isCurrent:   boolean
    description: string
  }[]
  education: {
    id:     string
    degree: string
    school: string
    year:   string
    cgpa:   string
  }[]
  preferences: {
    targetRole:   string
    expLevel:     string
    cities:       string[]
    workMode:     string[]
    salaryMin:    number
    salaryMax:    number
    industries:   string[]
    jobType:      string
  }
}

export const INITIAL_PROFILE: ProfileData = {
  name:      'Arjun Rao',
  role:      'Frontend Developer',
  email:     'arjun@email.com',
  phone:     '+91 98765 43210',
  city:      'Bangalore',
  linkedin:  '',
  portfolio: '',
  summary:
    'Results-driven Frontend Developer with 2+ years of experience building scalable React applications. Strong background in Node.js and MongoDB.',
  primarySkills:   ['React.js', 'Node.js', 'MongoDB', 'JavaScript', 'REST APIs', 'Git'],
  secondarySkills: ['Redux', 'Jest', 'Webpack', 'HTML/CSS'],
  experience: [
    {
      id:          'e1',
      title:       'Frontend Developer',
      company:     'TechCorp Solutions',
      location:    'Bangalore',
      type:        'Full-time',
      startDate:   'Jan 2022',
      endDate:     '',
      isCurrent:   true,
      description: 'Built React dashboards for 50K+ DAU. Integrated REST APIs with Node.js backend. Reduced load time by 40% via code-splitting.',
    },
    {
      id:          'e2',
      title:       'Junior React Developer',
      company:     'StartupXYZ',
      location:    'Remote',
      type:        'Contract',
      startDate:   'Jun 2021',
      endDate:     'Dec 2021',
      isCurrent:   false,
      description: 'Developed reusable component library using React and Storybook. Worked in Agile sprints.',
    },
  ],
  education: [
    {
      id:     'edu1',
      degree: 'B.Tech Computer Science Engineering',
      school: 'VIT University · Vellore',
      year:   '2021',
      cgpa:   '8.2',
    },
  ],
  preferences: {
    targetRole:  'Software Engineer',
    expLevel:    'Junior (1–3 yrs)',
    cities:      ['Bangalore', 'Remote'],
    workMode:    ['Hybrid', 'Remote'],
    salaryMin:   10,
    salaryMax:   20,
    industries:  ['Technology', 'Fintech', 'E-commerce'],
    jobType:     'Full-time',
  },
}

export function ProfilePage() {
  const [profile, setProfile]   = useState<ProfileData>(INITIAL_PROFILE)
  const [saving, setSaving]     = useState(false)
  const [saved, setSaved]       = useState(false)

  const update = (patch: Partial<ProfileData>) =>
    setProfile(p => ({ ...p, ...patch }))

  const handleSave = async () => {
    setSaving(true)
    // TODO: PATCH /api/users/profile
    await new Promise(r => setTimeout(r, 1000))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="p-5 max-w-[1200px]">

      {/* Topbar */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-medium text-white">My profile</h1>
          <p className="text-xs text-white/35 mt-0.5">
            72% complete · add LinkedIn URL to reach 80%
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="text-xs border border-white/10 hover:border-white/20 text-white/50 hover:text-white px-3.5 py-2 rounded-xl transition-all">
            Preview resume →
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="text-xs bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white font-medium px-4 py-2 rounded-xl transition-all flex items-center gap-2"
          >
            {saving ? (
              <>
                <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Saving…
              </>
            ) : saved ? '✓ Saved!' : '💾 Save changes'}
          </button>
        </div>
      </div>

      {/* 2-col layout */}
      <div className="grid grid-cols-[260px_1fr] gap-5">

        {/* Left column */}
        <div className="space-y-4">
          <ProfileCard   profile={profile} onUpdate={update} />
          <ProfileCompletion profile={profile} />
          <ProfileStats />
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <BasicInfoForm    profile={profile} onUpdate={update} />
          <SkillsSection    profile={profile} onUpdate={update} />
          <ExperienceSection profile={profile} onUpdate={update} />
          <EducationSection  profile={profile} onUpdate={update} />
          <JobPreferences   profile={profile} onUpdate={update} />
        </div>
      </div>
    </div>
  )
}