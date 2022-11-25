import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../Layout/DashboardLayout";
import { AddDomain } from "../../Components/General/Company/AddDomain";

const Domains = () => {
  const [open, setOpen] = useState(false)
  return (
    <DashboardLayout>
      <AddDomain open={open} handleClose={() => setOpen(false)} />
      <div className="Container">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <Link to="/settings">
            <i className="fa fa-arrow-left text-accent" aria-hidden="true"></i>
          </Link>
          <h4 className="text-accent font-bold  text-base md:text-lg">
            Create and Manage Domain information of your organization
          </h4>

          <div className="flex items-center gap-1 self-end">
            <span
              className="text-caramel font-medium text-sm cursor-pointer"
              onClick={() => setOpen(true)}
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
          No Domain configured yet
        </h4>
      </div>
    </DashboardLayout>
  );
};

export default Domains;
