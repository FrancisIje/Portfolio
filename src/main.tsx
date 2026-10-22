import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Portfolio from '../francis-portfolio'
import DesignEngineering from './pages/DesignEngineering'
import MobileDev from './pages/MobileDev'
import Backend from './pages/Backend'
import DevX from './pages/DevX'
import { legacyRedirects } from './data/disciplines'
import IntroLoader from './components/IntroLoader'
import SiteBackground from './components/SiteBackground'
import BlockReveal, {
  BLOCK_REVEAL_COVER_MS,
  BLOCK_REVEAL_UNCOVER_MS,
  type BlockRevealPhase,
} from './components/BlockReveal'
import './styles.css'

const routes = {
  '/design-engineering': DesignEngineering,
  '/mobile': MobileDev,
  '/backend': Backend,
  '/devx': DevX,
}

// Retired slugs resolve to whichever page absorbed them, and the address bar is
// corrected in place so nobody keeps sharing the dead link.
const resolvePath = (path: string) => legacyRedirects[path] ?? path

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function App() {
  const [path, setPath] = useState(() => {
    const resolved = resolvePath(window.location.pathname)
    if (resolved !== window.location.pathname) {
      window.history.replaceState({}, '', resolved)
    }
    return resolved
  })
  // The route actually on screen. It lags behind `path` while the blocks are
  // covering, so the outgoing page stays mounted until it is hidden.
  const [renderedPath, setRenderedPath] = useState(path)
  const [phase, setPhase] = useState<BlockRevealPhase>('idle')

  useEffect(() => {
    const handlePopState = () => setPath(resolvePath(window.location.pathname))
    window.addEventListener('popstate', handlePopState)

    // Intercept same-origin link clicks so navigation stays client side
    const handleClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const anchor = (e.target as HTMLElement)?.closest?.('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || !href.startsWith('/') || anchor.target === '_blank') return
      e.preventDefault()
      if (href === window.location.pathname) return
      const target = resolvePath(href)
      window.history.pushState({}, '', target)
      setPath(target)
    }
    document.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('popstate', handlePopState)
      document.removeEventListener('click', handleClick)
    }
  }, [])

  // Cover, swap the page behind the blocks, then uncover.
  useEffect(() => {
    if (path === renderedPath) return

    if (prefersReducedMotion()) {
      setRenderedPath(path)
      window.scrollTo(0, 0)
      return
    }

    setPhase('cover')
    const covered = setTimeout(() => {
      setRenderedPath(path)
      window.scrollTo(0, 0)
      setPhase('reveal')
    }, BLOCK_REVEAL_COVER_MS)

    return () => clearTimeout(covered)
  }, [path, renderedPath])

  useEffect(() => {
    if (phase !== 'reveal') return
    const done = setTimeout(() => setPhase('idle'), BLOCK_REVEAL_UNCOVER_MS)
    return () => clearTimeout(done)
  }, [phase])

  const Page = routes[renderedPath as keyof typeof routes]

  return (
    <>
      {/* Mounted once, outside the routes, so the field carries on across a
          page change instead of being torn down and repopulated each time */}
      <SiteBackground />
      {Page ? <Page /> : <Portfolio />}
      <BlockReveal phase={phase} />
      <IntroLoader />
    </>
  )
}

const root = document.getElementById('root') as HTMLElement
createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
