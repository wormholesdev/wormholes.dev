import navigation from '@/lib/navigation'
import { useRouter } from 'next/router'
import { CaretDownFill, ChevronRight } from 'react-bootstrap-icons'

export default function Breadcrumb({ section, title }) {
  const router = useRouter()
  const allLinks = navigation.flatMap((section) => section.links)
  const currentLink = allLinks.find(
    (link) => link.href === router.pathname
  )?.href
  if (!section || !title) return null
  return (
    <div className='flex items-center font-display text-sm font-medium text-blue-500 dark:text-blue-400 lg:hidden'>
      <p>{section.title}</p>
      <ChevronRight className='mx-1 h-3.5 w-3.5 fill-current' />
      <div className='relative'>
        {title}
        <select
          className='absolute top-0 left-0 h-full w-full whitespace-nowrap opacity-0'
          onChange={(e) => router.replace(e.target.value)}
          {...(currentLink ? { defaultValue: currentLink } : {})}
        >
          {navigation.map((nav, idx) => (
            <optgroup label={nav.title} key={idx}>
              {nav.links.map((link) => (
                <option key={link.href} value={link.href}>
                  {link.title}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <CaretDownFill className='mx-1 inline h-2.5 w-2.5 fill-current' />
      </div>
    </div>
  )
}
