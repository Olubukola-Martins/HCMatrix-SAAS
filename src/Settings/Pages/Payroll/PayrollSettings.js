import { Checkbox, Switch } from "@mui/material";
import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../Layout/DashboardLayout";

const initialState = {
  leaveA: false,
  overtimeS: false
};

function reducer(state, action) {
  switch (action.type) {
    case "leaveAllowance":
      return { ...state, leaveA: !state.leaveA };
      case "overtimeSetting":
        return { ...state, overtimeS: !state.overtimeS };
    default:
      return state;
  }
}

const PayrollSettings = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { leaveA } = state;

  const boxStyle = "px-4 py-3 shadow rounded-md bg-mainBg";
  const boxTitle = "font-medium text-base pb-1";
  const inputStyle =
    "w-full rounded-md border border-gray-300 py-2 px-2 text-sm bg-mainBg focus:outline-none placeholder:text-accent";

  return (
    <DashboardLayout>
      <div className="Container mt-10 pb-16">
        <div className="flex items-center gap-1 mb-10">
          <Link to="#!">
            <i className="ri-arrow-left-s-line text-xl"></i>
          </Link>
          <h5 className="font-black text-lg">Payroll Settings</h5>
        </div>

        <div className="flex justify-end">
          <button className="button">Save Changes</button>
        </div>

        <div className="bg-card px-5 py-7  rounded-md mt-7 grid grid-cols-1 md:grid-cols-2 gap-5 text-accent">
          {/* first row */}
          <div className="flex flex-col gap-4">
            <div className={boxStyle}>
              <h5 className={boxTitle}>Payroll Scheme Type</h5>
              <select className={inputStyle}>
                <option value="">Select scheme</option>
                <option value="wages">Wages</option>
                <option value="scheme">scheme 1</option>
              </select>
            </div>

            <div className={boxStyle}>
              <h5 className={boxTitle}>Payroll Frequency</h5>
              <select className={inputStyle}>
                <option value="">Select</option>
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
            <div className={boxStyle}>
              <h5 className={boxTitle}>Payroll Period Starts (Month)</h5>
              <input
                type="text"
                className={inputStyle}
                placeholder="e.g August"
              />
            </div>

            <div className={boxStyle}>
              <h5 className={boxTitle}>Payroll day</h5>
              <input
                type="date"
                className={inputStyle}
                placeholder="e.g August"
              />
            </div>

            <div className={boxStyle}>
              <div className="flex items-center justify-between">
                <h5 className={boxTitle}>Overtime Settings</h5>
                <Switch />



              </div>

             
            </div>

            <div className={boxStyle}>
              <div className="flex items-center justify-between">
                <h5 className={boxTitle}>Pay Pension</h5>
                <Switch />
              </div>
            </div>

            <div className={boxStyle}>
              <div className="flex items-center justify-between">
                <h5 className={boxTitle}>13th Month Salary</h5> <Switch />
              </div>
              <p className="text-sm">
                This allows you to add a percentage of the employees' salary as
                a 13th month bonus to be paid in the selected month
              </p>
            </div>
          </div>

          {/* second */}
          <div className="flex flex-col gap-4">
            <div className={boxStyle}>
              <div className="flex items-center justify-between">
                <h5 className={boxTitle}>Leave allowance</h5>
                <Switch
                  checked={leaveA}
                  onChange={() => dispatch({ type: "leaveAllowance" })}
                />
              </div>
              <p className="text-sm">
                This allows you add a percentage of your employees salary as
                leave allowance to be paid when an employee goes on leave
              </p>

              {leaveA && (
                <form className="mt-6 mb-2">
                  <p className="text-sm">Percentage of salary</p>
                  <input type="text" placeholder="0%" className={inputStyle} />

                  <div className="flex justify-between items-center mt-5">
                    <button
                      onClick={() => dispatch({ type: "leaveAllowance" })}
                      type="button"
                      className="transparentButton"
                    >
                      cancel
                    </button>
                    <button type="submit" className="button">
                      save
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className={boxStyle}>
              <div className="flex items-center justify-between">
                <h5 className={boxTitle}>NIF</h5> <Switch />
              </div>
            </div>

            <div className={boxStyle}>
              <div className="flex items-center justify-between">
                <h5 className={boxTitle}>NSITF</h5> <Switch />
              </div>
            </div>

            <div className={boxStyle}>
              <div className="flex items-center justify-between">
                <h5 className={boxTitle}>ITF</h5> <Switch />
              </div>
            </div>

            <div className={boxStyle}>
              <div className="flex items-center justify-between">
                <h5 className={boxTitle}>TAX</h5> <Switch />
              </div>
            </div>

            <div className={boxStyle}>
              <div className="flex items-center justify-between">
                <h5 className={boxTitle}>Salary Breakdown</h5> <Switch />
              </div>
              <p className="text-sm">
                This allows you to breakdown your employees' salaries (e.g
                basic, housing, transport, etc). You can add custom items too.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PayrollSettings;
