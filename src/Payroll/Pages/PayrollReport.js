import React from 'react'
import DashboardLayout from '../../Layout/DashboardLayout'
import PayrollSubNav from '../Components/PayrollSubNav'

const PayrollReport = () => {
  return (
    <DashboardLayout>
        <PayrollSubNav/>
        <div>PayrollReport</div>
    </DashboardLayout>
  )
}

export default PayrollReport