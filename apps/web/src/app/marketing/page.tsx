import { SiteNav }            from '@/components/layout/SiteNav'
import { HeroSection }        from '@/components/marketing/HeroSection'
import { MarqueeSection }     from '@/components/marketing/MarqueeSection'
import { HowItWorksSection }  from '@/components/marketing/HowItWorksSection'
import { FeaturesSection }    from '@/components/marketing/FeaturesSection'
import { TrustSection }       from '@/components/marketing/TrustSection'
import { TestimonialsSection } from '@/components/marketing/TestimonialsSection'
import { CompareSection }     from '@/components/marketing/CompareSection'
import { PricingSection }     from '@/components/marketing/PricingSection'
import { CtaSection }         from '@/components/marketing/CtaSection'
import { SiteFooter }         from '@/components/layout/SiteFooter'

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
