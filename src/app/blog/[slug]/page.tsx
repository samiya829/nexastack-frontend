import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase-server'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'
import { formatDate } from '@/lib/utils'
import { ArrowLeft, Clock, Eye, Calendar } from 'lucide-react'

const PLACEHOLDER_POSTS: Record<string, any> = {
  'getting-started-nextjs-supabase': {
    id: '1',
    title: 'Getting Started with Next.js 14 and Supabase',
    slug: 'getting-started-nextjs-supabase',
    excerpt: 'Learn how to build a full-stack application with Next.js 14 App Router and Supabase.',
    content: `<h2>Introduction</h2><p>Building modern web applications has never been easier, thanks to the powerful combination of Next.js 14 and Supabase. In this tutorial, we'll walk through setting up a full-stack application from scratch.</p><h2>Setting Up Next.js</h2><p>Start by creating a new Next.js project with the following command:</p><pre><code>npx create-next-app@latest my-app --typescript --tailwind --app</code></pre><p>This sets up a modern Next.js project with TypeScript and Tailwind CSS configured out of the box.</p><h2>Integrating Supabase</h2><p>Supabase provides a complete backend solution including authentication, database, storage, and real-time subscriptions. Install the required packages:</p><pre><code>npm install @supabase/supabase-js @supabase/ssr</code></pre><h2>Authentication</h2><p>With Supabase Auth, you get email/password, OAuth providers, and magic links out of the box. The <code>@supabase/ssr</code> package makes it seamless to use Supabase with Next.js server components.</p><h2>Database</h2><p>Supabase uses PostgreSQL under the hood, giving you a powerful relational database with Row Level Security (RLS) for fine-grained access control.</p><h2>Deployment</h2><p>Deploy your Next.js app to Vercel with zero configuration. Your Supabase project handles the backend automatically.</p><h2>Conclusion</h2><p>The Next.js + Supabase stack is one of the most productive ways to build modern web applications. It gives you enterprise-grade features while keeping the development experience simple and fast.</p>`,
    tags: ['Next.js', 'Supabase', 'Tutorial'],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    views: 2847,
    author: { full_name: 'Alex Rivera', bio: 'Former engineering lead at Google. Co-founder of NexaStack.' },
  },
  'typescript-best-practices': {
    id: '2',
    title: 'TypeScript Best Practices for Production Apps',
    slug: 'typescript-best-practices',
    excerpt: 'A deep dive into TypeScript patterns and best practices for maintainable codebases.',
    content: `<h2>Why TypeScript Matters</h2><p>TypeScript has become the standard for large-scale JavaScript applications. Its type system catches bugs at compile time, improves IDE support, and makes refactoring safer.</p><h2>Strict Mode</h2><p>Always enable strict mode in your TypeScript configuration. It catches the most common issues early.</p><pre><code>{"strict": true}</code></pre><h2>Type Inference</h2><p>Let TypeScript infer types when possible. Only add explicit annotations when inference isn't sufficient or when you're defining a public API.</p><h2>Utility Types</h2><p>Master TypeScript's built-in utility types: <code>Partial</code>, <code>Required</code>, <code>Pick</code>, <code>Omit</code>, <code>Record</code>, and <code>ReturnType</code>. These cover the most common transformation needs.</p><h2>Discriminated Unions</h2><p>Use discriminated unions for state management and handling complex conditional types. They make your code safer and more self-documenting.</p><h2>Error Handling</h2><p>Define your error types explicitly. Never catch unknown and assume it's an Error — always narrow the type first.</p>`,
    tags: ['TypeScript', 'Best Practices'],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    views: 1923,
    author: { full_name: 'Jordan Kim', bio: 'Systems architect and TypeScript enthusiast.' },
  },
}

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient()
  const { data: post } = await supabase
    .from('posts')
    .select('title, excerpt')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  const p = post || PLACEHOLDER_POSTS[params.slug]
  if (!p) return { title: 'Post Not Found' }

  return {
    title: p.title,
    description: p.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const supabase = createClient()
  const { data: post } = await supabase
    .from('posts')
    .select('*, author:profiles(full_name, bio, avatar_url)')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  const displayPost = post || PLACEHOLDER_POSTS[params.slug]
  if (!displayPost) notFound()

  if (post) {
    await supabase.from('posts').update({ views: (post.views || 0) + 1 }).eq('id', post.id)
  }

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-wrap gap-2 mb-5">
          {displayPost.tags?.map((tag: string) => (
            <Badge key={tag} variant="default">{tag}</Badge>
          ))}
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-5 leading-tight">
          {displayPost.title}
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
          {displayPost.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-gray-100 dark:border-gray-800">
          {/* Author */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold">
              {displayPost.author?.full_name?.charAt(0) || 'A'}
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {displayPost.author?.full_name || 'NexaStack Team'}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Author</div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            {formatDate(displayPost.created_at)}
          </div>

          {displayPost.views > 0 && (
            <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
              <Eye className="w-4 h-4" />
              {displayPost.views.toLocaleString()} views
            </div>
          )}

          <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            {Math.ceil(displayPost.content?.split(' ').length / 200)} min read
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-4 gap-10">
          <article
            className="lg:col-span-3 prose"
            dangerouslySetInnerHTML={{ __html: displayPost.content || '<p>Content coming soon.</p>' }}
          />

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-5">
              {/* Author card */}
              <Card>
                <CardContent className="p-5 text-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
                    {displayPost.author?.full_name?.charAt(0) || 'A'}
                  </div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    {displayPost.author?.full_name || 'NexaStack Team'}
                  </div>
                  {displayPost.author?.bio && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      {displayPost.author.bio}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardContent className="p-5">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {displayPost.tags?.map((tag: string) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card>
                <CardContent className="p-5">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Newsletter</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Get articles like this in your inbox.</p>
                  <Link href="/signup">
                    <button className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors">
                      Subscribe
                    </button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
