import Navbar from '@/components/navigation/navbar'

export function PageLayout({ children }) {
  return (
    <div className='flex min-h-screen flex-col bg-white dark:bg-slate-900'>
      <Navbar />
      <main className='flex min-h-screen w-full'>{children}</main>
    </div>
  )
}
