import { DocsLayout, PageLayout } from '@/components/layouts'
import '@/styles/tailwind.css'
import '@fontsource/inter/latin.css'
import '@fontsource/poppins/latin.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import collectHeadings from '../lib/collectHeadings'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const fm = pageProps.markdoc?.frontmatter
  const { title, pageTitle, description, showTOC } = fm || {}
  const currentTitle =
    pageTitle || title ? `${title} - Wormholes Docs` : 'Wormholes'
  const content = pageProps.markdoc?.content
  const shouldShowTOC = typeof showTOC === 'boolean' ? showTOC : true
  const toc = content && shouldShowTOC ? collectHeadings(content) : []
  const isDocs = router.pathname.startsWith('/docs')

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>{currentTitle}</title>
        {description && <meta name='description' content={description} />}
      </Head>
      {isDocs ? (
        <DocsLayout
          title={title}
          description={description}
          toc={toc}
          showTOC={shouldShowTOC}
        >
          <Component {...pageProps} />
        </DocsLayout>
      ) : (
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      )}
    </>
  )
}
