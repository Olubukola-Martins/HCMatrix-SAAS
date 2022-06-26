
import DashboardLayout from '../../Layout/DashboardLayout'
import Logo from '../Assets/round_company_logo.png'
import CompanyInfoAccordion from '../Components/CompanyInfoAccordion'
import CompanySettingsAccordion from '../Components/CompanySettingsAccordion'







const CompanyDetails = () => {

  return (
    <DashboardLayout>
        <div className="Container pb-20 mt-10 mb-72">
            {/* img container */}
            <div className='img-container flex justify-center mb-20'>
                <img src={Logo} alt= 'logo' className="h-28"/>
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