import React from 'react'
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import emailIcon from "../Assets/Images/email_verify.svg";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
   
    bgcolor: 'background.paper',
    // width: '100%',
    // maxWidth: '700px',
    
    // height: 450,
    boxShadow:'0px 4px 15px rgba(0, 0, 0, 0.25)',
    borderRadius: '10px',
    p: 4,
  };

const EmailVerificationModal = ({open, handleClose}) => {
    
  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="Email Verification"
    aria-describedby="Please verify your account by checking your inbox."
    BackdropProps = {{invisible: false}}
  >
    <Box sx={style}>
        
    <div className='flex flex-col items-center justify-center pb-12'>
        <div className = 'w-64'>
        <img src={emailIcon} alt="" className="max-w-full h-auto object-contain"/>
        </div>
    

        <Typography  variant="h4" component="h2" className = 'font-bold' align = 'center'>
        Almost done!
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }} align = 'center'>
        We’ve just emailed you. Please verify your account by checking your inbox.
        </Typography>
    </div>
    </Box>
  </Modal>)
}

export default EmailVerificationModal
