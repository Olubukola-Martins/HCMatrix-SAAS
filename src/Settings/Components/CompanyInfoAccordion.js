import React, {useState} from 'react'
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { countries, industries } from '../Data';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0}  {...props} />
  ))(({ theme }) => ({
    border: ``,
    background: 'var(--card)',
    paddingLeft: '15px',
    paddingRight: '15px',
   
  }));


const CompanyInfoAccordion = () => {
    const [expanded, setExpanded] = useState(false)
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const [industry, setIndustry] = React.useState('Food and Beverages');

  const handleIndustryChange = (event) => {
    setIndustry(event.target.value);
  };
  return (
 <div className=''>
       <Accordion  expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
<AccordionSummary

  expandIcon={<ExpandMoreIcon />}
  aria-controls="panel1a-content"
  id="panel1a-header"
>
    <h4 className="text-xl text-accent">
      Company Information
</h4>
</AccordionSummary>
<AccordionDetails>
<div className='grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 justify-between text-accent'>
  <div className='input-container lg:w-3/4'>
  <label className = 'text-sm mb-4 block invisible'>Company Name</label>
       <input
      type="text"
      placeholder="Company Name"
      className="w-full bg-transparent rounded-md py-3 px-3 border border-gray-400 focus:outline-none mb-6"
    />
  </div>
  <div className='input-container lg:w-3/4'>
  <label className = 'text-sm mb-4 block invisible'>Website</label>
       <input
      type="text"
      placeholder="Website"
      className="w-full bg-transparent rounded-md py-3 px-3 border border-gray-400 focus:outline-none mb-6"
    />
  </div>
  <div className='input-container lg:w-3/4'>
    <label className = 'text-sm mb-4 block '>Industry</label>
       <select
      className="w-full bg-transparent rounded-md py-3 px-3 border border-gray-400 focus:outline-none mb-6"
      value = {industry}
      onChange = {handleIndustryChange}
    >
      {industries.map(item => (<option value = {item.value} key = {item.value}>{item.label}</option>))}
    </select>
  </div>
  <div className='input-container lg:w-3/4'>
  <label className = 'text-sm mb-4 block'>Contact Person</label>
       <input
      type="text"
      placeholder="Contact Person"
      className="w-full bg-transparent rounded-md py-3 px-3 border border-gray-400 focus:outline-none mb-6"
    />
  </div>
  <div className='input-container lg:w-3/4'>
  <label className = 'text-sm mb-4 block'>Phone</label>
       <input
      type="text"
      placeholder="Phone"
      className="w-full bg-transparent rounded-md py-3 px-3 border border-gray-400 focus:outline-none mb-6"
    />
  </div>
  <div className='input-container lg:w-3/4'>
  <label className = 'text-sm mb-4 block invisible'>Email</label>
       <input
      type="email"
      placeholder="Email"
      className="w-full bg-transparent rounded-md py-3 px-3 border border-gray-400 focus:outline-none mb-6"
    />
  </div>
  <div className='input-container lg:w-3/4'>
  <label className = 'text-sm mb-4 block'>Address Details</label>
       <input
      type="text"
      placeholder="Address 1"
      className="w-full bg-transparent rounded-md py-3 px-3 border border-gray-400 focus:outline-none mb-6"
    />
  </div>
  <div className='input-container lg:w-3/4'>
  <label className = 'text-sm mb-4 block invisible'>City</label>
       <input
      type="text"
      placeholder="City"
      className="w-full bg-transparent rounded-md py-3 px-3 border border-gray-400 focus:outline-none mb-6"
    />
  </div>
  <div className='input-container lg:w-3/4'>
  <label className = 'text-sm mb-4 block invisible'>State/Province</label>
       <input
      type="text"
      placeholder="State/Province"
      className="w-full bg-transparent rounded-md py-3 px-3 border border-gray-400 focus:outline-none mb-6"
    />
  </div>
  <div className='input-container lg:w-3/4'>
    <label className = 'text-sm mb-4 block invisible'>Country</label>
       <select
      className="w-full bg-transparent rounded-md py-3 px-3 border border-gray-400 focus:outline-none mb-6"
      placeholder='Country'
    
    >
      {countries.map(item => (<option value = {item.value} key = {item.value}>{item.label}</option>))}
    </select>
  </div>
  <div className='input-container lg:w-2/4'>
  <label className = 'text-sm mb-4 block invisible'>Country</label>

  <button
       style={{ background: "var(--caramel)" }}
      type="submit"
      className="capitalize rounded hover:bg-opacity-70 transition ease-in duration-300 w-full text-white py-3 font-semibold mb-6"
    >
      Submit
    </button>
  </div>
</div>
</AccordionDetails>
</Accordion>
 </div>
  )
}

export default CompanyInfoAccordion