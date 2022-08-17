import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Statement from '../Pages/Statement'

const BillingRoutes = () => {
  return (
  <Routes>
      <Route path="/statement" element={<Statement/>}/>
  </Routes>
  )
}

export default BillingRoutes