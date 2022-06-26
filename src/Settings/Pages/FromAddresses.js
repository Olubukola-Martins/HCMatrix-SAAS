import {useState} from 'react'
import DashboardLayout from '../../Layout/DashboardLayout'
import InfoIcon from '../Assets/info_icon.svg'
import AddFromAddressModal from '../Components/AddFromAddressModal';

const FromAddresses = () => {
  const [openModal,setOpenModal] = useState(false);
  
  const showModal = (val) => {
    setOpenModal(val);
  }
  const handleClick = (e) => {
    e.preventDefault();
    showModal(true)

  }
  return (
    <div>
      <AddFromAddressModal open = {openModal} handleClose = {() => showModal(false)}/>
      <DashboardLayout>
        
        
          <div className="Container pb-20 mt-10 mb-72">
              {/* heading container */}
              <div className='flex justify-between items-center'>
              <h4 className="font-bold text-accent text-2xl w-3/5 leading-10">
              Create and manage official from addresses for automated e-mails sent from your organization.
              </h4>
              <div className='left-action flex'>
                  <button className='text-red-400 mr-6 cursor-buttonointer' onClick={handleClick}>+ Add from Address</button>
                  <img src={InfoIcon} alt= 'info' className="h-6"/>

              </div>

              </div>
              {/* table container */}
              <div className='table-container mt-20'>
                <div className='table-heading grid grid-cols-3 gap-24 mb-4 px-4 py-4 rounded-xl items-start bg-slate-100'>
                  <h5 className='font-semibold'>Display Name</h5>
                  <h5 className='font-semibold'>From Address</h5>
                  <h5 className='font-semibold'>Verification Status</h5>
                </div>
                <div className='table-entry grid grid-cols-3 gap-24 mb-4  text-sm px-4 py-4 rounded-xl items-start bg-slate-100'>
                  <div className= 'flex items-center'>
                      <i class="fa-solid fa-star text-green-500"></i>
                      <span className='ml-4'>noreply</span>
                  </div>
                  <span className=''>noreply@hcmatrix.com</span>
                  <div className= 'flex items-center'>
                      <i class="fas fa-check-circle text-green-500"></i>
                      <span className='ml-4'>Verified</span>
                  </div>
                  
                </div>

              </div>
            
        
          </div>
      </DashboardLayout>
    </div>
  )
}

export default FromAddresses