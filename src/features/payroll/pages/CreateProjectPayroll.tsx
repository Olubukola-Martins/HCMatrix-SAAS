import React from "react";
import { Link } from "react-router-dom";
import PayrollSubNav from "../components/PayrollSubNav";
import { ExchangeRateContainer } from "../components/exchangeRates/ExchangeRateContainer";
import { SalaryComponentsContainer } from "../components/salaryComponents/SalaryComponentsContainer";
import { EmployeePayrollUpdatesContainer } from "../components/employeePayrollUpdates/EmployeePayrollUpdatesContainer";
import { Input, Select } from "antd";

const CreateProjectPayroll = () => {
  const boxStyle =
    "bg-mainBg flex justify-between items-start md:items-center px-6 py-5 rounded lg:flex-row flex-col gap-y-5";

  const buttonStyle =
    "border border-gray-400 hover:text-caramel rounded px-5 py-1 font-medium text-sm text-accent";

  return (
    <>
      <PayrollSubNav />
      <div className="text-accent Container">
        <div className="flex items-center gap-2 mb-10">
          <Link to="/payroll/cycle" className="hover:text-caramel">
            <i className="ri-arrow-left-s-line text-xl"></i>
          </Link>
          <h5 className="font-black text-lg">Create Project Payroll</h5>
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
              <h5 className="font-medium text-base pb-1">Project</h5>
              <p className="md:text-sm text-xs">
                Select the project you wish to run payroll for
              </p>
            </div>
            <Select placeholder="Select project" />
          </div>
          <div className={boxStyle}>
            <div>
              <h5 className="font-medium text-base pb-1">Select Payment</h5>
              <p className="md:text-sm text-xs">
                Choose the payment you wish to run this payroll for.
              </p>
            </div>
            <Select
              placeholder="Select payment"
              options={Array(4)
                .fill(0)
                .map((item, i) => ({ label: `${i + 1} Payment`, value: i }))}
              getPopupContainer={(triggerNode) => triggerNode.parentElement}
            />
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
            <div>
              <h5 className="font-medium text-base pb-1">
                Add Overtime Timesheet
              </h5>
              <p className="md:text-sm text-xs">
                Upload the overtime sheet that will be used to add overtime pay
                to employee.
              </p>
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
                <div>
                  <button className={buttonStyle}>Make Updates</button>
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
                <div>
                  <button className={buttonStyle}>Make Updates</button>
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

export default CreateProjectPayroll;
