'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import AuthLayout, { Tab } from '@/app/components/auth/AuthLayout'
import LoginForm from '@/app/components/auth/LoginForm'
import RegisterForm from '@/app/components/auth/RegisterForm'

// Use dynamic import with no SSR for the content
const AuthContent = dynamic(
  () => Promise.resolve(function AuthContent() {
    const searchParams = useSearchParams()
    const defaultTab = (searchParams.get('tab') as Tab) || Tab.LOGIN

    return (
      <AuthLayout defaultTab={defaultTab}>
        {defaultTab === Tab.LOGIN ? <LoginForm /> : <RegisterForm />}
      </AuthLayout>
    )
  }),
  { ssr: false }
)

export default function AuthPage() {
  return (
    <Suspense 
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <AuthContent />
    </Suspense>
  )
}