import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";

const Requisition = () => {
  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center gap-2">
          <Link to="/self-service/home" className="hover:text-caramel">
            <i className="ri-arrow-left-s-line text-xl"></i>
          </Link>
          <h5 className="font-black text-lg">Asset Requisition</h5>
        </div>
        <div className="flex items-center gap-3 mt-4 md:mt-0 justify-start md:justify-end">
          <button className="button">New Requisition</button>
          <button
            className="transparentButton"
            style={{ color: "var(--caramel)" }}
          >
            Add / Replace Assets
          </button>
        </div>


        
      </div>
    </DashboardLayout>
  );
};

export default Requisition;
