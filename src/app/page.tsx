import Link from 'next/link'
import { ArrowRight, Check, Zap, Shield, BarChart3, Globe, Code2, Users, Star, ChevronRight, Sparkles, Database, Lock } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built on Next.js with edge computing and CDN distribution for sub-100ms response times globally.',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption, SOC2 compliance, and automatic security patches keep your data safe.',
    color: 'from-green-400 to-emerald-500',
  },
  {
    icon: Database,
    title: 'Managed Database',
    description: 'Supabase PostgreSQL with automatic backups, point-in-time recovery, and real-time subscriptions.',
    color: 'from-blue-400 to-cyan-500',
  },
  {
    icon: Lock,
    title: 'Auth Built-in',
    description: 'Complete authentication system with email, OAuth, magic links, and multi-factor authentication.',
    color: 'from-purple-400 to-pink-500',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Insights',
    description: 'Real-time dashboards and custom reports to track your key metrics and business performance.',
    color: 'from-indigo-400 to-violet-500',
  },
  {
    icon: Globe,
    title: 'Global Deployment',
    description: 'Deploy to 30+ regions worldwide with automatic failover and zero-downtime deployments.',
    color: 'from-rose-400 to-pink-500',
  },
]

const stats = [
  { value: '50K+', label: 'Active Users' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '< 50ms', label: 'Response Time' },
  { value: '150+', label: 'Countries' },
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO at TechFlow',
    avatar: 'SC',
    content: 'NexaStack cut our development time in half. The built-in auth and database integrations are flawless.',
  },
  {
    name: 'Marcus Johnson',
    role: 'Lead Developer at Buildify',
    avatar: 'MJ',
    content: "We moved our entire platform to NexaStack and haven't looked back. Performance is incredible.",
  },
  {
    name: 'Elena Rodriguez',
    role: 'Founder at LaunchPad',
    avatar: 'ER',
    content: 'As a solo founder, NexaStack gives me enterprise-grade infrastructure without the complexity.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white dark:bg-gray-950">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-100 dark:bg-primary-900/20 rounded-full blur-3xl opacity-60" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-60" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary-50/50 to-transparent dark:from-primary-900/10 rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-800 text-primary-600 dark:text-primary-400 text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            Now with AI-powered features
            <ChevronRight className="w-3.5 h-3.5" />
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up text-balance leading-[1.1]">
            Build faster,{' '}
            <span className="gradient-text">deploy smarter</span>,<br />
            scale infinitely
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 animate-slide-up text-balance leading-relaxed">
            NexaStack is the all-in-one platform for modern web development. Authentication, database, API, and global deployment — ready in minutes, not months.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
            <Link href="/#features">
              <Button size="lg" className="gap-2 px-8 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40">
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">
                <Code2 className="w-4 h-4 mr-2" />
                See how it works
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 mt-10 text-sm text-gray-500 dark:text-gray-400">
            {['No credit card required', 'Free tier forever', '5-minute setup'].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-green-500" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-1">{value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
              <Zap className="w-3.5 h-3.5" /> Everything you need
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-balance">
              All the tools, none of the overhead
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Stop stitching together dozens of services. NexaStack gives you a complete production stack with a single subscription.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, description, color }) => (
              <Card key={title} hover className="group">
                <CardContent className="p-6">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Loved by developers</h2>
            <p className="text-gray-600 dark:text-gray-400">Trusted by 50,000+ teams worldwide</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, avatar, content }) => (
              <Card key={name}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-5">"{content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                      {avatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">{name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="section bg-white dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-balance">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Start free. Scale as you grow. No hidden fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <Button size="lg">View All Plans</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-purple-700 dark:from-primary-800 dark:to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-4xl font-bold text-white mb-4 text-balance">
            Ready to build something great?
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-xl mx-auto">
            Join 50,000+ developers who ship faster with NexaStack. Free to start, easy to scale.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#features">
              <Button size="lg" className="bg-white text-primary-700 hover:bg-primary-50 shadow-lg">
                Get Started — It's Free
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                <Users className="w-4 h-4 mr-2" />
                Talk to Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
