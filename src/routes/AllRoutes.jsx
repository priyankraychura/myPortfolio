import React, { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ErrorBoundary from '../components/ErrorBoundary'

// The home page comes with the first load; the other pages download when needed
const pages = {
  allProjects: () => import('../pages/AllProjects'),
  privacyPolicy: () => import('../pages/PrivacyPolicy'),
  folderLocker: () => import('../pages/FolderLocker'),
  notFound: () => import('../pages/NotFound')
}

const AllProjects = lazy(pages.allProjects)
const PrivacyPolicy = lazy(pages.privacyPolicy)
const FolderLocker = lazy(pages.folderLocker)
const NotFound = lazy(pages.notFound)

const AllRoutes = () => {
  const { pathname } = useLocation()

  // once the first page has settled, fetch the others in the background so links open instantly
  useEffect(() => {
    const prefetch = () => Object.values(pages).forEach((load) => load().catch(() => {}))
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(prefetch, { timeout: 6000 })
      return () => cancelIdleCallback(id)
    }
    const timer = setTimeout(prefetch, 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <ErrorBoundary resetKey={pathname}>
      <Suspense fallback={<main id="main" className="page-loading" />}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/all-projects' element={<AllProjects />} />
          <Route path='/privacy-policy/:appName' element={<PrivacyPolicy />} />
          <Route path='/apps/cloak' element={<FolderLocker />} />
          <Route path='/apps/folder-locker' element={<FolderLocker />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export default AllRoutes
