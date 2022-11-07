import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import CompanyOrganogramComp from "../Components/CompanyOrganogram";

const CompanyOrganogram = () => {
  const [showDraggableDrawer, setShowDraggableDrawer] = useState("");
  const [switchView, setSwitchView] = useState(true);

  return (
    <DashboardLayout>
      <div className="relative Container">
        <div className="pb-12">
          <div className="flex items-center gap-3 text-accent font-semibold mt-2 pb-1">
            <Link to="/settings">
              <i className="ri-arrow-left-line text-xl cursor-pointer hover:text-caramel"></i>
            </Link>
            <h5 className="text-lg">Organogram Chart</h5>
          </div>

          <CompanyOrganogramComp />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CompanyOrganogram;
