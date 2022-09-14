import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Requisition from '../Pages/Requisition'
import SelfServiceHome from '../Pages/SelfServiceHome'

const SelfServiceRoutes = () => {
  return (
    <>
      <Routes>
          <Route path="/self-service/home" element={<SelfServiceHome/>}/>
          <Route path="/self-service/requisition" element={<Requisition />}/>
      </Routes>
    </>
  )
}

export default SelfServiceRoutes