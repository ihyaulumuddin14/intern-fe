import Link from 'next/link'
import { ReactNode } from 'react'

const AuthCard = ({
  title,
  description,
  children,
  footerText,
  footerLink,
  footerLinkTarget = "#"
}: {
  title: string,
  description?: string,
  children: ReactNode,
  footerText?: string,
  footerLink?: string,
  footerLinkTarget?: string
}) => {
  return (
    <div className='w-full max-w-xl h-fit p-3 sm:p-6 flex flex-col items-center gap-6'>
      <header className="flex flex-col gap-2">
        <h1 className='text-center text-2xl font-semibold'>{ title }</h1>
        <p className='max-w-96 text-center text-xs text-muted-foreground'>{ description }</p>
      </header>

      <div className="w-full">
        { children }
      </div>

      <footer className="w-full">
        <p className="text-sm text-center">
          { footerText }{" "}
          {
            footerLink && footerLinkTarget && (
              <Link replace href={ footerLinkTarget } className="underline-offset-4 underline text-primary hover:text-primary-hover">
                { footerLink }
              </Link>
            )
          }
        </p>
      </footer>
    </div>
  )
}

export default AuthCard