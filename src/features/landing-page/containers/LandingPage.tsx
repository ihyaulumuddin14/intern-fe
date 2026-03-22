'use client'

import ScrollProvider from '@/components/providers/ScrollProvider'
import { useLogout } from '@/hooks/auth.hooks'
import useUser from '@/hooks/users.hooks'
import { useRouter } from 'next/navigation'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import About from '../sections/About'
import Career from '../sections/Career'
import Feature from '../sections/Feature'
import Hero from '../sections/Hero'
import Problem from '../sections/Problem'
import Step from '../sections/Step'

const LandingPage = () => {
  const router = useRouter()
  const { user, isPending, isFetching, error } = useUser()
  const {
    mutate: mutateLogout,
    isPending: isPendingLogout
  } = useLogout()

  const handleLogout = () => mutateLogout()

  return (
    <ScrollProvider>
      <Navbar />
      <main className='w-full'>
        <Hero />
        <About />
        <Problem />
        <Career />
        <Step />
        <Feature />
      </main>
      <Footer />
      {/* <section className='w-full h-[300dvh]'>
        LandingPage
        <span className='font-inter'>Inter</span>
        <span className='font-lora'>Lora</span>

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
              variant="default">
                Login
            </Button>
            <Button
              onClick={() => router.push('/register')}
              variant="outline">
                Register
            </Button>
          </>
        )}

        {user && (
          <Button onClick={handleLogout}>
            { isPendingLogout ? "..." : "Logout" }
          </Button>
        )}
      </section> */}
    </ScrollProvider>
  )
}

export default LandingPage