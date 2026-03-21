'use client'

import ScrollProvider from '@/components/providers/ScrollProvider'
import { Button } from '@/components/ui/button'
import { useLogout } from '@/hooks/auth.hooks'
import useUser from '@/hooks/users.hooks'
import { useRouter } from 'next/navigation'
import Navbar from '../components/Navbar'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Problem from '../sections/Problem'
import Career from '../sections/Career'
import Step from '../sections/Step'
import Feature from '../sections/Feature'
import Footer from '../sections/Footer'
import Container from '../components/Container'

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
        <Container>
          <Hero />
          <About />
          <Problem />
          <Career />
          <Step />
          <Feature />
        </Container>
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