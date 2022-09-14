import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";

const Requisition = () => {
  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center gap-2 mb-10">
          <Link to="/self-service/home" className="hover:text-caramel">
            <i className="ri-arrow-left-s-line text-xl"></i>
          </Link>
          <h5 className="font-black text-lg">Asset Requisition</h5>
        </div>
        <div>
            
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Requisition;
