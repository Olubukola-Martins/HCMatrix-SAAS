import React from 'react'
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


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

const AddFromAddressModal = ({open, handleClose}) => {
    
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
        {/* <div className = 'w-64'>
        <img src={emailIcon} alt="" className="max-w-full h-auto object-contain"/>
        </div> */}
        <div className='flex items-center justify-end w-full mb-12'>
        <i class="fas fa-times text-red-400 cursor-pointer" onClick={handleClose}></i>

        </div>
    

        <Typography  variant="h4" component="h2" className = 'font-bold' align = 'center'>
        Add From Address
        </Typography>
        <form className='mt-16 mr-20'>
            <div className='flex items-center w-full mb-8'>
                <label className = 'block text-slate-400 w-60 mr-4'>Display Name</label>
                <input
                type="text"
                placeholder="Add display name"
                className="w-full  rounded-md py-3 px-3 bg-white border border-gray-200 focus:outline-none"
                />
            </div>
            <div className='flex items-center w-full mb-8'>
                <label className = 'block text-slate-400 w-60 mr-4'>From Address</label>
                <input
                type="text"
                placeholder="john@gmail.com"
                className="w-full  rounded-md py-3 px-3 bg-white border border-gray-200 focus:outline-none"
                />
            </div>
            <div className='flex items-center w-full mb-8'>
                <label className = 'block text-slate-400 w-60 mr-4 invisible'>From Address</label>
                <div className='flex justify-between items-center w-full'>

                <button
                    htmlType="submit"
                    className="bg-red-600 capitalize rounded hover:bg-opacity-70 transition ease-in duration-300 w-2/4 mr-2 text-white py-3 font-semibold"
                >
                Submit
                </button>
                <button
                    onClick={handleClose}
                    className="border border-1 border-slate-200 capitalize rounded hover:border-slate-400 hover:text-slate-400 transition ease-in duration-300 w-2/4 ml-2 text-slate-300 py-3 font-semibold"
                >
                Cancel
                </button>
                </div>
            </div>
        </form>
    </div>
    </Box>
  </Modal>)
}

export default AddFromAddressModal
