import PageSubHeader from "components/layout/PageSubHeader";
import { Button, Checkbox, Form, Select, Switch } from "antd";
import { useReducer, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { FormWorkflowInput } from "features/core/workflows/components/FormWorkflowInput";
import { SalaryComponentsContainer } from "../salaryComponents/SalaryComponentsContainer";
import { AddSalaryComponentForm } from "../salaryComponents/AddSalaryComponent";
import { ALLOWANNCES } from "features/payroll/constants";
import { TaxPolicyCreator } from "../taxPolicies";
import { PayrollSingleProjectParticipantsContainer } from "../projectParticipants/PayrollSingleProjectParticipantsContainer";

const boxStyle = "px-4 py-3 shadow rounded-md bg-mainBg";
const boxTitle = "font-medium text-base pb-1";
const inputStyle =
  "w-full rounded-md border border-gray-300 py-2 px-2 text-sm bg-mainBg focus:outline-none";
const taxTableWrap =
  "flex item-center text-xs justify-between gap-2 border-b border-slate-400 pb-1";
const initialState = {
  leaveA: false,
  overtimeS: false,
  payPension: false,
  theMonth: false,
  salaryBreakdown: false,
  tax: false,
  taxTable: false,
  disbursePayment: false,
  payslipIssuance: false,
  payrollApproval: false,
  displayAllowances: false,
  displayDeductions: false,
};

function reducer(state: any, action: any) {
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
    case "taxTable":
      return { ...state, taxTable: action.payload };
    case "disbursePayment":
      return { ...state, disbursePayment: !state.disbursePayment };
    case "payslipIssuance":
      return { ...state, payslipIssuance: !state.payslipIssuance };
    case "payrollApproval":
      return { ...state, payrollApproval: !state.payrollApproval };
    case "displayAllowances":
      return { ...state, displayAllowances: !state.displayAllowances };
    case "displayDeductions":
      return { ...state, displayDeductions: !state.displayDeductions };
    default:
      return state;
  }
}
export const SetUpSingleProjectPayrollContainer = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <PageSubHeader
          hideBackground
          description={`Set up payroll for this project`}
          actions={[
            {
              name: "Save Changes",
              handleClick: () => {},
              btnVariant: "default",
            },
          ]}
        />
        <SetUpForm />
      </div>
    </>
  );
};

const SetUpForm = () => {
  const [taxpol, setTaxPol] = useState("");
  const [taxCreate, setTaxCreate] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    leaveA,
    overtimeS,
    payPension,
    theMonth,
    salaryBreakdown,
    tax,
    taxTable,
    disbursePayment,
    payslipIssuance,
    payrollApproval,
    displayAllowances,
    displayDeductions,
  } = state;
  return (
    <div className="bg-card px-5 py-7  rounded-md mt-7 grid grid-cols-1 md:grid-cols-1 gap-5 text-accent">
      {/* first row */}
      <div className="flex flex-col gap-4">
        <div className={boxStyle}>
          <h5 className={boxTitle}>Payroll Scheme Type</h5>
          <input
            className={inputStyle}
            value="Project/Contract Payroll Scheme"
            disabled
          />
        </div>

        <div className={boxStyle}>
          <div className="flex items-center justify-between">
            <h5
              className={boxTitle}
              title="How many split payments would you like to make ?"
            >
              Payroll Frequency
            </h5>
          </div>
          <p className="text-sm">
            How many split payments would you like to make ?
          </p>

          <div className="mt-2">
            <div className="flex items-center lg:justify-between">
              <div className="w-2/5">
                <input
                  className={inputStyle}
                  type="number"
                  min={1}
                  max={28}
                  placeholder="Amount of split payments"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={boxStyle}>
          <div className="flex items-center justify-between">
            <h5
              className={boxTitle}
              title="Set up the gross pay of each project participant "
            >
              Project Participants(Non - Expatriates)
            </h5>
            <Button
              icon={<DownOutlined />}
              type="text"
              onClick={() => dispatch({ type: "displayAllowances" })}
            />
          </div>
          <p className="text-sm">
            Set up the gross pay of each project participant
          </p>
          {displayAllowances && (
            <div className="mt-2">
              <PayrollSingleProjectParticipantsContainer
                participants={[
                  {
                    key: "0",
                    name: "James Kaladin",
                    empuid: "EMP009",
                    amount: 330000,
                    exchangeRate: {
                      currency: "Naira(N)",
                      rate: 1,
                    },
                  },
                  {
                    key: "1",
                    name: "Deborah Tully",
                    empuid: "EMP007",

                    amount: 700000,
                    exchangeRate: {
                      currency: "Naira(N)",
                      rate: 1,
                    },
                  },
                ]}
              />
            </div>
          )}
        </div>
        <div className={boxStyle}>
          <div className="flex items-center justify-between">
            <h5
              className={boxTitle}
              title="Set up the gross pay of each project participant "
            >
              Project Participants(Expatriates)
            </h5>
            <Button
              icon={<DownOutlined />}
              type="text"
              onClick={() => dispatch({ type: "displayAllowances" })}
            />
          </div>
          <p className="text-sm">
            Set up the gross pay of each project participant
          </p>
          {displayAllowances && (
            <div className="mt-2">
              <PayrollSingleProjectParticipantsContainer
                participants={[
                  {
                    key: "0",
                    name: "James Kaladin",
                    empuid: "EMP009",
                    amount: 330000,
                    exchangeRate: {
                      currency: "Dollar($)",
                      rate: 0.05,
                    },
                  },
                  {
                    key: "1",
                    name: "Deborah Tully",
                    empuid: "EMP007",

                    amount: 700000,
                    exchangeRate: {
                      currency: "Dollar($)",
                      rate: 0.05,
                    },
                  },
                ]}
              />
            </div>
          )}
        </div>

        <div className={boxStyle}>
          <div className="flex items-center justify-between">
            <h5
              className={boxTitle}
              title="Do you want to disburse payment after approval/confirmation?"
            >
              Payroll Disbursement
            </h5>
            <Switch
              checked={disbursePayment}
              onChange={() => dispatch({ type: "disbursePayment" })}
            />
          </div>
          <p className="text-sm">
            Do you want to disburse payment after approval/confirmation?
          </p>
        </div>
        <div className={boxStyle}>
          <div className="flex items-center justify-between">
            <h5
              className={boxTitle}
              title="Manage all of the postive finiacial benefits that make up employees' pay"
            >
              Allowances
            </h5>
            <Button
              icon={<DownOutlined />}
              type="text"
              onClick={() => dispatch({ type: "displayAllowances" })}
            />
          </div>
          <p className="text-sm">
            Manage all of the postive finiacial benefits that make up employees'
            pay
          </p>
          {displayAllowances && (
            <div className="mt-2">
              <SalaryComponentsContainer />
            </div>
          )}
        </div>
        <div className={boxStyle}>
          <div className="flex items-center justify-between">
            <h5
              className={boxTitle}
              title="Manage all of the negative finiacial benefits that make up employees' pay"
            >
              Deductions
            </h5>
            <Button
              icon={<DownOutlined />}
              type="text"
              onClick={() => dispatch({ type: "displayDeductions" })}
            />
          </div>
          <p className="text-sm">
            Manage all of the negative finiacial benefits that make up
            employees' pay
          </p>
          {displayDeductions && (
            <div className="mt-2">
              <SalaryComponentsContainer />
            </div>
          )}
        </div>
        <div className={boxStyle}>
          <div className="flex items-center justify-between">
            <h5
              className={boxTitle}
              title="Do you want to add an approval process to payroll before confirmation/disbursement?"
            >
              Payroll Approval
            </h5>
            <Switch
              checked={payrollApproval}
              onChange={() => dispatch({ type: "payrollApproval" })}
            />
          </div>
          <p className="text-sm">
            Do you want to add an approval process to payroll before
            confirmation/disbursement?
          </p>
          {payrollApproval && (
            <div className="mt-2">
              {/* <label className="text-sm">
                What day would you like to disburse payment
              </label> */}
              <div className="flex items-center lg:justify-between">
                <div className="w-2/5">
                  <FormWorkflowInput
                    Form={Form}
                    control={{ name: "workflowId", label: "" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={boxStyle}>
          <div className="flex items-center justify-between">
            <h5
              className={boxTitle}
              title="Do you want to issue payslip, when payroll is approved/disbursed?"
            >
              Payslip Issuance
            </h5>
            <Switch
              checked={payslipIssuance}
              onChange={() => dispatch({ type: "payslipIssuance" })}
            />
          </div>
          <p className="text-sm">
            Do you want to issue payslip, when payroll is approved/disbursed?
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
            This allows you add a percentage of your employees salary as leave
            allowance to be paid when an employee goes on leave
          </p>

          {leaveA && (
            <div className="mt-6">
              <AddSalaryComponentForm
                handleSave={() => {}}
                dependencies={ALLOWANNCES.map((item) => item.identifier)}
                componentName="leave_allowance" //make this a constant so its not a magic variable
              />
            </div>
          )}
        </div>
        {["NIF", "NSITF", "ITF", "Pension"].map((item, i) => (
          <div className={boxStyle}>
            <div className="flex items-center justify-between">
              <h5 className={boxTitle}>{item}</h5>
              <Switch
                checked={leaveA}
                onChange={() => dispatch({ type: "leaveAllowance" })}
              />
            </div>

            {leaveA && (
              <div className="mt-6">
                <AddSalaryComponentForm
                  handleSave={() => {}}
                  dependencies={ALLOWANNCES.map((item) => item.identifier)}
                  componentName="leave_allowance" //make this a constant so its not a magic variable
                />
              </div>
            )}
          </div>
        ))}
        <div className={boxStyle}>
          <div className="flex items-center justify-between">
            <h5 className={boxTitle}>Overtime Settings</h5>
            <Switch
              checked={overtimeS}
              onChange={() => dispatch({ type: "overtimeSetting" })}
            />
          </div>
          <p className="text-sm">
            Set the amount that will be applied to each overtime hour worked
          </p>
          {overtimeS && (
            <div className="mt-6">
              <AddSalaryComponentForm
                handleSave={() => {}}
                dependencies={ALLOWANNCES.map((item) => item.identifier)}
                componentName="overtime" //make this a constant so its not a magic variable
              />
            </div>
          )}
        </div>

        <div className={boxStyle}>
          <div className="flex items-center justify-between">
            <h5 className={boxTitle}>TAX</h5>{" "}
            <Switch checked={tax} onChange={() => dispatch({ type: "tax" })} />
          </div>

          {tax && (
            <div className="text-sm mt-3">
              <div className="flex flex-col gap-1">
                <p className="">Select Tax Mode</p>
                <div className="w-1/5">
                  <Select
                    allowClear
                    onClear={() => {
                      setTaxPol("");
                      dispatch({ type: "taxTable", payload: false });
                    }}
                    value={taxpol}
                    onSelect={(val: string) => setTaxPol(val)}
                    size="small"
                    placeholder="Select an existing tax policy"
                    options={["Nigeria", "Canada"].map((item) => ({
                      label: <span>{item} tax policy</span>,
                      value: item,
                    }))}
                    className="w-full"
                  />
                </div>
                {taxpol ? (
                  <h5
                    onClick={() =>
                      dispatch({ type: "taxTable", payload: true })
                    }
                    className="text-caramel text-xs underline pt-3 cursor-pointer"
                  >
                    View Tax Table
                  </h5>
                ) : (
                  <span
                    className="text-caramel text-xs underline cursor-pointer"
                    onClick={() => {
                      setTaxCreate(true);
                      setTaxPol("");
                    }}
                  >
                    Creat Tax Policy
                  </span>
                )}
              </div>
              {taxCreate && !taxTable && (
                <TaxPolicyCreator
                  dependencies={ALLOWANNCES.map((item) => item.identifier)}
                />
              )}

              {/* tax table */}
              {!!taxpol && taxTable && (
                <div className="bg-card px-2 py-3 mt-3 rounded font-medium">
                  <div className="flex justify-end">
                    <i
                      onClick={() =>
                        dispatch({ type: "taxTable", payload: false })
                      }
                      className="ri-close-fill cursor-pointer text-lg  pb-3 font-semibold"
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex item-center text-xs justify-between gap-2 mb-4">
                      <span className="text-sm capitalize">
                        {taxpol} tax policy
                      </span>
                      <span className="text-caramel underline cursor-pointer">
                        Edit Tax Policy
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
              )}

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
      </div>
    </div>
  );
};

const OvertimeSetting: React.FC<{ close: () => void }> = ({ close }) => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center text-sm">
            <Checkbox id="hour-wise" />
            <label
              htmlFor="hour-wise"
              className="cursor-pointer hover:text-caramel"
            >
              Hour-wise Calculation
            </label>
          </div>

          <div>
            <label className="text-xs">
              Minimum (daily) Hours Eligible for OT
            </label>
            <input
              type="number"
              placeholder="0"
              className={`${inputStyle} mt-1`}
            />
          </div>
          <div>
            <label className="text-xs">Minimum OT Hours Required</label>
            <input
              type="number"
              placeholder="0"
              className={`${inputStyle} mt-1`}
            />
          </div>

          <div>
            <label className="text-xs">Apply Extra OT</label>
            <select className={`${inputStyle} mt-1`}>
              <option value="">select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label className="text-xs">OT Paid On </label>
            <select className={`${inputStyle} mt-1`}>
              <option value="">select</option>
              <option value="yes">Gross Salary</option>
              <option value="no">Net Pay</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center text-sm">
            <Checkbox id="day-wise" />
            <label
              htmlFor="day-wise"
              className="cursor-pointer hover:text-caramel"
            >
              Day-wise Calculation
            </label>
          </div>

          <div>
            <label className="text-xs">
              Minimum (daily) Hours Eligible for OT
            </label>
            <input
              type="number"
              placeholder="0"
              className={`${inputStyle} mt-1`}
            />
          </div>
          <div>
            <label className="text-xs">Maximum OT Hours Payable</label>
            <input
              type="number"
              placeholder="0"
              className={`${inputStyle} mt-1`}
            />
          </div>
          <div>
            <label className="text-xs">Payment Percent</label>
            <input
              type="number"
              placeholder="0%"
              className={`${inputStyle} mt-1`}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mb-3 mt-5">
        <button onClick={close} type="button" className="transparentButton">
          cancel
        </button>
        <button type="submit" className="button">
          save
        </button>
      </div>
    </div>
  );
};
