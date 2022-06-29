import {useState} from 'react'
import DashboardLayout from '../../Layout/DashboardLayout'
import InfoIcon from '../Assets/info_icon.svg'
import Themes from "../../Themes/Themes";
import Modal from '@mui/material/Modal';
import {Link} from 'react-router-dom'



const FromAddresses = () => {
  const [openModal,setOpenModal] = useState(false);
  
  const showModal = (val) => {
    setOpenModal(val);
  }
  const handleClick = (e) => {
    e.preventDefault();
    showModal(true)

  }
  const handleClose =  () => setOpenModal(false)
  return (
    <div>
      <Modal open={openModal} onClose={handleClose}>
      <Themes>
            <div className="CModal" style={{ maxWidth: 600 }}>
            <div className='flex flex-col items-center justify-center pb-12'>
        {/* <div className = 'w-64'>
        <img src={emailIcon} alt="" className="max-w-full h-auto object-contain"/>
        </div> */}
        <div className='flex items-center justify-end w-full mb-8'>
        <i class="fas fa-times cursor-pointer text-2xl" onClick={handleClose}></i>

        </div>
    

        <h4 className="font-bold text-2xl text-accent text-center">
        Add From Address
        </h4>
        <form className='mt-8 lg:mr-20 '>
            <div className='flex items-center w-full mb-8'>
                <label className = 'block text-slate-400 md:w-60 mr-4'>Display Name</label>
                <input
                type="text"
                placeholder="Add display name"
                className="md:w-full bg-transparent rounded-md py-3 px-3 bg-white border border-gray-200 focus:outline-none"
                />
            </div>
            <div className='flex items-center w-full mb-8'>
                <label className = 'block text-slate-400 md:w-60 mr-4'>From Address</label>
                <input
                type="text"
                placeholder="john@gmail.com"
                className="md:w-full bg-transparent rounded-md py-3 px-3 bg-white border border-gray-200 focus:outline-none"
                />
            </div>
            <div className='flex items-center w-full mb-2'>
                <label className = 'block text-slate-400 md:w-60 mr-4 invisible'>From Address</label>
                <div className='flex justify-between items-center w-full'>

                <button
                    htmlType="submit"
                    className="button"
                    // className="bg-red-600 capitalize rounded hover:bg-opacity-70 transition ease-in duration-300 w-2/4 mr-2 text-white py-3 font-semibold"
                >
                Submit
                </button>
                <button
                    onClick={handleClose}
                    className="border border-1 border-slate-200 capitalize rounded hover:border-slate-400 hover:text-slate-400 transition ease-in duration-300 w-2/4 ml-2 text-slate-300 py-2 font-semibold"
                >
                Cancel
                </button>
                </div>
            </div>
        </form>
    </div>
            </div>
            </Themes>
      </Modal>
      <DashboardLayout>
        
        
          <div className="Container pb-20 mt-10 mb-72">
          
              {/* heading container */}
              <div className='flex flex-col lg:flex-row lg:justify-between lg:items-start '>
              <Link to = '/settings'>
              <i className="fa fa-arrow-left text-accent text-lg " aria-hidden="true"></i></Link>
             
              <h4 className="font-bold text-accent lg:text-center text-lg lg:text-lg md:w-3/5 md:leading-10 mb-10 lg:mb-0">
              Create and manage official from addresses for automated e-mails sent from your organization.
              </h4>
              <div className='left-action flex'>
                  <button className='text-caramel  mr-6 text-sm md:text-base ml-auto lg:ml-0 cursor-buttonointer' onClick={handleClick}>+ Add from Address</button>
                  <img src={InfoIcon} alt= 'info' className="md:h-6 h-4"/>

              </div>

              </div>
              {/* table container */}
              <div className='table-container mt-10'>
                <div className='table-heading grid grid-cols-3 md:gap-24 gap-2 mb-4 px-4 py-4 rounded-xl items-start bg-card  text-xs lg:text-base font-semibold '>
                  <h5 className=''>Display Name</h5>
                  <h5 className=''>From Address</h5>
                  <h5 className=''>Verification Status</h5>
                </div>
                <div className='table-entry grid grid-cols-3 md:gap-24  gap-2  mb-4 text-xs  lg:text-sm px-4 py-4 rounded-xl items-start bg-card '>
                  <div className= 'flex items-center'>
                      <i class="fa-solid fa-star text-green-500"></i>
                      <span className='md:ml-4 ml-1'>noreply</span>
                  </div>
                  <div><span className='break-words'>noreply@hcmatrix.com</span></div>
                  <div className= 'flex items-center'>
                      <i class="fas fa-check-circle text-green-500"></i>
                      <span className='md:ml-4 ml-1'>Verified</span>
                  </div>
                  
                </div>

              </div>
            
        
          </div>
      </DashboardLayout>
    </div>
  )
}

export default FromAddresses