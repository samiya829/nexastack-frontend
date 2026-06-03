import type { Metadata } from 'next'
import { Target, Heart, Zap, Users, Globe, Award } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about NexaStack — our mission, team, and the values that drive us to build the best platform for modern web development.',
}

const values = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description: 'We exist to eliminate the complexity of building and deploying modern web applications. Every decision is guided by this goal.',
    color: 'from-blue-400 to-cyan-500',
  },
  {
    icon: Heart,
    title: 'Developer-First',
    description: "We're developers building for developers. Every feature is designed with the developer experience as the first priority.",
    color: 'from-rose-400 to-pink-500',
  },
  {
    icon: Zap,
    title: 'Relentless Performance',
    description: "Speed is a feature. We're obsessed with performance at every level — from millisecond response times to 5-minute deployments.",
    color: 'from-yellow-400 to-orange-500',
  },
  {
    icon: Globe,
    title: 'Open & Transparent',
    description: 'We build in public, share our roadmap openly, and believe the best products come from honest collaboration with our community.',
    color: 'from-green-400 to-emerald-500',
  },
]

const team = [
  {
    name: 'Alex Rivera',
    role: 'CEO & Co-founder',
    bio: 'Former engineering lead at Google. Built and scaled systems serving 500M+ users.',
    initials: 'AR',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'Jordan Kim',
    role: 'CTO & Co-founder',
    bio: 'Systems architect. Previously at AWS designing the infrastructure for global deployments.',
    initials: 'JK',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    name: 'Sam Taylor',
    role: 'Head of Product',
    bio: 'Product visionary with 10+ years shipping developer tools used by millions worldwide.',
    initials: 'ST',
    gradient: 'from-green-500 to-teal-600',
  },
  {
    name: 'Morgan Lee',
    role: 'Head of Engineering',
    bio: 'Open-source contributor and distributed systems expert. Loves building things that scale.',
    initials: 'ML',
    gradient: 'from-orange-500 to-red-600',
  },
  {
    name: 'Casey Davis',
    role: 'Head of Design',
    bio: 'Design systems specialist focused on creating intuitive developer experiences that delight.',
    initials: 'CD',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    name: 'Riley Johnson',
    role: 'Head of Growth',
    bio: 'Growth strategist who previously scaled two developer-first startups to Series B.',
    initials: 'RJ',
    gradient: 'from-violet-500 to-purple-600',
  },
]

const milestones = [
  { year: '2021', event: 'Founded in San Francisco with $2M seed round' },
  { year: '2022', event: 'Launched v1.0 with core platform features, 5,000 users in 6 months' },
  { year: '2023', event: 'Series A — $15M. Expanded to 50+ regions, launched enterprise tier' },
  { year: '2024', event: '50,000+ users, 500+ enterprise customers, AI features launched' },
  { year: '2025', event: 'Series B — $40M. Global expansion, 150+ countries served' },
]

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/60 to-transparent dark:from-primary-900/10 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm font-medium mb-6">
            <Users className="w-3.5 h-3.5" /> Our Story
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 text-balance">
            Building the future of<br />
            <span className="gradient-text">web development</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We started NexaStack because we were frustrated with the complexity of modern web development. Too many tools, too much configuration, too little time to build what actually matters.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
                <Target className="w-3.5 h-3.5" /> Our Mission
              </div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Empowering every developer to build world-class products
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                We believe that great software shouldn't require a 50-person engineering team. The infrastructure, security, and scalability that previously only Fortune 500 companies could afford should be accessible to every developer and every startup.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                NexaStack handles the heavy lifting — authentication, databases, deployments, and monitoring — so you can focus on building the product your users love.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '50K+', label: 'Developers', icon: Users },
                { value: '99.9%', label: 'Uptime', icon: Award },
                { value: '150+', label: 'Countries', icon: Globe },
                { value: '< 50ms', label: 'Avg Response', icon: Zap },
              ].map(({ value, label, icon: Icon }) => (
                <Card key={label}>
                  <CardContent className="p-5 text-center">
                    <Icon className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">The principles that guide every decision we make.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, title, description, color }) => (
              <Card key={title}>
                <CardContent className="p-6 flex gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="section bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Meet the Team</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">Builders, dreamers, and problem-solvers passionate about developer experience.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map(({ name, role, bio, initials, gradient }) => (
              <Card key={name} hover>
                <CardContent className="p-6 text-center">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4`}>
                    {initials}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{name}</h3>
                  <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-3">{role}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-white dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Journey</h2>
            <p className="text-gray-600 dark:text-gray-400">From idea to global platform in just a few years.</p>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800" />
            <div className="space-y-8">
              {milestones.map(({ year, event }) => (
                <div key={year} className="relative flex gap-6 items-start pl-20">
                  <div className="absolute left-0 w-16 text-right">
                    <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{year}</span>
                  </div>
                  <div className="absolute left-[60px] w-4 h-4 rounded-full bg-primary-500 border-4 border-white dark:border-gray-950 -translate-x-1/2 mt-0.5" />
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed pt-0.5">{event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
