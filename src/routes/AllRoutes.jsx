import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AllProjects from '../pages/AllProjects'
import HomePage from '../pages/HomePage'
import { Toaster } from 'react-hot-toast'
import PrivacyPolicy from '../pages/PrivacyPolicy'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/all-projects' element={<AllProjects />} />
      <Route path='/privacy-policy/:appName' element={<PrivacyPolicy />} />
    </Routes>
  )
}

export default AllRoutes
