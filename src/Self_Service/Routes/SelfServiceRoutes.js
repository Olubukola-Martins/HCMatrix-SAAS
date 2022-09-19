import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Assets from '../Pages/Assets'
import Monetary from '../Pages/Monetary'
import Reimbursements from '../Pages/Reimbursements'
import Requisition from '../Pages/Requisition'
import SelfServiceHome from '../Pages/SelfServiceHome'

const SelfServiceRoutes = () => {
  return (
    <>
      <Routes>
          <Route path="/self-service/home" element={<SelfServiceHome/>}/>
          <Route path="/self-service/requisition" element={<Requisition />}/>
          <Route path="/self-service/reimbursements" element={<Reimbursements />}/>
          <Route path="/self-service/monetary" element={<Monetary />}/>
          <Route path="/self-service/assets" element={<Assets />}/>
      </Routes>
    </>
  )
}

export default SelfServiceRoutes