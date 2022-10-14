import { DocsLayout } from '@/components/layouts'
import '@/styles/tailwind.css'
import '@fontsource/inter/latin.css'
import '@fontsource/poppins/latin.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Prism from 'prism-react-renderer/prism'
import collectHeadings from '../lib/collectHeadings'
;(typeof global !== 'undefined' ? global : window).Prism = Prism
require('prismjs/components/prism-lua')
require('prismjs/components/prism-properties')

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const isDocs = router.pathname.startsWith('/docs')
  if (isDocs) {
    const fm = pageProps.markdoc?.frontmatter
    const { title, description, showTOC } = fm || {}
    if (!title || !description) {
      throw new Error('title and description are required in frontmatter')
    }
    const currentTitle = `${title} - Wormholes Docs`
    const content = pageProps.markdoc?.content
    const shouldShowTOC = typeof showTOC === 'boolean' ? showTOC : true
    const toc = content && shouldShowTOC ? collectHeadings(content) : []
    return (
      <>
        <Head>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
          <title>{currentTitle}</title>
          <meta name='description' content={description} />
        </Head>
        <DocsLayout
          title={title}
          description={description}
          toc={toc}
          showTOC={shouldShowTOC}
        >
          <Component {...pageProps} />
        </DocsLayout>
      </>
    )
  }
  return <Component {...pageProps} />
}
