import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase-server'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import { BookOpen, Clock, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, tutorials, and updates from the NexaStack team.',
}

const PLACEHOLDER_POSTS = [
  {
    id: '1',
    title: 'Getting Started with Next.js 14 and Supabase',
    slug: 'getting-started-nextjs-supabase',
    excerpt: 'Learn how to build a full-stack application with Next.js 14 App Router and Supabase. We cover authentication, database, and deployment.',
    tags: ['Next.js', 'Supabase', 'Tutorial'],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    author: { full_name: 'Alex Rivera' },
  },
  {
    id: '2',
    title: 'TypeScript Best Practices for Production Apps',
    slug: 'typescript-best-practices',
    excerpt: 'A deep dive into TypeScript patterns and best practices that will make your codebase more maintainable and your team more productive.',
    tags: ['TypeScript', 'Best Practices'],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    author: { full_name: 'Jordan Kim' },
  },
  {
    id: '3',
    title: 'Deploying to Vercel: A Complete Guide',
    slug: 'deploying-to-vercel',
    excerpt: 'Everything you need to know about deploying your Next.js application to Vercel, from environment variables to custom domains.',
    tags: ['Deployment', 'Vercel', 'DevOps'],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    author: { full_name: 'Sam Taylor' },
  },
  {
    id: '4',
    title: 'Building Secure APIs with Express and JWT',
    slug: 'secure-apis-express-jwt',
    excerpt: 'Security best practices for building REST APIs with Express.js, including JWT authentication, rate limiting, and input validation.',
    tags: ['Security', 'Node.js', 'API'],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
    author: { full_name: 'Morgan Lee' },
  },
  {
    id: '5',
    title: 'Tailwind CSS Design System in 2024',
    slug: 'tailwind-design-system',
    excerpt: 'How to build a consistent, scalable design system using Tailwind CSS, with component libraries and theming strategies.',
    tags: ['CSS', 'Tailwind', 'Design'],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
    author: { full_name: 'Casey Davis' },
  },
  {
    id: '6',
    title: 'Database Design Patterns with PostgreSQL',
    slug: 'postgresql-design-patterns',
    excerpt: 'Learn advanced PostgreSQL patterns including row-level security, full-text search, and efficient query optimization.',
    tags: ['Database', 'PostgreSQL', 'Supabase'],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25).toISOString(),
    author: { full_name: 'Riley Johnson' },
  },
]

export default async function BlogPage() {
  const supabase = createClient()
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, tags, created_at, author:profiles(full_name)')
    .eq('published', true)
    .order('created_at', { ascending: false })

  const displayPosts = (posts && posts.length > 0) ? posts : PLACEHOLDER_POSTS

  const featured = displayPosts[0]
  const rest = displayPosts.slice(1)

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/60 to-transparent dark:from-primary-900/10 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm font-medium mb-6">
            <BookOpen className="w-3.5 h-3.5" /> NexaStack Blog
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">Insights & Tutorials</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Deep dives into web development, best practices, and the technology behind NexaStack.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Featured Post */}
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="block mb-12 group">
            <Card hover>
              <CardContent className="p-8 sm:p-10">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge variant="default">Featured</Badge>
                  {featured.tags?.slice(0, 2).map((tag: string) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 max-w-3xl">{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                      {(featured.author as any)?.full_name?.charAt(0) || 'A'}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{(featured.author as any)?.full_name || 'NexaStack Team'}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {formatDate(featured.created_at)}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-primary-600 dark:text-primary-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        )}

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post: any) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
              <Card hover className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags?.slice(0, 2).map((tag: string) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 mt-5 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                      {post.author?.full_name?.charAt(0) || 'A'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-gray-900 dark:text-white truncate">{post.author?.full_name || 'NexaStack'}</div>
                    </div>
                    <div className="text-xs text-gray-400 flex-shrink-0">{formatDate(post.created_at)}</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
