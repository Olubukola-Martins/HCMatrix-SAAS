import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CompanyOrganogram from './Components/CompanyOrganogram'
import Home from './Pages/Home'

function HomeRoute() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/company-organogram" element={<CompanyOrganogram />} />
    </Routes>
  )
}

export default HomeRoute