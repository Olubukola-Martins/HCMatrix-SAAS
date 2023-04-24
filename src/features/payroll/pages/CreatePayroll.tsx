import React from "react";
import { Link } from "react-router-dom";
import PayrollSubNav from "../components/PayrollSubNav";

const CreatePayroll = () => {
  const boxStyle =
    "bg-mainBg flex justify-between items-start md:items-center px-6 py-5 rounded lg:flex-row flex-col gap-y-5";

  const buttonStyle =
    "border border-gray-400 hover:text-caramel rounded px-5 py-1 font-medium text-sm text-accent";

  return (
    <>
      <PayrollSubNav />
      <div className="text-accent">
        <div className="flex items-center gap-2 mb-10">
          <Link to="/payroll/cycle" className="hover:text-caramel">
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

        <div className="bg-card px-5 py-7 rounded-md mt-7 flex flex-col gap-4">
          <div className={boxStyle}>
            <div>
              <h5 className="font-medium text-base pb-1">Pay Date</h5>
              <p className="md:text-sm text-xs">
                Choose the time frame for which you want to run payroll.
              </p>
            </div>
            <input
              type="date"
              className="border text-accent rounded px-3 py-1 border-gray-400 bg-mainBg"
            />
          </div>

          <div className={boxStyle}>
            <div>
              <h5 className="font-medium text-base pb-1">Set Exchange Rates</h5>
              <p className="md:text-sm text-xs">
                Set the foreign currency exchange rate.
              </p>
            </div>
            <button className={buttonStyle}>View rate</button>
          </div>

          <div className={boxStyle}>
            <div>
              <h5 className="font-medium text-base pb-1">Add Timesheet</h5>
              <p className="md:text-sm text-xs">
                In this payroll cycle, update the time sheets and rates for the
                employees.
              </p>
            </div>
            <button className={buttonStyle}>Add Timesheet</button>
          </div>
          <div className={boxStyle}>
            <div>
              <h5 className="font-medium text-base pb-1">
                Employee Payroll Updates
              </h5>
              <p className="md:text-sm text-xs">
                In this payroll cycle, update the timesheets and rates for the
                employees.
              </p>
            </div>
            <button className={buttonStyle}>Add Updates</button>
          </div>

          <div className={boxStyle}>
            <div>
              <h5 className="font-medium text-base pb-1">Payroll Approval</h5>
              <p className="md:text-sm text-xs">
                Payroll approval for employees.
              </p>
            </div>
            <select
              name=""
              className="border text-accent rounded px-4 py-1 border-gray-400 bg-mainBg focus:outline-none"
            >
              <option value="">Add Approval</option>
              <option value="Approval_1">Approval 1</option>
              <option value="Approval_2">Approval 2</option>
              <option value="Approval_3">Approval 3</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePayroll;
