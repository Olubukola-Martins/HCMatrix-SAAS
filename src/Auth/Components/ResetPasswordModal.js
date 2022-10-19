import React from 'react'
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import resetLinkIcon from "../Assets/Images/reset_link.svg";


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

const ResetPasswordModal = ({open, handleClose}) => {
    
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
        <img src={resetLinkIcon} alt="" className="max-w-full h-auto object-contain"/>
        </div>
    

        <Typography  variant="h5" component="h2" className = 'font-bold' align = 'center'>
        A password reset link has been sent to email.
        </Typography>
        <button type="submit" className="bg-sky-600 rounded hover:bg-opacity-70 transition ease-in duration-300 w-full text-white py-2 font-semibold mt-6">
            
              Check your Email
            </button>
      
    </div>
    </Box>
  </Modal>)
}

export default ResetPasswordModal
