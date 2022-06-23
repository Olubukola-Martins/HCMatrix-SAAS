import React from 'react'
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import claps from "../Assets/Images/claps.svg";


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

const LoginSuccessModal = ({open, handleClose}) => {
    
  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="Email Verification"
    aria-describedby="Please verify your account by checking your inbox."
    BackdropProps = {{invisible: true}}
  >
    <Box sx={style}>
        
    <div className='flex flex-col items-center justify-center pb-12'>
        <div className = 'w-64'>
        <img src={claps} alt="" className="max-w-full h-auto object-contain"/>
        </div>
    

        <Typography  variant="h5" component="h2" className = 'font-bold' align = 'center'>
        We are Glad to have you Back User
        </Typography>
      
    </div>
    </Box>
  </Modal>)
}

export default LoginSuccessModal
