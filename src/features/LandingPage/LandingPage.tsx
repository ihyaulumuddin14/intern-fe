'use client'

import { Button } from '@/components/ui/button'
import { User } from '@/types/type'
import { useRouter } from 'next/navigation'

const LandingPage = ({ user }: { user: User | null }) => {
  const router = useRouter()

  return (
    <section className='w-full min-h-dvh'>
      LandingPage

      {user ? (
        <Button
          onClick={() => router.push(user.role === "ADMIN" ? '/admin' : '/dashboard')}>
            Go to Dashboard
        </Button>
      ) : (
        <>
          <Button
            onClick={() => router.push('/onboarding')}>
              Get Started
          </Button>
          <Button
            onClick={() => router.push('/login')}
            variant="outline">
              Login
          </Button>
        </>
      )}
    </section>
  )
}

export default LandingPage