import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, X, Zap, HelpCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing for every stage of your journey. Start free, scale as you grow.',
}

const plans = [
  {
    name: 'Free',
    description: 'Perfect for side projects and exploration.',
    price: { monthly: 0, yearly: 0 },
    cta: 'Get Started Free',
    ctaVariant: 'outline' as const,
    href: '/signup',
    popular: false,
    features: [
      { text: '3 projects', included: true },
      { text: '10,000 API requests/month', included: true },
      { text: '500MB database storage', included: true },
      { text: 'Community support', included: true },
      { text: 'Custom domain', included: false },
      { text: 'Advanced analytics', included: false },
      { text: 'Priority support', included: false },
      { text: 'SLA guarantee', included: false },
    ],
  },
  {
    name: 'Pro',
    description: 'For professionals and growing teams.',
    price: { monthly: 0, yearly: 0 },
    cta: 'Start Pro Trial',
    ctaVariant: 'primary' as const,
    href: '/signup?plan=pro',
    popular: true,
    features: [
      { text: 'Unlimited projects', included: true },
      { text: '500,000 API requests/month', included: true },
      { text: '10GB database storage', included: true },
      { text: 'Email support', included: true },
      { text: 'Custom domain', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Priority support', included: false },
      { text: 'SLA guarantee', included: false },
    ],
  },
  {
    name: 'Enterprise',
    description: 'For large organizations with advanced needs.',
    price: { monthly: 0, yearly: 0 },
    cta: 'Contact Sales',
    ctaVariant: 'outline' as const,
    href: '/contact',
    popular: false,
    features: [
      { text: 'Unlimited projects', included: true },
      { text: 'Unlimited API requests', included: true },
      { text: '100GB database storage', included: true },
      { text: 'Dedicated support', included: true },
      { text: 'Custom domain', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Priority support', included: true },
      { text: '99.9% SLA guarantee', included: true },
    ],
  },
]

const faq = [
  {
    q: 'Can I change plans later?',
    a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated.',
  },
  {
    q: 'What happens when I exceed my plan limits?',
    a: "We'll notify you when you're approaching your limits. You can upgrade or we'll gracefully throttle requests rather than hard-failing.",
  },
  {
    q: 'Do you offer a free trial?',
    a: 'Yes! The Free tier is free forever. Pro and Enterprise plans come with a 14-day free trial — no credit card required.',
  },
  {
    q: 'How does billing work?',
    a: 'We bill monthly or yearly. Yearly plans save you ~20%. All prices are in USD and include applicable taxes.',
  },
  {
    q: 'Can I get a refund?',
    a: 'Yes, we offer a 30-day money-back guarantee for all paid plans. No questions asked.',
  },
  {
    q: 'Do you offer discounts for startups or non-profits?',
    a: 'We offer 50% discount for qualifying startups and non-profits. Contact us to apply.',
  },
]

export default function PricingPage() {
  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/60 to-transparent dark:from-primary-900/10 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="info" className="mb-4">Save 20% with yearly billing</Badge>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 text-balance">
            Simple pricing, no surprises
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Start free. Scale when you're ready. Every plan includes a 14-day trial of the next tier.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan) => (
              <div key={plan.name} className="relative">
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-lg">
                      <Zap className="w-3 h-3" /> Most Popular
                    </span>
                  </div>
                )}
                <Card className={cn(
                  'h-full',
                  plan.popular ? 'border-primary-300 dark:border-primary-700 ring-2 ring-primary-500/20 shadow-xl' : ''
                )}>
                  <CardContent className="p-7">
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{plan.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{plan.description}</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                          ${plan.price.monthly}
                        </span>
                        {plan.price.monthly > 0 && (
                          <span className="text-gray-500 dark:text-gray-400 text-sm">/month</span>
                        )}
                      </div>
                      {plan.price.yearly > 0 && (
                        <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                          ${plan.price.yearly}/mo billed yearly
                        </p>
                      )}
                    </div>

                    <Link href={plan.href} className="block mb-6">
                      <Button variant={plan.popular ? 'primary' : 'outline'} className="w-full">
                        {plan.cta}
                      </Button>
                    </Link>

                    <ul className="space-y-3">
                      {plan.features.map(({ text, included }) => (
                        <li key={text} className={cn('flex items-center gap-3 text-sm', included ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-600')}>
                          {included
                            ? <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                            : <X className="w-4 h-4 text-gray-300 dark:text-gray-700 flex-shrink-0" />
                          }
                          {text}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
            All plans include free SSL, CDN, and automatic backups. Prices in USD. <Link href="/contact" className="text-primary-600 dark:text-primary-400 hover:underline">Need a custom plan?</Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-600 dark:text-gray-400">Can't find what you're looking for? <Link href="/contact" className="text-primary-600 dark:text-primary-400 hover:underline">Contact us</Link>.</p>
          </div>
          <div className="space-y-4">
            {faq.map(({ q, a }) => (
              <Card key={q}>
                <CardContent className="p-6">
                  <div className="flex gap-3">
                    <HelpCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">{q}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{a}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
