import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SelfServiceHome from '../Pages/SelfServiceHome'

const SelfServiceRoutes = () => {
  return (
    <>
      <Routes>
          <Route path="/self-service/home" element={<SelfServiceHome/>}/>
      </Routes>
    </>
  )
}

export default SelfServiceRoutes