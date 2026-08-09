'use client'
import { cn } from '@/lib/utils'
import type { ResumeContent, ResumeVersion } from './ResumeBuilderPage'

interface Props {
  content: ResumeContent
  resume:  ResumeVersion
}

// Wrap ATS-matched keywords with a highlight span
function HighlightedText({
  text,
  keywords,
}: {
  text:     string
  keywords: string[]
}) {
  if (!keywords.length) return <>{text}</>

  const pattern = new RegExp(
    `(${keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
    'gi'
  )
  const parts = text.split(pattern)

  return (
    <>
      {parts.map((part, i) =>
        keywords.some(k => k.toLowerCase() === part.toLowerCase()) ? (
          <mark
            key={i}
            className="bg-violet-500/20 text-violet-200 rounded px-0.5 not-italic"
            title="ATS keyword matched"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  )
}

export function ResumePreview({ content, resume }: Props) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden border-r border-white/8">

      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8 bg-[#08090f] flex-shrink-0">
        <div className="flex-1">
          <p className="text-xs font-medium text-white">{resume.name} · v{resume.version}</p>
          <p className="text-[10px] text-white/30 mt-0.5">
            Targeted: {resume.targetJob}
          </p>
        </div>
        <button className="text-xs text-white/40 hover:text-white/70 border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-lg transition-all">
          ✎ Edit
        </button>
        <button className="text-xs bg-violet-600 hover:bg-violet-500 text-white px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5">
          ↓ Download PDF
        </button>
      </div>

      {/* Keyword legend */}
      <div className="flex items-center gap-2 px-4 py-2 bg-violet-500/5 border-b border-violet-500/15 flex-shrink-0">
        <mark className="bg-violet-500/20 text-violet-300 rounded px-1 text-[10px] not-italic">keyword</mark>
        <p className="text-[10px] text-violet-400/70">
          Highlighted text = ATS-matched keywords from your target JD
        </p>
      </div>

      {/* PDF page */}
      <div className="flex-1 overflow-y-auto bg-[#0a0c14] p-6">
        <div className="max-w-[600px] mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8 text-gray-800 text-[11px] leading-relaxed font-sans">

            {/* Header */}
            <div className="mb-5 pb-4 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900 mb-0.5">{content.name}</h1>
              <p className="text-sm font-medium text-violet-600 mb-2">{content.role}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-[10px] text-gray-500">
                <span>✉ {content.email}</span>
                <span>📞 {content.phone}</span>
                <span>📍 {content.location}</span>
                <span>🔗 {content.linkedin}</span>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-5">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2 pb-1 border-b border-gray-200">
                Professional Summary
              </h2>
              <p className="text-[11px] text-gray-700 leading-relaxed">
                <HighlightedText text={content.summary} keywords={content.keywords} />
              </p>
            </div>

            {/* Experience */}
            <div className="mb-5">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-3 pb-1 border-b border-gray-200">
                Work Experience
              </h2>
              {content.experience.map((exp, i) => (
                <div key={i} className="mb-4">
                  <div className="flex items-start justify-between mb-0.5">
                    <p className="font-bold text-[12px] text-gray-900">{exp.title}</p>
                    <p className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{exp.period}</p>
                  </div>
                  <p className="text-[10px] text-gray-500 mb-1.5 italic">{exp.company}</p>
                  {exp.bullets.map((b, j) => (
                    <div key={j} className="flex gap-2 mb-1">
                      <span className="text-gray-400 flex-shrink-0 mt-0.5">•</span>
                      <p className="text-[11px] text-gray-700 leading-relaxed">
                        <HighlightedText text={b} keywords={content.keywords} />
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="mb-5">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2 pb-1 border-b border-gray-200">
                Skills
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {content.skills.map(sk => (
                  <span
                    key={sk}
                    className={cn(
                      'text-[10px] px-2 py-0.5 rounded border',
                      content.keywords.some(k => k.toLowerCase() === sk.toLowerCase())
                        ? 'bg-violet-50 border-violet-200 text-violet-700'
                        : 'bg-gray-50 border-gray-200 text-gray-600'
                    )}
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2 pb-1 border-b border-gray-200">
                Education
              </h2>
              {content.education.map((edu, i) => (
                <div key={i} className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-[11px] text-gray-900">{edu.degree}</p>
                    <p className="text-[10px] text-gray-500">{edu.school}</p>
                  </div>
                  <p className="text-[10px] text-gray-400">{edu.year}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}