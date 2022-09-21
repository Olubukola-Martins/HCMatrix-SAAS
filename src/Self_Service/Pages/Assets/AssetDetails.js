import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../Layout/DashboardLayout";
import SelfServiceSubNav from "../../Components/SelfServiceSubNav";

const AssetDetails = () => {
  return (
    <DashboardLayout>
        <SelfServiceSubNav />
      <div className="Container">
   
        <div className="flex items-center gap-2">
          <Link to="/self-service/home" className="hover:text-caramel">
            <i className="ri-arrow-left-s-line text-xl"></i>
          </Link>
          <h5 className="font-black text-lg">Asset Details</h5>
        </div>

        <div>
            
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AssetDetails;
