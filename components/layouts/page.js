import Navbar from '@/components/navigation/navbar'
import Head from 'next/head'

export function PageLayout({ children, title, description }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>{title}</title>
        <meta name='description' content={description} />
      </Head>
      <div className='flex min-h-screen flex-col bg-white dark:bg-slate-900'>
        <Navbar />
        <main className='flex min-h-screen w-full'>{children}</main>
      </div>
    </>
  )
}
