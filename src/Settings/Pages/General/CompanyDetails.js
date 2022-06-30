
import DashboardLayout from '../../../Layout/DashboardLayout'
// import Logo from '../Assets/round_company_logo.png'
import CompanyInfoAccordion from '../../Components/CompanyInfoAccordion'
import CompanySettingsAccordion from '../../Components/CompanySettingsAccordion'
import Avatar from '@mui/material/Avatar';
import {Link} from 'react-router-dom'







const CompanyDetails = () => {

  return (
    <DashboardLayout>
        <div className="Container pb-20 mt-10 mb-72">
        <Link to = '/settings'>
              <i className="fa fa-arrow-left text-accent text-lg" aria-hidden="true"></i></Link>
            {/* img container */}
            <div className='img-container flex justify-center mb-20'>
                {/* <img src={Logo} alt= 'logo' className="h-28"/> */}
                <Avatar alt="Remy Sharp" src='' />
            </div>
           <div className='accordions grid grid-cols-1 lg:grid-cols-1 gap-12'>
             {/* accordian 1 */}
             <CompanyInfoAccordion/>
            

            {/* accordian 2 */}
            <CompanySettingsAccordion/>
           </div>
       
        </div>
    </DashboardLayout>
  )
}

export default CompanyDetails