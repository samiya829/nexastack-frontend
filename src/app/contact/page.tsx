'use client'

import type { Metadata } from 'next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, MapPin, Phone, CheckCircle, Send } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input, { Textarea } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@nexastack.com',
    href: 'mailto:hello@nexastack.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: 'San Francisco, CA 94105',
    href: '#',
  },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (data: ContactFormData) => {
    try {
      setServerError('')
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error || 'Failed to send message')
      }

      setSubmitted(true)
      reset()
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Failed to send message. Please try again.')
    }
  }

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/60 to-transparent dark:from-primary-900/10 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Have a question or want to work with us? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Contact info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Let's talk</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We typically respond within 24 hours on business days. For urgent matters, use the phone number below.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800 hover:bg-primary-50/30 dark:hover:bg-primary-900/10 transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">{value}</div>
                    </div>
                  </a>
                ))}
              </div>

              <Card>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Office Hours</h3>
                  <div className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex justify-between">
                      <span>Monday – Friday</span>
                      <span className="font-medium">9am – 6pm PST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-medium">10am – 4pm PST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-medium text-gray-400">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Thanks for reaching out. We'll get back to you within 24 hours.
                      </p>
                      <Button onClick={() => setSubmitted(false)} variant="outline">
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Send a Message</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Fill out the form below and we'll respond promptly.</p>
                      </div>

                      {serverError && (
                        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
                          {serverError}
                        </div>
                      )}

                      <div className="grid sm:grid-cols-2 gap-4">
                        <Input
                          label="Full Name"
                          placeholder="John Doe"
                          error={errors.name?.message}
                          {...register('name')}
                        />
                        <Input
                          label="Email Address"
                          type="email"
                          placeholder="john@example.com"
                          error={errors.email?.message}
                          {...register('email')}
                        />
                      </div>

                      <Input
                        label="Subject"
                        placeholder="How can we help you?"
                        error={errors.subject?.message}
                        {...register('subject')}
                      />

                      <Textarea
                        label="Message"
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        error={errors.message?.message}
                        {...register('message')}
                      />

                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          By sending this form, you agree to our{' '}
                          <a href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</a>.
                        </p>
                        <Button type="submit" loading={isSubmitting} className="gap-2">
                          <Send className="w-4 h-4" />
                          Send Message
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
