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
              <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center '>
              <h4 className="font-bold text-accent text-lg lg:text-xl md:w-3/5 md:leading-10 mb-20 lg:mb-0">
              Create and manage official from addresses for automated e-mails sent from your organization.
              </h4>
              <div className='left-action flex'>
                  <button className='text-caramel  mr-6 text-sm md:text-base ml-auto lg:ml-0 cursor-buttonointer' onClick={handleClick}>+ Add from Address</button>
                  <img src={InfoIcon} alt= 'info' className="md:h-6 h-4"/>

              </div>

              </div>
              {/* table container */}
              <div className='table-container mt-20'>
                <div className='table-heading grid grid-cols-3 gap-24 mb-4 px-4 py-4 rounded-xl items-start bg-card  text-xs lg:text-base font-semibold '>
                  <h5 className=''>Display Name</h5>
                  <h5 className=''>From Address</h5>
                  <h5 className=''>Verification Status</h5>
                </div>
                <div className='table-entry grid grid-cols-3 gap-24 mb-4 text-xs  lg:text-sm px-4 py-4 rounded-xl items-start bg-card '>
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