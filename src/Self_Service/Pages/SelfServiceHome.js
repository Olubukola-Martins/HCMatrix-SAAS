import React from "react";
import DashboardLayout from "../../Layout/DashboardLayout";
import loan from "../Assets/Images/loan.svg";

const SelfServiceHome = () => {
  return (
    <DashboardLayout>
      <div>
        <h2 className="font-extrabold text-xl md:text-2xl">Self Service</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
          <div className="bg-card p-2 rounded-lg shadow cursor-pointer group">
            <div className="bg-mainBg py-2 px-3 rounded-lg group-hover:border-b group-hover:border-caramel group-hover:shadow-md">
              <div className="flex items-center gap-2">
                <div className="border rounded-full h-11 w-11 flex items-center justify-center">
                  <img src={loan} alt="loan" className="" />
                </div>
                <h5 className="font-medium">Loan</h5>
              </div>
              <p className="text-sm py-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SelfServiceHome;
