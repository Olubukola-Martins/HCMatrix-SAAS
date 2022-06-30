import React, {useState} from 'react'
 import DashboardLayout from '../../../Layout/DashboardLayout'
import SettingNavItem from '../../Components/SettingNavItem'
import { settingNavItems } from '../../Data'



const GeneralSettings = () => {
    const [navItems, setNavItems] = useState(settingNavItems);
    const handleSearch = (e) => {
        const val = e.target.value;
        
        if(val !== ''){
        setNavItems(() => settingNavItems.filter(item => item.title.indexOf(val.toLocaleLowerCase) !== -1 || item.items.some((p) => p.name.indexOf(val.toLocaleLowerCase) !== -1))  );


        }else{
            setNavItems(settingNavItems)
        }

    }
  return (
    <DashboardLayout>
        <div className="Container pb-20 mt-10">
        <h4 className="font-bold text-accent text-2xl">
              All Settings
        </h4>
       <div className = 'flex flex-col mt-2'>
            {/* search */}
            <div className='border flex justify-between border-0 border-b w-3/4 md:w-2/4 mt-16 self-center px-2'>
                <input className='border-none mb-2 flex-1 outline-0 bg-transparent' onChange={handleSearch} placeholder='Search in company details, roles ................'></input>
                <i class="fas fa-search"></i>
            </div>
            {/* Page NavItems */}
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 justify-between mt-32'>
                {/* item */}
                {navItems.map((item) => (
                    <SettingNavItem item = {item} key = {item.title}/>
                ))}
                    <div className='setting-nav-item mb-24'>
                    <h5 className="font-semibold text-accent text-xl">
                        {`Product Links`}
                    </h5>
                    {/* grey card goes here */}
                </div>
            </div>
        

       </div>
        </div>
    </DashboardLayout>
  )
}

export default GeneralSettings