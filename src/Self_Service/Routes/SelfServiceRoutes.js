import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AssetDetails from '../Pages/Assets/AssetDetails'
import Assets from '../Pages/Assets/Assets'
import AssetTypeDetails from '../Pages/Assets/AssetTypeDetails'
import LoanHome from '../Pages/Loan/LoanHome'
import LoanPolicies from '../Pages/Loan/LoanPolicies'
import LoanRequest from '../Pages/Loan/LoanRequest'
import Monetary from '../Pages/Monetary'
import Reimbursements from '../Pages/Reimbursements'
import Requisition from '../Pages/Requisition'
import SelfServiceHome from '../Pages/SelfServiceHome'
import SurveyHome from '../Pages/Survey/SurveyHome'
import VehicleBookingHome from '../Pages/VehicleBooking/VehicleBookingHome'
import VehicleDetails from '../Pages/VehicleBooking/VehicleDetails'

const SelfServiceRoutes = () => {
  return (
    <>
      <Routes>
          <Route path="/self-service/home" element={<SelfServiceHome/>}/>
           

          <Route path="/self-service/requisition" element={<Requisition />}/>
          <Route path="/self-service/reimbursements" element={<Reimbursements />}/>
          <Route path="/self-service/monetary" element={<Monetary />}/>
          <Route path="/self-service/assets" element={<Assets />}/>
          <Route path="/self-service/assets/:id" element={<AssetTypeDetails/>}/>
          <Route path="/self-service/assets-details" element={<AssetDetails/>}/>
          <Route path="/self-service/loan" element={<LoanHome/>}/>
          <Route path="/self-service/loan-request" element={<LoanRequest/>}/>
          <Route path="/self-service/loan-policies" element={<LoanPolicies/>}/>
          <Route path="/self-service/vehicle-booking" element={<VehicleBookingHome/>}/>
          <Route path="/self-service/vehicle-details" element={<VehicleDetails/>}/>
          <Route path="/self-service/vehicle-details" element={<VehicleDetails/>}/>

          {/* survey */}
          <Route path="/self-service/survey" element={<SurveyHome/>}/>
      </Routes>
    </>
  )
}

export default SelfServiceRoutes