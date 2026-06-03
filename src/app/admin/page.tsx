import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase-server'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import {
  Shield, Users, FileText, MessageSquare, BarChart3,
  TrendingUp, ArrowUpRight, CheckCircle, Clock, AlertTriangle
} from 'lucide-react'

export const metadata: Metadata = { title: 'Admin Panel' }

export default async function AdminPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') redirect('/dashboard')

  const [
    { count: totalUsers },
    { count: totalPosts },
    { count: totalMessages },
    { count: newMessages },
    { data: recentMessages },
    { data: recentPosts },
    { data: recentUsers },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('posts').select('*', { count: 'exact', head: true }),
    supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
    supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('contact_messages').select('*').order('created_at', { ascending: false }).limit(5),
    supabase.from('posts').select('id, title, slug, published, created_at, author:profiles(full_name)').order('created_at', { ascending: false }).limit(5),
    supabase.from('profiles').select('id, email, full_name, role, created_at').order('created_at', { ascending: false }).limit(5),
  ])

  const stats = [
    { label: 'Total Users', value: totalUsers ?? 0, icon: Users, color: 'from-blue-400 to-cyan-500' },
    { label: 'Total Posts', value: totalPosts ?? 0, icon: FileText, color: 'from-green-400 to-emerald-500' },
    { label: 'Messages', value: totalMessages ?? 0, icon: MessageSquare, color: 'from-purple-400 to-pink-500' },
    { label: 'New Messages', value: newMessages ?? 0, icon: AlertTriangle, color: 'from-orange-400 to-red-500' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Manage your website content and users</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <Card key={label}>
              <CardContent className="p-5">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{value.toLocaleString()}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Recent Messages */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary-500" /> Contact Messages
                  {(newMessages ?? 0) > 0 && (
                    <Badge variant="danger">{newMessages} new</Badge>
                  )}
                </h2>
                <Link href="/admin/messages" className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
                  View all <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {recentMessages && recentMessages.length > 0 ? (
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {recentMessages.map((msg: any) => (
                    <div key={msg.id} className="flex items-center gap-3 px-6 py-3.5">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        msg.status === 'new' ? 'bg-blue-500' :
                        msg.status === 'read' ? 'bg-gray-300' : 'bg-green-500'
                      }`} />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{msg.name}</div>
                        <div className="text-xs text-gray-500 truncate">{msg.subject}</div>
                      </div>
                      <div className="text-xs text-gray-400 flex-shrink-0">{formatDate(msg.created_at)}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-8 text-center text-sm text-gray-500">No messages yet</div>
              )}
            </CardContent>
          </Card>

          {/* Recent Posts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary-500" /> Recent Posts
                </h2>
                <Link href="/admin/posts" className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
                  View all <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {recentPosts && recentPosts.length > 0 ? (
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {recentPosts.map((post: any) => (
                    <div key={post.id} className="flex items-center justify-between px-6 py-3.5">
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{post.title}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{formatDate(post.created_at)}</div>
                      </div>
                      <Badge variant={post.published ? 'success' : 'warning'} className="ml-3 flex-shrink-0">
                        {post.published ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-8 text-center text-sm text-gray-500">No posts yet</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Users */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-primary-500" /> Recent Users
              </h2>
              <Link href="/admin/users" className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
                View all <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">User</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Email</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Role</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Joined</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers?.map((u: any) => (
                  <tr key={u.id} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                          {(u.full_name || u.email).charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{u.full_name || '—'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-gray-500 dark:text-gray-400">{u.email}</td>
                    <td className="px-6 py-3">
                      <Badge variant={u.role === 'admin' ? 'default' : 'outline'}>{u.role}</Badge>
                    </td>
                    <td className="px-6 py-3 text-gray-500 dark:text-gray-400">{formatDate(u.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
