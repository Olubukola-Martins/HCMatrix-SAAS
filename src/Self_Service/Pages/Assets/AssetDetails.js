import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../Layout/DashboardLayout";
import SelfServiceSubNav from "../../Components/SelfServiceSubNav";
import placeholder from "../../Assets/Images/placeholder.png"

const AssetDetails = () => {
  return (
    <DashboardLayout>
      <SelfServiceSubNav />
      <div className="Container">
        <div className="flex items-center gap-2">
          <Link to="/self-service/assets/1" className="hover:text-caramel">
            <i className="ri-arrow-left-s-line text-xl"></i>
          </Link>
          <h5 className="font-black text-lg">Asset Details</h5>
        </div>

        <div className="flex md:items-center flex-col md:flex-row justify-start md:justify-between mt-4">
          <h3 className="font-medium text-lg">Hp EliteBook</h3>
          <div className="flex items-center gap-3">
            <button className="button">Edit</button>
            <button
              className="transparentButton"
              style={{ color: "var(--neutral)" }}
            >
            Delete
            </button>
            <button className="transparentButton">Add Document</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
           <div>
           <img src="https://via.placeholder.com/350x150"/>
           </div>
           <div>

           </div>
           <div>

           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AssetDetails;
