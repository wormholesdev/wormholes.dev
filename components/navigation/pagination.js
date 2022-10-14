import navigation from '@/lib/navigation'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons'

export default function Pagination() {
  const router = useRouter()
  const allLinks = navigation.flatMap((section) => section.links)
  const currentPage = allLinks.findIndex(
    (link) => link.href === router.pathname
  )
  const previousPage = allLinks[currentPage - 1]
  const nextPage = allLinks[currentPage + 1]

  return (
    <div className='mt-12 grid w-full grid-cols-2 border-t border-slate-200 py-6 text-sm font-semibold dark:border-slate-800'>
      {previousPage && (
        <Link
          href={previousPage.href}
          className='col-start-1 inline-flex items-center place-self-start text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300'
        >
          <ChevronLeft aria-hidden='true' className='mr-1 h-3 w-3' />
          {previousPage.title}
        </Link>
      )}
      {nextPage && (
        <Link
          href={nextPage.href}
          className='col-start-2 inline-flex items-center place-self-end text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300'
        >
          {nextPage.title}
          <ChevronRight aria-hidden='true' className='ml-1 h-3 w-3' />
        </Link>
      )}
    </div>
  )
}
