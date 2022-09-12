import React from 'react'
import { Modal } from '@mui/material'
import Themes from '../../Themes/Themes'

const ViewPayslip = ({open, handleClose}) => {
  return (
   <Modal open={open} onClose={handleClose}>
       <Themes>
       <div className='CModal' style={{maxWidth: 700}}>
           Hello
       </div>
       </Themes>
   </Modal>
  )
}

export default ViewPayslip