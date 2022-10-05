import React from "react";
import DashboardLayout from "../../../Layout/DashboardLayout";
import SelfServiceSubNav from "../../Components/SelfServiceSubNav";

const LoanPolicies = () => {
  const boxStyle = "px-4 py-3 shadow rounded-md bg-mainBg";
  const boxTitle = "font-medium text-base pb-1";
  const inputStyle =
    "w-full rounded-md border border-gray-300 py-2 px-2 text-sm bg-mainBg focus:outline-none placeholder:text-accent";
  return (
    <DashboardLayout>
      <SelfServiceSubNav />
      <div className="Container">
        <div className="flex items-center gap-3 font-extrabold ">
          <i className="ri-arrow-left-s-line text-lg cursor-pointer hover:text-caramel"></i>
          <h2 className="text-xl md:text-2xl text-accent">Loan Policies</h2>
        </div>

        <div className="">
          <div className="bg-card px-5 py-7  rounded-md mt-7 grid grid-cols-1 md:grid-cols-2 gap-5 text-accent">
            <div>
              <div className={boxStyle}>
                <select name="" id="">
                  <option value="">Select Work Flow Approval</option>
                </select>
              </div>
            </div>

            <div></div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LoanPolicies;
