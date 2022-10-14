import clsx from 'clsx'
import Link from 'next/link'
import { ChevronRight } from 'react-bootstrap-icons'

export default function Hero() {
  return (
    <section className='mx-auto mt-8 flex max-w-7xl flex-col items-center justify-center sm:py-16'>
      <h1 className='mx-auto my-4 max-w-5xl px-4 text-center text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white sm:my-6 sm:text-5xl md:my-8 md:text-6xl'>
        An open source link shortener that <span>scales</span> as you grow.
      </h1>
      <div>
        <Link
          href='/docs'
          className={clsx([
            'transition-lift mt-8 mr-2 inline-flex -translate-y-0 transform items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow duration-300 ease-in-out hover:-translate-y-0.5',
            'bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-400',
          ])}
        >
          Get Started
        </Link>
        <Link
          href='https://github.com/wormholesdev/wormholes'
          className={clsx([
            'transition-lift group mt-8 mr-2 inline-flex -translate-y-0 transform items-center rounded-md border border-transparent px-5 py-3 text-sm font-medium duration-300 ease-in-out hover:-translate-y-0.5',
            'text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-400',
          ])}
        >
          Visit Repo
          <ChevronRight className='ml-1 w-3 transition-transform duration-300 ease-in-out group-hover:translate-x-1' />
        </Link>
      </div>
    </section>
  )
}
