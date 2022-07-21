import { Modal } from '@mui/material'
import React from 'react'

const TransferOwnership = ({open, handleClose}) => {
  return (
    <>
    <Modal open={open} onClose={handleClose}>
         <div>
           hello
         </div>
    </Modal>
    </>
  )
}

export default TransferOwnership