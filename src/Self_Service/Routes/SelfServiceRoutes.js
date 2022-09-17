import React from 'react'
import { Route, Routes } from 'react-router-dom'
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
      </Routes>
    </>
  )
}

export default SelfServiceRoutes