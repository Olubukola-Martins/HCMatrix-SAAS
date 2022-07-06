import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../Layout/DashboardLayout";

const LocationDetail = () => {
  return (
    <DashboardLayout>
      <div className="Container mt-3">
        <div className="bg-card flex justify-between items-center py-2 px-4 rounded-md">
          <div className="flex items-center gap-3 text-accent font-semibold mt-2 pb-1">
            <Link to="/settings/locations">
              <i className="ri-arrow-left-line text-xl cursor-pointer hover:text-caramel"></i>
            </Link>
            <h5 className="text-lg">Work Location</h5>
          </div>
          <div className="flex items-center gap-3">
            <i className="ri-pencil-fill cursor-pointer text-xl"></i>
            <i className="ri-question-fill text-xl text-slate-400"></i>
            <i className="ri-more-fill cursor-pointer text-xl font-semibold"></i>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LocationDetail;
