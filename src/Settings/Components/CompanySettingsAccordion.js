import React, {useState} from 'react'
import { styled } from '@mui/material/styles';
import AccordionSummary from '@mui/material/AccordionSummary';
// import MuiAccordionDetails from '@mui/material/AccordionDetails';
import AccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Divider from '@mui/material/Divider';
import InfoIcon from '../Assets/info_icon.svg'
import InfoOutlineIcon from '../Assets/outline_info.svg'
import PenIcon from '../Assets/pen_icon.svg'





// const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
//     padding: theme.spacing(2),
//     borderTop: '1px solid rgba(0, 0, 0, .125)',
//   }));
  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0}  {...props} />
  ))(({ theme }) => ({
    border: ``,
    background: 'var(--card)',
    paddingLeft: '15px',
    paddingRight: '15px',
   
  }));



const CompanySettingsAccordion = () => {
    const [expanded, setExpanded] = useState(false)
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className=''>
    <Accordion  expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
<AccordionSummary

expandIcon={<ExpandMoreIcon />}
aria-controls="panel1a-content"
id="panel1a-header"
>
 <div className='text-accent '>
 <h4 className="text-xl">
   Company Settings
</h4>
<div className = 'content mt-6 w-3/4 flex'>
<p className='block text-sm mr-2'>Add Company's details, define Administrator, personalise using your company logo and create other company related settings</p>
<img src={InfoIcon} alt= 'info' className="h-5"/>

</div>
 </div>
</AccordionSummary>
<AccordionDetails>
<div className='grid grid-cols-1 lg:grid-cols-1 gap-1  justify-between text-accent'>
    <div className='section-container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 lg:my-12 my-4 lg:pt-12 pt-4'>
    <div className = 'sub-container'>
        <div className='heading flex items-center mb-8'>
            <h5 className='text-lg mr-6'>Administrator</h5>
            <img src={InfoOutlineIcon} alt= 'info' className="h-5"/>
        </div>
        <div className = 'input-content flex lg:flex-row flex-col lg:items-center justify-between mb-8'>
            <span className = 'text-red-400 mb-4 lg:mb-0 block uppercase text-sm whitespace-nowrap' >Email id</span>
            <div className='input-container'>
                <input
                type="text"
                placeholder="Company Name"
                className="w-72 bg-transparent rounded-md py-2 px-3 border border-gray-400 focus:outline-none"
                />
            </div>
            <span className = 'text-green-400 mb-4 lg:mb-0 block uppercase whitespace-nowrap text-xs lg:mt-0 mt-2' >Transfer Admin Rights</span>


        </div>

    </div>
    <div className = 'sub-container'>
        <div className='heading flex items-center mb-8'>
            <h5 className='text-lg mr-6'>Email Settings</h5>
            <img src={InfoOutlineIcon} alt= 'info' className="h-5"/>
        </div>
        <div className = 'input-content flex lg:flex-row flex-col lg:items-center justify-between mb-8'>
            <span className = 'mb-4 lg:mb-0 block uppercase text-sm whitespace-nowrap' >Default from address </span>
            <div className='input-container flex items-center'>
                <input
                type="text"
                placeholder="Company Name"
                className="w-72 bg-transparent rounded-md py-2 px-3 border border-gray-400 focus:outline-none"
                />
                <img src={PenIcon} alt= 'info' className="ml-4 h-6 block lg:hidden"/>
            </div>
            <img src={PenIcon} alt= 'info' className="h-6 relative invisible lg:visible"/>



        </div>

    </div>
    </div>
    {/* <Divider light /> */}
    <div className='section-container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 lg:my-12 my-4 border border-0 border-t border-gray-200 lg:pt-12 pt-4'>
    <div className = 'sub-container'>
        <div className='heading flex items-center mb-8'>
            <h5 className='text-lg mr-6'>Location settings</h5>
            <img src={InfoOutlineIcon} alt= 'info' className="h-5"/>
        </div>
        <div className = 'input-content flex lg:flex-row flex-col lg:items-center justify-between mb-8'>
            <span className = 'mb-4 lg:mb-0 block uppercase text-sm whitespace-nowrap' >Country/Region</span>
            <div className='input-container'>
                <input
                type="text"
                placeholder="Company Name"
                className="w-72 bg-transparent rounded-md py-2 px-3 border border-gray-400 focus:outline-none"
                />
            </div>


        </div>

    </div>
    <div className = 'sub-container'>
        <div className='heading flex items-center mb-8 invisible'>
            <h5 className='text-lg mr-6'>Email Settings</h5>
            <img src={InfoOutlineIcon} alt= 'info' className="h-5"/>
        </div>
        <div className = 'input-content flex lg:flex-row flex-col lg:items-center justify-between mb-8'>
            <span className = 'mb-4 lg:mb-0 block uppercase text-sm whitespace-nowrap' >Time Zone </span>
            <div className='input-container'>
                <select
                type="text"
                placeholder="Company Name"
                className="w-72 bg-transparent rounded-md py-2 px-3 border border-gray-400 focus:outline-none"
                >
                    <option value = {`value`}>{`label`}</option>
                </select>
            </div>
            <i className="fa fa-edit invisible"></i>


        </div>

    </div>
    </div>
    {/* <Divider light /> */}
    <div className='section-container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 lg:my-12 my-4 border border-0 border-t border-gray-200 lg:pt-12 pt-4'>
    <div className = 'sub-container'>
        <div className='heading flex items-center mb-8'>
            <h5 className='text-lg mr-6'>Display Settings</h5>
            <img src={InfoOutlineIcon} alt= 'info' className="h-5"/>
        </div>
        <div className = 'input-content flex lg:flex-row flex-col lg:items-center justify-between mb-8'>
            <span className = 'mb-4 lg:mb-0 block uppercase text-sm whitespace-nowrap' >Name to be displayed</span>
            <div className='input-container'>
                <input
                type="text"
                placeholder="Company Name"
                className="w-72 bg-transparent rounded-md py-2 px-3 border border-gray-400 focus:outline-none"
                />
            </div>


        </div>

    </div>
    <div className = 'sub-container'>
        <div className='heading flex items-center mb-8 invisible'>
            <h5 className='text-lg mr-6'>Email Settings</h5>
            <img src={InfoOutlineIcon} alt= 'info' className="h-5"/>
        </div>
        {/* first */}
        <div className = 'input-content flex lg:flex-row flex-col lg:items-center justify-between mb-8'>
            <span className = 'mb-4 lg:mb-0 block uppercase text-sm whitespace-nowrap' >Date format </span>
            <div className='input-container'>
                <select
                type="text"
                placeholder="Company Name"
                className="w-72 bg-transparent rounded-md py-2 px-3 border border-gray-400 focus:outline-none"
                >
                    <option value = {`value`}>{`label`}</option>
                </select>
            </div>
            <i className="fa fa-edit invisible"></i>


        </div>
        {/* second */}
        <div className = 'input-content flex lg:flex-row flex-col lg:items-center justify-between mb-8 mt-16'>
            <span className = 'mb-4 lg:mb-0 block uppercase text-sm whitespace-nowrap' >TIme format </span>
            <div className='input-container w-72 flex items-center justify-between'>
                <label> <input type = 'radio' name = 'timeFormat' className = 'form-check-input appearance-none rounded-none h-4 w-4 border bg-gray-300 border-slate-100 checked:bg-orange-600 border-4 checked:border-white outline outline-1 outline-slate-500 focus:outline-1 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'/> <span className = 'ml-2'>12 - Hour(s)</span></label>
                <label> <input type = 'radio' name = 'timeFormat' className = 'form-check-input appearance-none rounded-none h-4 w-4 border bg-gray-300 border-slate-100 checked:bg-orange-600 border-4 checked:border-white outline outline-1 outline-slate-500 focus:outline-1 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'/> <span className = 'ml-2'>24 - Hour(s)</span></label>
            </div>
            <i className="fa fa-edit invisible"></i>


        </div>

    </div>
    </div>
    {/* <Divider light /> */}
    <div className='section-container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 lg:my-12 my-4 border border-0 border-t border-gray-200 lg:pt-12 pt-4'>
    <div className = 'sub-container'>
        <div className='heading flex items-center mb-8'>
            <h5 className='text-lg mr-6'>Profile photo settings</h5>
            <img src={InfoOutlineIcon} alt= 'info' className="h-5"/>
        </div>
        <div className = 'input-content flex lg:flex-row flex-col lg:items-center justify-between mb-8'>
            <span className = 'mb-4 lg:mb-0 block uppercase text-sm whitespace-nowrap' >Owner</span>
            <div className='input-container w-72 flex items-center justify-between'>
                <label> <input type = 'radio' name = 'owner' className = 'form-check-input appearance-none rounded-none h-4 w-4 border bg-gray-300 border-slate-100 checked:bg-orange-600 border-4 checked:border-white outline outline-1 outline-slate-500 focus:outline-1 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer' /> <span className = 'ml-2'>Employee</span></label>
                <label> <input type = 'radio' name = 'owner' className = 'form-check-input appearance-none rounded-none h-4 w-4 border bg-gray-300 border-slate-100 checked:bg-orange-600 border-4 checked:border-white outline outline-1 outline-slate-500 focus:outline-1 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer' /> <span className = 'ml-2'>Administrator</span></label>
            </div>


        </div>

    </div>
    <div className = 'sub-container'>
        <div className='heading flex items-center mb-8'>
            <h5 className='text-lg mr-6'>Chat Settings</h5>
            <img src={InfoOutlineIcon} alt= 'info' className="h-5"/>
        </div>
       
        {/* second */}
        <div className = 'input-content flex lg:flex-row flex-col lg:items-center justify-between mb-8'>
            <span className = 'mb-4 lg:mb-0 block uppercase text-sm whitespace-nowrap' >Chat </span>
            <div className='input-container w-72 flex items-center justify-between'>
                <label> <input type = 'radio' name = 'chat'className = 'form-check-input appearance-none rounded-none h-4 w-4 border bg-gray-300 border-slate-100 checked:bg-orange-600 border-4 checked:border-white outline outline-1 outline-slate-500 focus:outline-1 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer' /> <span className = 'ml-2'>Enable</span></label>
                <label> <input type = 'radio' name = 'chat'className = 'form-check-input appearance-none rounded-none h-4 w-4 border bg-gray-300 border-slate-100 checked:bg-orange-600 border-4 checked:border-white outline outline-1 outline-slate-500 focus:outline-1 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer' /> <span className = 'ml-2'>Disable</span></label>
            </div>
            <i className="fa fa-edit invisible"></i>


        </div>

    </div>
    </div>
    {/* <Divider light /> */}
    <div className='section-container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 lg:my-12 my-4 border border-0 border-t border-gray-200 lg:pt-12 pt-4'>
    <div className = 'sub-container'>
        <div className='heading flex items-center mb-8'>
            <h5 className='text-lg mr-6'>Notifications Settings</h5>
            <img src={InfoOutlineIcon} alt= 'info' className="h-5"/>
        </div>
        <div className = 'input-content flex lg:flex-row flex-col lg:items-center justify-between mb-8'>
            <span className = 'block text-sm whitespace-nowrap mb-4 lg:mb-0'>Notifications(Mail/feeds)</span>
            <div className='input-container w-72 flex items-center justify-between'>
            <label> <input type = 'radio' name = 'notifications'className = 'form-check-input appearance-none rounded-none h-4 w-4 border bg-gray-300 border-slate-100 checked:bg-orange-600 border-4 checked:border-white outline outline-1 outline-slate-500 focus:outline-1 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer' /> <span className = 'ml-2'>Enable</span></label>
                <label> <input type = 'radio' name = 'notifications'className = 'form-check-input appearance-none rounded-none h-4 w-4 border bg-gray-300 border-slate-100 checked:bg-orange-600 border-4 checked:border-white outline outline-1 outline-slate-500 focus:outline-1 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer' /> <span className = 'ml-2'>Disable</span></label>
            </div>


        </div>

    </div>
    <div className = 'sub-container'>
        <div className='heading flex items-center mb-8'>
            <h5 className='text-lg mr-6'>General Settings</h5>
            <img src={InfoOutlineIcon} alt= 'info' className="h-5"/>
        </div>
       
        {/* second */}
        <div className = 'input-content flex lg:flex-row flex-col lg:items-center justify-between mb-8'>
            <span className = 'block  text-sm whitespace-nowrap mb-4 lg:mb-0' >Organization structure </span>
            <div className='input-container w-72 flex items-center justify-between'>
                <label> <input type = 'radio' name = 'organizationStructure'className = 'form-check-input appearance-none rounded-none h-4 w-4 border bg-gray-300 border-slate-100 checked:bg-orange-600 border-4 checked:border-white outline outline-1 outline-slate-500 focus:outline-1 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer' /> <span className = 'ml-2'>Enable</span></label>
                <label> <input type = 'radio' name = 'organizationStructure'className = 'form-check-input appearance-none rounded-none h-4 w-4 border bg-gray-300 border-slate-100 checked:bg-orange-600 border-4 checked:border-white outline outline-1 outline-slate-500 focus:outline-1 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer' /> <span className = 'ml-2'>Disable</span></label>
            </div>
            <i className="fa fa-edit invisible"></i>


        </div>

    </div>
    </div>
    {/* <Divider light /> */}
    <div className='section-container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 lg:my-12 my-4 border border-0 border-t border-gray-200 lg:pt-12 pt-4'>
    <div className = 'sub-container'>
        <div className='heading flex items-center mb-8'>
            <h5 className='text-lg mr-6'>Employee Settings</h5>
            <img src={InfoOutlineIcon} alt= 'info' className="h-5"/>
        </div>
        {/* 1 */}
        <div className = 'input-content flex lg:flex-row flex-col lg:items-center justify-between mb-10'>
            <span className = 'block text-sm whitespace-nowrap mb-4 lg:mb-0' >Dual reporting</span>
            <div className='input-container w-72 flex items-center justify-between'>
            <label> <input type = 'radio' name = 'dualReporting'className = 'form-check-input appearance-none rounded-none h-4 w-4 border bg-gray-300 border-slate-100 checked:bg-orange-600 border-4 checked:border-white outline outline-1 outline-slate-500 focus:outline-1 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer' /> <span className = 'ml-2'>Enable</span></label>
                <label> <input type = 'radio' name = 'dualReporting'className = 'form-check-input appearance-none rounded-none h-4 w-4 border bg-gray-300 border-slate-100 checked:bg-orange-600 border-4 checked:border-white outline outline-1 outline-slate-500 focus:outline-1 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer' /> <span className = 'ml-2'>Disable</span></label>
            </div>
        </div>
        {/* 1 */}
        <div className = 'input-content flex lg:flex-row flex-col lg:items-center justify-between mb-10'>
            <span className = 'block text-sm whitespace-nowrap mb-4 lg:mb-0' >Allow hide birthday</span>
            <div className='input-container w-72 flex items-center justify-between'>
            <label> <input type = 'radio' name = 'showBirthday'className = 'form-check-input appearance-none rounded-none h-4 w-4 border bg-gray-300 border-slate-100 checked:bg-orange-600 border-4 checked:border-white outline outline-1 outline-slate-500 focus:outline-1 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer' /> <span className = 'ml-2'>Enable</span></label>
                <label> <input type = 'radio' name = 'showBirthday'className = 'form-check-input appearance-none rounded-none h-4 w-4 border bg-gray-300 border-slate-100 checked:bg-orange-600 border-4 checked:border-white outline outline-1 outline-slate-500 focus:outline-1 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer' /> <span className = 'ml-2'>Disable</span></label>
            </div>
        </div>
        {/* 1 */}
        <div className = 'input-content flex lg:flex-row flex-col lg:items-center justify-between mb-10'>
            <span className = 'block text-sm whitespace-nowrap mb-4 lg:mb-0' >Allow hide Mobile number</span>
            <div className='input-container w-72 flex items-center justify-between'>
            <label> <input type = 'radio' name = 'showMobileNumber'className = 'form-check-input appearance-none rounded-none h-4 w-4 border bg-gray-300 border-slate-100 checked:bg-orange-600 border-4 checked:border-white outline outline-1 outline-slate-500 focus:outline-1 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer' /> <span className = 'ml-2'>Enable</span></label>
                <label> <input type = 'radio' name = 'showMobileNumber'className = 'form-check-input appearance-none rounded-none h-4 w-4 border bg-gray-300 border-slate-100 checked:bg-orange-600 border-4 checked:border-white outline outline-1 outline-slate-500 focus:outline-1 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer' /> <span className = 'ml-2'>Disable</span></label>
            </div>
        </div>

    </div>
    <div className = 'sub-container'>
        <div className='heading flex items-center mb-8 invisible'>
            <h5 className='text-lg mr-6'>General Settings</h5>
            <img src={InfoOutlineIcon} alt= 'info' className="h-5"/>
        </div>
       
        {/* second */}
        <div className = 'input-content flex lg:flex-row flex-col lg:items-center justify-between mb-10'>
            <span className = 'block  text-sm whitespace-nowrap' >Streams</span>
            <div className='input-container w-72 flex items-center justify-between'>
                <label> <input type = 'radio' name = 'streams'className = 'form-check-input appearance-none rounded-none h-4 w-4 border bg-gray-300 border-slate-100 checked:bg-orange-600 border-4 checked:border-white outline outline-1 outline-slate-500 focus:outline-1 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer' /> <span className = 'ml-2'>Enable</span></label>
                <label> <input type = 'radio' name = 'streams'className = 'form-check-input appearance-none rounded-none h-4 w-4 border bg-gray-300 border-slate-100 checked:bg-orange-600 border-4 checked:border-white outline outline-1 outline-slate-500 focus:outline-1 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer' /> <span className = 'ml-2'>Disable</span></label>
            </div>
            <i className="fa fa-edit invisible"></i>


        </div>
        {/* second */}
        <div className = 'input-content flex lg:flex-row flex-col lg:items-center justify-between mb-10'>
            <span className = 'block  text-sm whitespace-nowrap' >Allow hide work anniversary </span>
            <div className='input-container w-72 flex items-center justify-between'>
                <label> <input type = 'radio' name = 'anniversary'className = 'form-check-input appearance-none rounded-none h-4 w-4 border bg-gray-300 border-slate-100 checked:bg-orange-600 border-4 checked:border-white outline outline-1 outline-slate-500 focus:outline-1 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer' /> <span className = 'ml-2'>Enable</span></label>
                <label> <input type = 'radio' name = 'anniversary'className = 'form-check-input appearance-none rounded-none h-4 w-4 border bg-gray-300 border-slate-100 checked:bg-orange-600 border-4 checked:border-white outline outline-1 outline-slate-500 focus:outline-1 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer' /> <span className = 'ml-2'>Disable</span></label>
            </div>
            <i className="fa fa-edit invisible"></i>


        </div>

    </div>
    </div>
    {/* <Divider light /> */}
    <div className='section-container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 lg:my-12 my-4 border border-0 border-t border-gray-200 lg:pt-12 pt-4'>
    <div className = 'sub-container'>
        <div className='heading flex items-center mb-8'>
            <h5 className='text-lg mr-6'>Employee Settings</h5>
            <img src={InfoOutlineIcon} alt= 'info' className="h-5"/>
        </div>
        {/* 1 */}
        <div className = 'input-content flex lg:flex-row flex-col lg:items-center justify-between mb-10'>
            <span className = 'mb-4 lg:mb-0 block uppercase text-sm whitespace-nowrap'>Bot</span>
            <div className='input-container w-72 flex items-center justify-between'>
            <label> <input type = 'radio' name = 'bot'className = 'form-check-input appearance-none rounded-none h-4 w-4 border bg-gray-300 border-slate-100 checked:bg-orange-600 border-4 checked:border-white outline outline-1 outline-slate-500 focus:outline-1 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer' /> <span className = 'ml-2'>Enable</span></label>
                <label> <input type = 'radio' name = 'bot' className = 'form-check-input appearance-none rounded-none h-4 w-4 border bg-gray-300 border-slate-100 checked:bg-orange-600 border-4 checked:border-white outline outline-1 outline-slate-500 focus:outline-1 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer' /> <span className = 'ml-2'>Disable</span></label>
            </div>
        </div>

    </div>
    
    </div>





</div>
</AccordionDetails>
</Accordion>
</div>
  )
}

export default CompanySettingsAccordion