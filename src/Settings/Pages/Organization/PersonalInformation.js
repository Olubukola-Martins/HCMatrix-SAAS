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

        <div className="grid md:grid-cols-3 grid-cols-1 gap-6 mt-5">
          <div className="text-center">
            <div className="flex justify-center">
              <img
                src="https://res.cloudinary.com/ddvaelej7/image/upload/v1657714689/samples/personal-info_vgptbq.png"
                alt="user"
                className="h-32"
              />
            </div>
            <div className="bg-card inline-block pl-3 pr-7 py-1 rounded font-medium text-sm">
              <label htmlFor="file" className="cursor-pointer">Browse..</label>
              <input type="file" id="file" className="hidden" />
            </div>
          </div>

          <div>2</div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PersonalInformation;
