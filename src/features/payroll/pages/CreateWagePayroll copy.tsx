import React, { useState } from "react";
import { Link } from "react-router-dom";
import PayrollSubNav from "../components/PayrollSubNav";
import { ExchangeRateContainer } from "../components/exchangeRates/ExchangeRateContainer";
import { SalaryComponentsContainer } from "../components/salaryComponents/SalaryComponentsContainer";
import { EmployeePayrollUpdatesContainer } from "../components/employeePayrollUpdates/EmployeePayrollUpdatesContainer";
import { Input, Select } from "antd";

const CreateWagePayroll = () => {
  const boxStyle =
    "bg-mainBg flex justify-between items-start md:items-center px-6 py-5 rounded lg:flex-row flex-col gap-y-5";

  const buttonStyle =
    "border border-gray-400 hover:text-caramel rounded px-5 py-1 font-medium text-sm text-accent";

  type TType = "daily" | "monthly";
  const [type, setType] = useState<TType>("monthly");
  return (
    <>
      <PayrollSubNav />
      <div className="text-accent Container">
        <div className="flex items-center gap-2 mb-10">
          <Link to="/payroll/cycle" className="hover:text-caramel">
            <i className="ri-arrow-left-s-line text-xl"></i>
          </Link>
          <h5 className="font-black text-lg">Create Wage Payroll</h5>
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
              <h5 className="font-medium text-base pb-1">Payroll Name</h5>
              <p className="md:text-sm text-xs">
                Choose the name you which to describe the payroll.
              </p>
            </div>
            <input
              type="text"
              className="border text-accent rounded px-3 py-1 border-gray-400 bg-mainBg"
              placeholder="Payroll Name"
            />
          </div>
          <div className={boxStyle}>
            <div className="w-full">
              <div className="flex justify-between">
                <div>
                  <h5 className="font-medium text-base pb-1">
                    Select payment type
                  </h5>
                  <p className="md:text-sm text-xs">
                    Would you like to run a monthly or daily hours worked
                    payroll
                  </p>
                </div>
                <div>
                  <Select
                    value={type}
                    options={["daily", "monthly"].map((item) => ({
                      label: item,
                      value: item,
                    }))}
                    onSelect={(val: TType) => setType(val)}
                  />
                </div>
              </div>
              <div className="mt-4">
                {type === "daily" && (
                  <input
                    type="date"
                    placeholder="Select day"
                    className="border text-accent rounded px-3 py-1 border-gray-400 bg-mainBg"
                  />
                )}
                {type === "monthly" && (
                  <input
                    type="month"
                    placeholder="Select month"
                    className="border text-accent rounded px-3 py-1 border-gray-400 bg-mainBg"
                  />
                )}
              </div>
            </div>
          </div>
          <div className={boxStyle}>
            <div className="w-full">
              <div className="flex justify-between">
                <div>
                  <h5 className="font-medium text-base pb-1">
                    Payment Description
                  </h5>
                  <p className="md:text-sm text-xs">
                    A brief decription of payment
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Input.TextArea />
              </div>
            </div>
          </div>
          <div className={boxStyle}>
            <div className="w-full">
              <div className="flex justify-between">
                <div>
                  <h5 className="font-medium text-base pb-1">
                    Set Exchange Rates
                  </h5>
                  <p className="md:text-sm text-xs">
                    Set the foreign currency exchange rate that will be used for
                    expatriates
                  </p>
                </div>
                <div>
                  <button className={buttonStyle}>View rates</button>
                </div>
              </div>
              <div className="mt-4">
                <ExchangeRateContainer />
              </div>
            </div>
          </div>
          <div className={boxStyle}>
            <div className="w-full">
              <div className="flex justify-between">
                <div>
                  <h5 className="font-medium text-base pb-1">
                    Add Employees' Timesheet
                  </h5>
                  <p className="md:text-sm text-xs">
                    Upload the time sheet that will be used to calculate the
                    amount to be paid to each employee based on the hours
                    worked.
                  </p>
                  <p className="md:text-sm text-xs mt-4">
                    Developer Note: This timesheet will typically be produced
                    from the time & attendance module
                  </p>
                </div>
                <div>
                  <button className={buttonStyle}>Upload Timesheet</button>
                </div>
              </div>
            </div>
          </div>

          <div className={boxStyle}>
            <div className="w-full">
              <div className="flex justify-between">
                <div>
                  <h5 className="font-medium text-base pb-1">Allowances</h5>
                  <p className="md:text-sm text-xs">
                    Enable/disable the allowances that you want to be applied
                    generally to employees
                  </p>
                </div>
                <div>
                  <button className={buttonStyle}>View Allowances</button>
                </div>
              </div>
              <div className="mt-4">
                <SalaryComponentsContainer showControlBtns={false} />
              </div>
            </div>
          </div>
          <div className={boxStyle}>
            <div className="w-full">
              <div className="flex justify-between">
                <div>
                  <h5 className="font-medium text-base pb-1">Deductions</h5>
                  <p className="md:text-sm text-xs">
                    Enable/disable the deductions that you want to be applied
                    generally to employees
                  </p>
                </div>
                <div>
                  <button className={buttonStyle}>View Allowances</button>
                </div>
              </div>
              <div className="mt-4">
                <SalaryComponentsContainer showControlBtns={false} />
              </div>
            </div>
          </div>
          <div className={boxStyle}>
            <div className="w-full">
              <div className="flex justify-between">
                <div>
                  <h5 className="font-medium text-base pb-1">
                    Employee Payroll Updates(Non Expatriates)
                  </h5>
                  <p className="md:text-sm text-xs">
                    Modify the payroll by adding/removing salary components of
                    employees or exluding employees from payroll
                  </p>
                </div>
               
              </div>
              <div className="mt-4">
                <EmployeePayrollUpdatesContainer expatriate={false} />
              </div>
            </div>
          </div>
          <div className={boxStyle}>
            <div className="w-full">
              <div className="flex justify-between">
                <div>
                  <h5 className="font-medium text-base pb-1">
                    Employee Payroll Updates(Expatriates)
                  </h5>
                  <p className="md:text-sm text-xs">
                    Modify the payroll by adding/removing salary components of
                    employees or exluding employees from payroll
                  </p>
                </div>
                
              </div>
              <div className="mt-4">
                <EmployeePayrollUpdatesContainer expatriate={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateWagePayroll;
