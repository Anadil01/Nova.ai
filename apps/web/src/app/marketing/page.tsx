import { SiteNav }            from '@/src/components/layout/SiteNav'
import { HeroSection }        from '@/src/components/marketing/HeroSection'
import { MarqueeSection }     from '@/src/components/marketing/MarqueeSection'
import { HowItWorksSection }  from '@/src/components/marketing/HowItWorksSection'
import { FeaturesSection }    from '@/src/components/marketing/FeaturesSection'
import { TrustSection }       from '@/src/components/marketing/TrustSection'
import { TestimonialsSection } from '@/src/components/marketing/TestimonialsSection'
import { CompareSection }     from '@/src/components/marketing/CompareSection'
import { PricingSection }     from '@/src/components/marketing/PricingSection'
import { CtaSection }         from '@/src/components/marketing/CtaSection'
import { SiteFooter }         from '@/src/components/layout/SiteFooter'

export const metadata = {
  title: 'Nova — Your next career, supercharged.',
  description:
    'Nova finds jobs, builds your ATS resume, and applies for you — all on WhatsApp. No app needed.',
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050810]">
      <SiteNav />
      <HeroSection />
      <MarqueeSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TrustSection />
      <TestimonialsSection />
      <CompareSection />
      <PricingSection />
      <CtaSection />
      <SiteFooter />
    </main>
  )
}