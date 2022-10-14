import navigation from '@/lib/navigation'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Sidebar({ className }) {
  const router = useRouter()
  return (
    <nav
      className={clsx(
        'relative w-full overflow-y-auto py-6 text-sm leading-6',
        className
      )}
    >
      <ul role='list' className='space-y-9'>
        {navigation.map((section) => (
          <li key={section.title}>
            <h2 className='font-display font-medium leading-loose text-slate-900 dark:text-white'>
              {section.title}
            </h2>
            <ul
              role='list'
              className='mt-2 space-y-2 border-l border-slate-100 dark:border-slate-700 lg:mt-4 lg:border-slate-200'
            >
              {section.links.map((link) => (
                <li className='relative' key={link.href}>
                  <Link
                    href={link.href}
                    className={clsx(
                      '-ml-px block w-full border-l border-transparent pl-4',
                      link.href === router.pathname
                        ? 'border-current font-semibold text-blue-500'
                        : 'text-slate-500 hover:border-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:border-slate-400 dark:hover:text-slate-300'
                    )}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}
