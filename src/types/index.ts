export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: 'user' | 'admin'
  bio: string | null
  website: string | null
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image: string | null
  author_id: string
  author?: Profile
  published: boolean
  tags: string[]
  views: number
  created_at: string
  updated_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'new' | 'read' | 'replied'
  created_at: string
}

export interface PricingPlan {
  id: string
  name: string
  description: string
  price_monthly: number
  price_yearly: number
  features: string[]
  is_popular: boolean
  cta_text: string
}

export interface DashboardStats {
  totalPosts: number
  totalMessages: number
  totalUsers: number
  thisMonthPosts: number
}

export interface ApiResponse<T> {
  data: T | null
  error: string | null
  message?: string
}
