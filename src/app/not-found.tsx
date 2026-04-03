import { Button } from '@/components/ui/button'
import Footer from '@/features/landing-page/sections/Footer'
import Link from 'next/link'

import type { Metadata } from 'next'
import Loader from '@/components/shared/Loader'
 
export const metadata: Metadata = {
  title: 'Not Found',
  description: 'The page you are looking for does not exist.',
}

const NotFoundPage = () => {
  return (
    <div className='w-full bg-linear-to-b from-gradient-1 via-gradient-2 to-gradient-3'>
      <section className='w-full h-[90vh] flex flex-col justify-center items-center px-6 text-center'>
        <header className="mb-4">
          <h2 className='text-2xl font-bold opacity-80'>Halaman tidak ditemukan</h2>
        </header>

        <main className='flex flex-col items-center'>
          <h3 className='text-9xl sm:text-[12rem] md:text-[18rem] font-lora text-primary font-bold leading-tight'>
            404
          </h3>
          <p className='max-w-md mb-8 text-base sm:text-lg leading-tight'>
            Maaf ya, kami tidak bisa menemukan apa yang kamu cari. Yuk, balik lagi ke beranda.
          </p>
          <Button asChild size="lg">
            <Link href="/">Kembali ke Beranda</Link>
          </Button>
        </main>
      </section>
      <Footer />
    </div>
  )
}

export default NotFoundPage