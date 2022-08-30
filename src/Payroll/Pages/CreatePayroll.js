import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";

const CreatePayroll = () => {
  const divStyle = "";

  return (
    <DashboardLayout>
      <div className="Container mt-10 pb-16 text-accent">
        <div className="flex items-center gap-2 mb-10">
          <Link to="/payroll-history" className="hover:text-caramel">
            <i className="ri-arrow-left-s-line text-xl"></i>
          </Link>
          <h5 className="font-black text-lg">Create Payroll</h5>
        </div>

        <div className="flex items-center justify-end gap-5">
          <button className="neutralButton">Run Payroll</button>
          <button className="button">Restart</button>
          <button className="border border-red-400 hover:text-caramel rounded px-2 py-1 font-medium text-sm text-neutral">
            Delete
          </button>
        </div>

        <div className="bg-card px-5 py-7 rounded-md mt-7">
          <div className="bg-mainBg flex justify-between items-center px-6 py-5 rounded">
            <div>
              <h5 className="font-medium text-base pb-1">Pay Date</h5>
              <p className="text-sm">
                Choose the time frame for which you want to run payroll.
              </p>
            </div>
            <input
              type="date"
              className="border rounded px-3 py-1 border-red-300"
            />
          </div>

          <div className="bg-mainBg flex justify-between items-center px-6 py-5 rounded my-5">
            <div>
              <h5 className="font-medium text-base pb-1">Set Exchange Rates</h5>
              <p className="text-sm">Set the foreign currency exchange rate.</p>
            </div>
            <button className="border border-red-400 hover:text-caramel rounded px-5 py-1 font-medium text-sm text-accent">
              View rate
            </button>
          </div>

          <div className="bg-mainBg flex justify-between items-center px-6 py-5 rounded">
            <div>
              <h5 className="font-medium text-base pb-1">Add Timesheet</h5>
              <p className="text-sm">
                In this payroll cycle, update the time sheets and rates for the
                employees.
              </p>
            </div>
            <button className="border border-red-400 hover:text-caramel rounded px-5 py-1 font-medium text-sm text-accent">
            Add Timesheet
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreatePayroll;
