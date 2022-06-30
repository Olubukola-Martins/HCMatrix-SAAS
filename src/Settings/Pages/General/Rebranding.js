
import DashboardLayout from '../../../Layout/DashboardLayout'
import InfoIcon from '../../Assets/info_icon.svg'
import {Link} from 'react-router-dom'




const CompanyDetails = () => {

  return (
    <DashboardLayout>
        <div className="Container pb-20 mt-10 mb-72">
            {/* heading container */}
            <div className='flex justify-between items-center'>
            <Link to = '/settings'>
              <i className="fa fa-arrow-left text-accent text-lg" aria-hidden="true"></i></Link>
            <h4 className="font-bold text-accent text-base md:text-lg">
            Customize your HCMatrix Login URL

            </h4>
            <img src={InfoIcon} alt= 'info' className="md:h-6 h-4"/>

            </div>
            {/* info container */}
            <div className='info-container mt-10'>
              <div className="bg-card rounded-xl px-12 py-8 border-l-8 border-slate-700 leading-10">
                <p className=''>The default login URL of hcmatrix is tademo.thehcmatrix.com. This can be customized as per your need, provided your domain is verified in hcmatrix.</p>
                <div className='mid-section mt-24 mb-40'>
                  <p className=' mb-8'>Ensure that you have mapped the CNAME entry and linked it to tademo.thehcmatrix.com before you map your domain with hcmatrix</p>
                  <p className = 'text-slate-400'>e.g: http://myhrms.mydomain.com</p>
                </div>
                <p>Once you have successfully added the rebranded URL, you will need to wait for 24 to 48 hours for the SSL certificate to be installed and the rebranded URL to reflect. If the URL is not accessible even after 48 hours, contact support@hcmatrix.com.</p>

              </div>

            </div>
            {/* form container */}
            <div className='form-container  mb-20  mt-16'>
              <form>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 my-12 items-start'>
                  <div className='login flex items-center'>
                    <label className='text-xl mr-10 lg:mr-24 uppercase whitespace-nowrap '>Login URL</label>
                    <input
                    type="text"
                    placeholder=" Enter Login Url"
                    className="flex-1 bg-transparent rounded-md py-2 px-3 border border-gray-400 focus:outline-none"
                    />
                  </div>
                  <div className='other flex flex-col py-4 px-6 rounded-xl border md:w-3/5'>
                    <div className='mb-8 flex justify-between items-center'>
                      <label className=' text-lg'>Select</label> 
                      <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </div>
                    <input
                    type="text"
                    placeholder="Enter"
                    className="flex-1 bg-transparent rounded-md mb-8 py-2 px-3 border border-gray-400  focus:outline-none"
                    />
                    <input
                    type="text"
                    placeholder="Select"
                    className="flex-1 bg-transparent rounded-md py-2 px-3 border border-gray-400  focus:outline-none"
                    />
                  </div>
                </div>

              </form>
            </div>
         
       
        </div>
    </DashboardLayout>
  )
}

export default CompanyDetails