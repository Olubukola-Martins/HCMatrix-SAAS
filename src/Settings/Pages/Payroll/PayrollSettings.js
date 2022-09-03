import { Checkbox, Switch } from "@mui/material";
import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../Layout/DashboardLayout";
import OvertimeSetting from "../../Components/Payroll/OvertimeSetting";

var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const initialState = {
  leaveA: false,
  overtimeS: false,
  payPension: false,
  theMonth: false,
  salaryBreakdown: false,
  tax: false,
  taxTable: false
};

function reducer(state, action) {
  switch (action.type) {
    case "leaveAllowance":
      return { ...state, leaveA: !state.leaveA };
    case "overtimeSetting":
      return { ...state, overtimeS: !state.overtimeS };
    case "payPension":
      return { ...state, payPension: !state.payPension };
    case "13thMonth":
      return { ...state, theMonth: !state.theMonth };
    case "salaryBreakdown":
      return { ...state, salaryBreakdown: !state.salaryBreakdown };
    case "tax":
      return { ...state, tax: !state.tax };
      case "taxTable": return {...state, taxTable: action.payload}
    default:
      return state;
  }
}
//

const PayrollSettings = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { leaveA, overtimeS, payPension, theMonth, salaryBreakdown, tax } =
    state;

  const boxStyle = "px-4 py-3 shadow rounded-md bg-mainBg";
  const boxTitle = "font-medium text-base pb-1";
  const inputStyle =
    "w-full rounded-md border border-gray-300 py-2 px-2 text-sm bg-mainBg focus:outline-none placeholder:text-accent";
  const taxTableWrap =
    "flex item-center text-xs justify-between gap-2 border-b border-slate-400 pb-1";

  return (
    <DashboardLayout>
      <div className="Container mt-10 pb-16">
        <div className="flex items-center gap-1 mb-10">
          <Link to="/payroll/home">
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
                <Switch
                  checked={overtimeS}
                  onChange={() => dispatch({ type: "overtimeSetting" })}
                />
              </div>
              {overtimeS && (
                <OvertimeSetting
                  inputStyle={inputStyle}
                  close={() => dispatch({ type: "overtimeSetting" })}
                />
              )}
            </div>

            <div className={boxStyle}>
              <div className="flex items-center justify-between">
                <h5 className={boxTitle}>Pay Pension</h5>
                <Switch
                  checked={payPension}
                  onChange={() => dispatch({ type: "payPension" })}
                />
              </div>

              {payPension && (
                <div className="mt-2">
                  <label className="text-sm">Select pension plan</label>
                  <div className="flex items-center lg:justify-between">
                    <div className="flex items-center">
                      <Checkbox defaultChecked id="8%" />
                      <label
                        className="text-xs lg:text-sm cursor-pointer hover:text-caramel"
                        htmlFor="8%"
                      >
                        8% Employee Deduction
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="20%" />
                      <label
                        className="text-xs lg:text-sm cursor-pointer hover:text-caramel"
                        htmlFor="20%"
                      >
                        Group 20%
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-5 pb-3">
                    <button
                      onClick={() => dispatch({ type: "payPension" })}
                      type="button"
                      className="transparentButton"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="button">
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className={`${boxStyle} text-sm`}>
              <div className="flex items-center justify-between">
                <h5 className={boxTitle}>13th Month Salary</h5>{" "}
                <Switch
                  checked={theMonth}
                  onChange={() => dispatch({ type: "13thMonth" })}
                />
              </div>
              <p className="text-sm">
                This allows you to add a percentage of the employees' salary as
                a 13th month bonus to be paid in the selected month
              </p>

              {theMonth && (
                <div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                    <div>
                      <label htmlFor="salary">Percentage of salary</label>
                      <input
                        type="text"
                        placeholder="0%"
                        className={inputStyle}
                      />
                    </div>
                    <div>
                      <label htmlFor="payment">Month of Payment</label>
                      <select name="" id="" className={inputStyle}>
                        <option value="">Select</option>
                        {months.map((month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-5 pb-3">
                    <button
                      onClick={() => dispatch({ type: "13thMonth" })}
                      type="button"
                      className="transparentButton"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="button">
                      Save
                    </button>
                  </div>
                </div>
              )}
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
                      Cancel
                    </button>
                    <button type="submit" className="button">
                      Save
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
                <h5 className={boxTitle}>TAX</h5>{" "}
                <Switch
                  value={tax}
                  onChange={() => dispatch({ type: "tax" })}
                />
              </div>

              {tax && (
                <div className="text-sm mt-3">
                  <p className="">Select Tax Mode</p>
                  <div className="flex items-center gap-5 -ml-3">
                    <div className="flex items-center">
                      <Checkbox checked id="monthly" />
                      <label
                        htmlFor="monthly"
                        className="cursor-pointer hover:text-caramel"
                      >
                        Monthly
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="annually" />
                      <label
                        htmlFor="annually"
                        className="cursor-pointer hover:text-caramel"
                      >
                        Annually
                      </label>
                    </div>
                  </div>
                  <h5 className="text-caramel underline pt-3 cursor-pointer">
                    View Tax Table
                  </h5>
                  {/* tax table */}
                  <div className="bg-card px-2 py-3 mt-3 rounded font-medium">
                    <i className="ri-close-fill text-lg flex justify-end pb-3 font-semibold"></i>
                    <div className="flex flex-col gap-4">
                      <div className="flex item-center text-xs justify-between gap-2 mb-4">
                        <span className="text-sm">Taxation in Nigeria</span>
                        <span className="text-caramel underline">
                          Edit Tax Table
                        </span>
                      </div>
                      <div className={taxTableWrap}>
                        <span>Annual Income(NGN)</span>
                        <span>Personal Income Tax Rate (%)</span>
                      </div>

                      <div className={taxTableWrap}>
                        <span>First 300000</span>
                        <span>7</span>
                      </div>
                      <div className={taxTableWrap}>
                        <span>Next 300000</span>
                        <span>11</span>
                      </div>
                      <div className={taxTableWrap}>
                        <span>Next 500000</span>
                        <span>15</span>
                      </div>
                      <div className={taxTableWrap}>
                        <span>Next 500000</span>
                        <span>19</span>
                      </div>
                      <div className={taxTableWrap}>
                        <span>Next 1600000</span>
                        <span>21</span>
                      </div>
                      <div className={taxTableWrap}>
                        <span> Next 3200000</span>
                        <span>24</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-5 pb-2">
                    <button
                      onClick={() => dispatch({ type: "tax" })}
                      type="button"
                      className="transparentButton"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="button">
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className={boxStyle}>
              <div className="flex items-center justify-between">
                <h5 className={boxTitle}>Salary Breakdown</h5>
                <Switch
                  value={salaryBreakdown}
                  onChange={() => dispatch({ type: "salaryBreakdown" })}
                />
              </div>
              <p className="text-sm">
                This allows you to breakdown your employees' salaries (e.g
                basic, housing, transport, etc). You can add custom items too.
              </p>
              {salaryBreakdown && (
                <div>
                  <div className="grid grid-cols-2 gap-5 mt-6">
                    <div>
                      <p className="text-xs md:text-sm pb-2">Salary Item</p>
                      <div className="flex flex-col gap-3">
                        <input
                          type="text"
                          placeholder="Basic"
                          disabled
                          className={inputStyle}
                        />
                        <input
                          type="text"
                          placeholder="Housing"
                          disabled
                          className={inputStyle}
                        />
                        <input
                          type="text"
                          placeholder="Transport"
                          disabled
                          className={inputStyle}
                        />
                      </div>
                    </div>

                    <div>
                      <p className="text-xs md:text-sm pb-2">
                        Percentage of gross
                      </p>
                      <div className="flex flex-col gap-3">
                        <input
                          type="number"
                          placeholder="0%"
                          className={inputStyle}
                        />
                        <input
                          type="number"
                          placeholder="0%"
                          className={inputStyle}
                        />
                        <input
                          type="number"
                          placeholder="0%"
                          className={inputStyle}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="my-5">
                    <h4 className="text-caramel text-sm underline pb-2 cursor-pointer">
                      Add Item
                    </h4>
                    <p className="text-xs">
                      Total breakdown is 0% and should be 100%
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-5 pb-2">
                    <button
                      onClick={() => dispatch({ type: "salaryBreakdown" })}
                      type="button"
                      className="transparentButton"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="button">
                      Save Breakdown
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PayrollSettings;
