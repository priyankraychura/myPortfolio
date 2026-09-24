import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AllProjects from '../pages/AllProjects'
import HomePage from '../pages/HomePage'
import { Toaster } from 'react-hot-toast'
import PrivacyPolicy from '../pages/PrivacyPolicy'
import FolderLocker from '../pages/FolderLocker'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/all-projects' element={<AllProjects />} />
      <Route path='/privacy-policy/:appName' element={<PrivacyPolicy />} />
      <Route path='/apps/cloak' element={<FolderLocker />} />
      <Route path='/apps/folder-locker' element={<FolderLocker />} />
    </Routes>
  )
}

export default AllRoutes
