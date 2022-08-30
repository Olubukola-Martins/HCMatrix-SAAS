import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";

const CreatePayroll = () => {
  return (
    <DashboardLayout>
      <div className="Container mt-10 pb-16">
        <div className="flex items-center gap-2 mb-10">
          <Link to="/payroll-history" className="hover:text-caramel">
            <i className="ri-arrow-left-s-line text-xl"></i>
          </Link>
          <h5 className="font-black text-lg">Create Payroll</h5>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreatePayroll;
