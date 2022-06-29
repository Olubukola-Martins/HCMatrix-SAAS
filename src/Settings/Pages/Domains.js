import React from "react";
import Modal from "@mui/material/Modal";
import Themes from "../../Themes/Themes";
import { Link } from 'react-router-dom';

import DashboardLayout from "../../Layout/DashboardLayout";

const Domains = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <DashboardLayout>
      <div className="Container pb-36 pt-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
         
          <Link to = '/settings'>
              <i className="fa fa-arrow-left text-accent" aria-hidden="true"></i></Link>
          <h4 className="text-accent font-bold  text-base md:text-lg">
            Create and Manage Domain information of your organization
          </h4>
         
        
          <div className="flex items-center gap-1 self-end">
            <span
              className="text-caramel font-medium text-sm cursor-pointer"
              onClick={handleOpen}
            >
              + Add Domain
            </span>
            <i
              className="ri-question-fill text-gray-500"
              title="Add domain"
            ></i>
          </div>
        </div>

        <div className="bg-card rounded py-3 font-medium text-accent flex items-center justify-between text-sm px-5 mt-5">
          <span>Domain Name</span>
          <span>Verification Status</span>
          <span>DKIM Details</span>
        </div>

        <h4 className="text-base text-accent text-center pt-10">
          No Dormain consfigured yet
        </h4>

        {/* Domain modal */}
        <Modal open={open} onClose={handleClose}>
          <Themes>
            <div className="CModal" style={{ maxWidth: 400 }}>
              <span className="flex justify-end mb-2">
                <i
                  className="ri-close-line cursor-pointer"
                  onClick={handleClose}
                ></i>
              </span>
             
             
             <h1 className="font-bold text-lg text-accent text-center">
                Add Domain Name
              </h1>
         
              <form className="my-4">
                <input
                  type="text"
                  className="border border-slate-400 text-accent bg-transparent py-2 pl-2 text-sm rounded w-full focus:outline-none"
                  placeholder="Domain name"
                />
                <span className="text-xs text-accent">
                  Example: johndoe.com
                </span>
              </form>
              <div className="flex items-center justify-center gap-4">
                <button className="button">Add</button>
                <button className="transparentButton" onClick={handleClose}>
                  Cancel
                </button>
              </div>
            </div>
          </Themes>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Domains;
