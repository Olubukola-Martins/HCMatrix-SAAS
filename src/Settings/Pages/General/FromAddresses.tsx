import { useState } from "react";
import DashboardLayout from "../../../Layout/DashboardLayout";
import InfoIcon from "../../Assets/info_icon.svg";
import { Link } from "react-router-dom";
import { AddFromAddress } from "../../Components/General/FromAddressses/AddFromAddress";

const FromAddresses = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <AddFromAddress
        open={openModal}
        handleClose={() => setOpenModal(false)}
      />
      <DashboardLayout>
        <div className="Container pb-20 mt-10 mb-72">
          {/* heading container */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start ">
            <Link to="/settings">
              <i
                className="fa fa-arrow-left text-accent text-lg "
                aria-hidden="true"
              ></i>
            </Link>

            <h4 className="font-bold text-accent lg:text-center text-lg lg:text-lg md:w-3/5 md:leading-10 mb-10 lg:mb-0">
              Create and manage official from addresses for automated e-mails
              sent from your organization.
            </h4>
            <div className="left-action flex">
              <button
                className="text-caramel  mr-6 text-sm md:text-base ml-auto lg:ml-0"
                onClick={() => setOpenModal(true)}
              >
                + Add from Address
              </button>
              <img src={InfoIcon} alt="info" className="md:h-6 h-4" />
            </div>
          </div>
          {/* table container */}
          <div className="table-container mt-10">
            <div className="table-heading grid grid-cols-3 md:gap-24 gap-2 mb-4 px-4 py-4 rounded-xl items-start bg-card  text-xs lg:text-base font-semibold ">
              <h5 className="">Display Name</h5>
              <h5 className="">From Address</h5>
              <h5 className="">Verification Status</h5>
            </div>
            <div className="table-entry grid grid-cols-3 md:gap-24  gap-2  mb-4 text-xs  lg:text-sm px-4 py-4 rounded-xl items-start bg-card ">
              <div className="flex items-center">
                <i className="fa-solid fa-star text-green-500"></i>
                <span className="md:ml-4 ml-1">noreply</span>
              </div>
              <div>
                <span className="break-words">noreply@hcmatrix.com</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-check-circle text-green-500"></i>
                <span className="md:ml-4 ml-1">Verified</span>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default FromAddresses;
