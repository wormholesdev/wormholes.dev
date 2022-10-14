import ThemePicker from '@/components/theme'
import clsx from 'clsx'
import Link from 'next/link'
import { Github } from 'react-bootstrap-icons'

export default function Navbar({ border }) {
  return (
    <header
      className={clsx(
        'flex py-3.5 px-4 sm:px-6 lg:px-8',
        border && 'border-b border-slate-100 dark:border-slate-800 '
      )}
    >
      <div className='flex w-full flex-wrap items-center justify-between lg:mx-auto'>
        <div className='relative flex flex-grow basis-0 items-center'>
          <Link
            href='/'
            aria-label='Home page'
            className='bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text font-display text-xl font-bold text-transparent dark:from-blue-300 dark:via-purple-300 dark:to-pink-300'
          >
            Wormholes
          </Link>
        </div>
        <div className='relative flex basis-0 items-center justify-end gap-6 sm:gap-8 md:flex-grow'>
          <Link
            href='https://github.com/wormholesdev'
            className='group'
            aria-label='GitHub'
          >
            <Github className='h-5 w-5 fill-current text-slate-500 group-hover:text-slate-600 dark:text-slate-400 dark:group-hover:text-slate-300' />
          </Link>
          <ThemePicker />
        </div>
      </div>
    </header>
  )
}
