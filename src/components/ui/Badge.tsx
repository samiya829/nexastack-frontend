import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline'
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300',
    success: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
    danger: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
    info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    outline: 'border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
