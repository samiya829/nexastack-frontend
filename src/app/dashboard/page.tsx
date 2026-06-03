import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase-server'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import { BarChart3, FileText, MessageSquare, User, Settings, ArrowUpRight, Zap, TrendingUp } from 'lucide-react'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login?redirect=/dashboard')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, slug, published, created_at')
    .eq('author_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  const { count: totalPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('author_id', user.id)

  const { count: totalMessages } = await supabase
    .from('contact_messages')
    .select('*', { count: 'exact', head: true })

  const stats = [
    { label: 'Total Posts', value: totalPosts ?? 0, icon: FileText, color: 'from-blue-400 to-cyan-500', change: '+12%' },
    { label: 'Total Messages', value: totalMessages ?? 0, icon: MessageSquare, color: 'from-purple-400 to-pink-500', change: '+5%' },
    { label: 'Profile Views', value: 1247, icon: TrendingUp, color: 'from-green-400 to-emerald-500', change: '+28%' },
    { label: 'Posts Published', value: posts?.filter(p => p.published).length ?? 0, icon: Zap, color: 'from-orange-400 to-red-500', change: '+3%' },
  ]

  const quickLinks = [
    { label: 'Edit Profile', href: '/dashboard/profile', icon: User, desc: 'Update your personal info' },
    { label: 'My Posts', href: '/dashboard/posts', icon: FileText, desc: 'Manage your blog posts' },
    { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3, desc: 'View your stats' },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings, desc: 'Account preferences' },
  ]

  const displayName = profile?.full_name || user.email?.split('@')[0] || 'User'

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Good morning, {displayName} 👋
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Here's what's happening with your account today.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {profile?.role === 'admin' && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors"
              >
                Admin Panel
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon, color, change }) => (
            <Card key={label}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-medium text-green-600 dark:text-green-400">{change}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{value.toLocaleString()}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent posts */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white">Recent Posts</h2>
                  <Link href="/dashboard/posts" className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
                    View all <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {posts && posts.length > 0 ? (
                  <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {posts.map((post) => (
                      <div key={post.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <div className="min-w-0 flex-1">
                          <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 truncate block">
                            {post.title}
                          </Link>
                          <div className="text-xs text-gray-500 mt-0.5">{formatDate(post.created_at)}</div>
                        </div>
                        <Badge variant={post.published ? 'success' : 'warning'} className="ml-4 flex-shrink-0">
                          {post.published ? 'Published' : 'Draft'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-6 py-10 text-center">
                    <FileText className="w-8 h-8 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">No posts yet</p>
                    <Link href="/dashboard/posts/new" className="text-sm text-primary-600 dark:text-primary-400 hover:underline mt-1 inline-block">
                      Write your first post →
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Profile + Quick links */}
          <div className="space-y-4">
            {/* Profile card */}
            <Card>
              <CardContent className="p-5 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div className="text-base font-semibold text-gray-900 dark:text-white">{displayName}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</div>
                <Badge variant={profile?.role === 'admin' ? 'default' : 'outline'} className="mt-2">
                  {profile?.role || 'user'}
                </Badge>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Member since {profile ? formatDate(profile.created_at) : '—'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick links */}
            <Card>
              <CardHeader>
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
              </CardHeader>
              <CardContent className="p-3">
                <div className="space-y-1">
                  {quickLinks.map(({ label, href, icon: Icon, desc }) => (
                    <Link
                      key={label}
                      href={href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 transition-colors">
                        <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{label}</div>
                        <div className="text-xs text-gray-500 truncate">{desc}</div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
