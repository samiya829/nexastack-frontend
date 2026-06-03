import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from 'next-themes'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'NexaStack — Modern Full-Stack Platform', template: '%s | NexaStack' },
  description: 'Build and deploy modern web applications faster with NexaStack. Authentication, database, API, and hosting — all in one place.',
  keywords: ['full-stack', 'Next.js', 'Supabase', 'TypeScript', 'SaaS', 'platform'],
  authors: [{ name: 'NexaStack Team' }],
  creator: 'NexaStack',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'NexaStack — Modern Full-Stack Platform',
    description: 'Build and deploy modern web applications faster with NexaStack.',
    siteName: 'NexaStack',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexaStack — Modern Full-Stack Platform',
    description: 'Build and deploy modern web applications faster with NexaStack.',
  },
  robots: { index: true, follow: true },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#030712' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
