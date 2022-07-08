import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../Layout/DashboardLayout";

const PersonalInformation = () => {
  return (
    <DashboardLayout>
      <div className="Container">
        <div className="flex items-center gap-2 text-accent font-semibold mt-2 pb-1">
          <Link to="/settings/employee-profile">
            <i className="ri-arrow-left-line text-xl cursor-pointer hover:text-caramel"></i>
          </Link>
          <h5 className="text-lg">Personal Information</h5>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PersonalInformation;
