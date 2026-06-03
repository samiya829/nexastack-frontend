'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X, Zap, ChevronDown, User, LogOut, LayoutDashboard, Shield } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import Button from '@/components/ui/Button'
import { createClient } from '@/lib/supabase'
import { cn } from '@/lib/utils'
import type { User as SupabaseUser } from '@supabase/supabase-js'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        const { data } = await supabase.from('profiles').select('role').eq('id', user.id).single()
        setIsAdmin(data?.role === 'admin')
      }
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setUserMenuOpen(false)
    router.push('/')
    router.refresh()
  }

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-800/80 shadow-sm'
        : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-white">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            NexaStack
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  pathname === href
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[120px] truncate">{user.email}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg z-20 overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                        <p className="text-xs text-gray-500">Signed in as</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <Link href="/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                          <LayoutDashboard className="w-4 h-4" /> Dashboard
                        </Link>
                        <Link href="/dashboard/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                          <User className="w-4 h-4" /> Profile
                        </Link>
                        {isAdmin && (
                          <Link href="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                            <Shield className="w-4 h-4" /> Admin Panel
                          </Link>
                        )}
                        <button onClick={handleSignOut} className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">Log in</Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Get Started</Button>
                </Link>
              </div>
            )}

            <button
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-4 space-y-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center px-3 py-2.5 rounded-lg text-sm font-medium',
                pathname === href
                  ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/20'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'
              )}
            >
              {label}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
            {user ? (
              <>
                <Link href="/dashboard" className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <button onClick={handleSignOut} className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-red-600">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/login"><Button variant="outline" className="w-full">Log in</Button></Link>
                <Link href="/signup"><Button className="w-full">Get Started</Button></Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
