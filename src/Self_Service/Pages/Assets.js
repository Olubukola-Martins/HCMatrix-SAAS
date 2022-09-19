import React, { useState } from "react";
import DashboardLayout from "../../Layout/DashboardLayout";
import SelfServiceSubNav from "../Components/SelfServiceSubNav";
import AssetList from "./AssetList";
import AssetOverview from "./AssetOverview";
import AssetType from "./AssetType";

const Assets = () => {
  const [tap, setTap] = useState("overview");

  return (
    <DashboardLayout>
      <SelfServiceSubNav />
      <div className="Container">
        <h2 className="font-extrabold text-xl md:text-2xl text-accent">
          <i className="ri-arrow-left-s-line text-lg"></i> <span>Assets</span>
        </h2>

        <div className="flex items-center gap-5 font-medium border-b-2 text-sm mt-4 mb-5">
          <h5
            onClick={() => setTap("overview")}
            className={
              tap === "overview"
                ? "cursor-pointer hover:text-caramel pb-4 border-b-2 border-caramel"
                : "cursor-pointer hover:text-caramel pb-4"
            }
          >
            Asset Overview
          </h5>
          <h5
            onClick={() => setTap("list")}
            className={
              tap === "list"
                ? "cursor-pointer hover:text-caramel pb-4 border-b-2 border-caramel"
                : "cursor-pointer hover:text-caramel pb-4"
            }
          >
            Asset List
          </h5>
          <h5
            onClick={() => setTap("type")}
            className={
              tap === "type"
                ? "cursor-pointer hover:text-caramel pb-4 border-b-2 border-caramel"
                : "cursor-pointer hover:text-caramel pb-4"
            }
          >
            Asset Type
          </h5>
        </div>

        {/* Display tap */}
        {tap === "overview" && <AssetOverview />}
        {tap === "list" && <AssetList />}
        {tap === "type" && <AssetType />}
      </div>
    </DashboardLayout>
  );
};

export default Assets;
