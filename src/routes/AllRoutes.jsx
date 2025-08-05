import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AllProjects from '../pages/AllProjects'
import HomePage from '../pages/HomePage'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/all-projects' element={<AllProjects />} />
    </Routes>
  )
}

export default AllRoutes
