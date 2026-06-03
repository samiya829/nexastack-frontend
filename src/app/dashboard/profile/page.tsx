'use client'

import type { Metadata } from 'next'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { User, CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input, { Textarea } from '@/components/ui/Input'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { createClient } from '@/lib/supabase'

const profileSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  bio: z.string().max(500, 'Bio must be under 500 characters').optional(),
  website: z.string().url('Must be a valid URL').optional().or(z.literal('')),
})

type ProfileFormData = z.infer<typeof profileSchema>

export default function ProfilePage() {
  const supabase = createClient()
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState('')
  const [userEmail, setUserEmail] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({ resolver: zodResolver(profileSchema) })

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setUserEmail(user.email || '')

      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (data) reset({ full_name: data.full_name || '', bio: data.bio || '', website: data.website || '' })
    }
    load()
  }, [])

  const onSubmit = async (formData: ProfileFormData) => {
    try {
      setServerError('')
      setSuccess(false)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { error } = await supabase
        .from('profiles')
        .update({ ...formData, updated_at: new Date().toISOString() })
        .eq('id', user.id)

      if (error) throw error
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Failed to update profile')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Update your personal information</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                <User className="w-6 h-6" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">Personal Information</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{userEmail}</div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {success && (
              <div className="mb-5 p-3.5 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                <CheckCircle className="w-4 h-4" /> Profile updated successfully!
              </div>
            )}

            {serverError && (
              <div className="mb-5 p-3.5 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                label="Full Name"
                placeholder="Your full name"
                error={errors.full_name?.message}
                {...register('full_name')}
              />

              <Textarea
                label="Bio"
                placeholder="Tell us a little about yourself..."
                rows={4}
                error={errors.bio?.message}
                hint="Max 500 characters"
                {...register('bio')}
              />

              <Input
                label="Website"
                type="url"
                placeholder="https://yourwebsite.com"
                error={errors.website?.message}
                {...register('website')}
              />

              <div className="flex justify-end pt-2">
                <Button type="submit" loading={isSubmitting}>
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
