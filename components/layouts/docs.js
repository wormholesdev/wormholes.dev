import Breadcrumb from '@/components/navigation/breadcrumb'
import Navbar from '@/components/navigation/navbar'
import Pagination from '@/components/navigation/pagination'
import Sidebar from '@/components/navigation/sidebar'
import Toc from '@/components/navigation/toc'
import navigation from '@/lib/navigation'
import clsx from 'clsx'
import { useRouter } from 'next/router'

export function DocsLayout({ children, title, description, showTOC, toc }) {
  const router = useRouter()
  const section = navigation.find((section) =>
    section.links.find((link) => link.href === router.pathname)
  )

  return (
    <div className='flex h-full flex-col bg-white dark:bg-slate-900'>
      <Navbar border />
      <div className='flex h-full flex-1 overflow-y-hidden'>
        <div className='hidden w-72 shrink-0 grow-0 border-r border-slate-100 pl-8 dark:border-slate-800 lg:flex'>
          <Sidebar />
        </div>
        <div className='flex w-full overflow-y-hidden'>
          <div
            className='block w-full overflow-y-auto px-4 py-6 md:flex md:justify-center'
            id='content'
          >
            <div>
              <header className='my-8'>
                <Breadcrumb section={section} title={title} />
                {title && (
                  <h1 className='font-display text-4xl font-bold leading-relaxed text-slate-700 dark:text-slate-100 lg:text-5xl lg:leading-loose'>
                    {title}
                  </h1>
                )}
                {description && (
                  <p className='max-w-2xl font-display text-xl text-slate-700 dark:text-slate-200'>
                    {description}
                  </p>
                )}
              </header>
              <div
                className={clsx([
                  'prose prose-slate dark:prose-invert dark:text-slate-400',
                  'prose-headings:font-display prose-headings:text-slate-700 dark:prose-headings:text-slate-100',
                  'prose-a:border-b prose-a:border-blue-400 prose-a:font-semibold prose-a:text-blue-500 prose-a:no-underline prose-a:transition-all hover:prose-a:border-b-2 dark:prose-a:border-blue-300 dark:prose-a:text-blue-400',
                  'dark:prose-hr:border-slate-800',
                  showTOC ? 'max-w-4xl' : 'max-w-6xl',
                ])}
              >
                {children}
              </div>
              <Pagination />
            </div>
            {showTOC && toc.length > 0 && (
              <div className='sticky z-20 hidden xl:top-0 xl:block xl:shrink-0 xl:grow-0 xl:px-16'>
                <nav className='w-72'>
                  <Toc tableOfContents={toc} />
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
