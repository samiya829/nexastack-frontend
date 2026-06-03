import Link from 'next/link'
import { ArrowLeft, AlertTriangle } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white dark:bg-gray-950 px-4">
      <div className="text-center">
        <div className="w-20 h-20 bg-primary-50 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-primary-500" />
        </div>
        <div className="text-6xl font-bold text-primary-600 dark:text-primary-400 mb-3">404</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Page not found</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved to a new location.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button>Contact Support</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
