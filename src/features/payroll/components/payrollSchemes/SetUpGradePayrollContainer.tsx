import PageSubHeader from "components/layout/PageSubHeader";
import { Button, Checkbox, Form, InputNumber, Select, Switch } from "antd";
import { useReducer, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { FormWorkflowInput } from "features/core/workflows/components/FormWorkflowInput";
import { SalaryComponentsContainer } from "../salaryComponents/SalaryComponentsContainer";
import { AddSalaryComponentForm } from "../salaryComponents/AddSalaryComponent";
import { ALLOWANNCES } from "features/payroll/constants";
import { TaxPolicyCreator } from "../taxPolicies";
import { useQueryClient } from "react-query";
import { useSetupPayrollScheme } from "features/payroll/hooks/scheme/useSetupPayrollScheme";
import { openNotification } from "utils/notifications";
import { QUERY_KEY_FOR_PAYROLL_SCHEME_BY_TYPE_OR_ID } from "features/payroll/hooks/scheme/useGetPayrollSchemeByTypeOrId";
import { TSetupPayrollSchemeData } from "features/payroll/types/setUpSchemeInputData";
import { TOfficeSetupSchemeInputData } from "features/payroll/types/setUpSchemeInputData/office";
import { TSalaryComponent } from "features/payroll/types/salaryComponents";

const boxStyle = "px-4 py-3 shadow rounded-md bg-mainBg";
const boxTitle = "font-medium text-base pb-1";
const inputStyle =
  "w-full rounded-md border border-gray-300 py-2 px-2 text-sm bg-mainBg focus:outline-none";
const taxTableWrap =
  "flex item-center text-xs justify-between gap-2 border-b border-slate-400 pb-1";
const initialState: TActionState = {
  allowDisbursement: false,

  allowApproval: false,

  issuePayslip: false,
  runAutomatically: false,
  displayAllowances: false,
  displayDeductions: false,
  display13thMonth: false,
  displayLeaveAllowance: false,
  displayNIF: false,
  displayNSITF: false,
  displayITF: false,
  displayPension: false,
  displayOvertime: false,
  displayTax: false,
  allowances: [],
  deductions: [],
};

interface TActionState {
  allowDisbursement: boolean;
  allowApproval: boolean;
  issuePayslip: boolean;
  runAutomatically: boolean;
  displayAllowances: boolean;
  displayDeductions: boolean;
  display13thMonth: boolean;
  displayLeaveAllowance: boolean;
  displayNIF: boolean;
  displayNSITF: boolean;
  displayITF: boolean;
  displayPension: boolean;
  displayOvertime: boolean;
  displayTax: boolean;
  allowances: TSalaryComponent[];
  deductions: TSalaryComponent[];
}

type TActionType =
  | "allowDisbursement"
  | "allowApproval"
  | "issuePayslip"
  | "runAutomatically"
  | "displayAllowances"
  | "displayDeductions"
  | "display13thMonth"
  | "displayLeaveAllowance"
  | "displayNIF"
  | "displayNSITF"
  | "displayITF"
  | "displayPension"
  | "displayOvertime"
  | "displayTax";

type TAllowanceActionType = "setAllowance";
type TDeducutionActionType = "setDeduction";

function reducer(
  state: TActionState,
  action:
    | { type: TActionType }
    | {
        type: TAllowanceActionType;
        allowances: TSalaryComponent[];
      }
    | {
        type: TDeducutionActionType;
        deductions: TSalaryComponent[];
      }
): TActionState {
  switch (action.type) {
    case "setDeduction":
      return {
        ...state,
        deductions: action.deductions,
      };
    case "setAllowance":
      return {
        ...state,
        allowances: action.allowances,
      };
    case "allowDisbursement":
      return {
        ...state,
        allowDisbursement: !state.allowDisbursement,
      };
    case "allowApproval":
      return {
        ...state,
        allowApproval: !state.allowApproval,
      };
    case "issuePayslip":
      return {
        ...state,
        issuePayslip: !state.issuePayslip,
      };
    case "runAutomatically":
      return {
        ...state,
        runAutomatically: !state.runAutomatically,
      };
    case "displayAllowances":
      return {
        ...state,
        displayAllowances: !state.displayAllowances,
      };
    case "displayDeductions":
      return {
        ...state,
        displayDeductions: !state.displayDeductions,
      };
    case "display13thMonth":
      return {
        ...state,
        display13thMonth: !state.display13thMonth,
      };
    case "displayLeaveAllowance":
      return {
        ...state,
        displayLeaveAllowance: !state.displayLeaveAllowance,
      };

    case "displayTax":
      return {
        ...state,
        displayTax: !state.displayTax,
      };
    case "displayOvertime":
      return {
        ...state,
        displayOvertime: !state.displayOvertime,
      };
    case "displayPension":
      return {
        ...state,
        displayPension: !state.displayPension,
      };
    case "displayITF":
      return {
        ...state,
        displayITF: !state.displayITF,
      };
    case "displayNSITF":
      return {
        ...state,
        displayNSITF: !state.displayNSITF,
      };
    case "displayNIF":
      return {
        ...state,
        displayNIF: !state.displayNIF,
      };
    default:
      return state;
  }
}
export const SetUpGradePayrollContainer = () => {
  return (
    <>
      <SetUpForm />
    </>
  );
};

const SetUpForm = () => {
  const [taxpol, setTaxPol] = useState("");
  const [taxCreate, setTaxCreate] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    allowApproval,
    allowDisbursement,
    runAutomatically,
    issuePayslip,
    displayAllowances,
    displayDeductions,
    display13thMonth,
    displayLeaveAllowance,
    displayNIF,
    displayNSITF,
    displayITF,
    displayPension,
    displayOvertime,
    displayTax,
    allowances,
    deductions,
  } = state;
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useSetupPayrollScheme();

  const handleSubmit = (data: TOfficeSetupSchemeInputData) => {
    console.log(data, ";;");
    mutate(
      {
        allowances: [],
        deductions: [],
        allowApproval,
        allowDisbursement,
        automaticRunDay: data.automaticRunDay,
        frequency: "monthly",
        issuePayslip,
        name: "Office Payroll Scheme",

        runAutomatically,
        type: "office",
        disbursement: data.disbursement,
        workflowId: data.workflowId,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            duration: 2,
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });
          form.resetFields();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_PAYROLL_SCHEME_BY_TYPE_OR_ID],
            // exact: true,
          });
        },
      }
    );
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <div className="flex flex-col gap-4">
        <PageSubHeader
          hideBackground
          description={`Set up payroll based on the pay grades assigned to employees`}
          actions={[
            {
              name: "Save Changes",
              loading: isLoading,
              handleClick: () => {
                form.submit();
              },
              btnVariant: "default",
            },
          ]}
        />
        <div className="bg-card px-5 py-7  rounded-md mt-7 grid grid-cols-1 md:grid-cols-1 gap-5 text-accent">
          {/* first row */}
          <div className="flex flex-col gap-4">
            <div className={boxStyle}>
              <h5 className={boxTitle}>Payroll Scheme Type</h5>
              <input
                className={inputStyle}
                value="Office Payroll Scheme"
                disabled
              />
            </div>

            <div className={boxStyle}>
              <h5 className={boxTitle}>Payroll Frequency</h5>

              <input className={inputStyle} value="Monthly" disabled />
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
                  checked={allowDisbursement}
                  onChange={() => dispatch({ type: "allowDisbursement" })}
                />
              </div>
              <p className="text-sm">
                Do you want to disburse payment after approval/confirmation?
              </p>
              {allowDisbursement && (
                <div className="mt-2">
                  {/* <label className="text-sm">
                What day would you like to disburse payment
              </label> */}
                  <div className="flex items-center lg:justify-between">
                    <div className="w-2/5">
                      <Form.Item noStyle name="disbursement">
                        <input
                          className={inputStyle}
                          type="number"
                          min={20}
                          max={28}
                          placeholder="What day would you like to disburse payment"
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className={boxStyle}>
              <div className="flex items-center justify-between">
                <h5
                  className={boxTitle}
                  title="Manage all of the postive finiacial benefits that make up employees' pay"
                >
                  Allowances
                </h5>
                <Switch
                  checked={displayAllowances}
                  onChange={() => dispatch({ type: "displayAllowances" })}
                />
              </div>
              <p className="text-sm">
                Manage all of the postive finiacial benefits that make up
                employees' pay
              </p>
              {displayAllowances && (
                <div className="mt-2">
                  <SalaryComponentsContainer components={allowances} />
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
                <Switch
                  checked={displayDeductions}
                  onChange={() => dispatch({ type: "displayDeductions" })}
                />
              </div>
              <p className="text-sm">
                Manage all of the negative finiacial benefits that make up
                employees' pay
              </p>
              {displayDeductions && (
                <div className="mt-2">
                  <SalaryComponentsContainer components={deductions} />
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
                  checked={allowApproval}
                  onChange={() => dispatch({ type: "allowApproval" })}
                />
              </div>
              <p className="text-sm">
                Do you want to add an approval process to payroll before
                confirmation/disbursement?
              </p>
              {allowApproval && (
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
                  checked={issuePayslip}
                  onChange={() => dispatch({ type: "issuePayslip" })}
                />
              </div>
              <p className="text-sm">
                Do you want to issue payslip, when payroll is
                approved/disbursed?
              </p>
            </div>

            <div className={`${boxStyle} text-sm`}>
              <div className="flex items-center justify-between">
                <h5 className={boxTitle}>13th Month Salary</h5>{" "}
                <Switch
                  checked={display13thMonth}
                  onChange={() => dispatch({ type: "display13thMonth" })}
                />
              </div>
              <p className="text-sm">
                This allows you to add a percentage of the employees' salary as
                a 13th month bonus to be paid at the end of the year.
              </p>

              {display13thMonth && (
                <div>
                  <div className="grid grid-cols-1 lg:grid-cols-1 gap-5 mt-5">
                    {/* <div>
                  <label htmlFor="payment">Month of Payment</label>
                  <select name="" id="" className={inputStyle}>
                    <option value="">Select</option>
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div> */}
                    <div>
                      {/* <label htmlFor="salary">Percentage of salary</label>
                  <input type="text" placeholder="0%" className={inputStyle} /> */}
                      <AddSalaryComponentForm
                        handleSave={() => {}}
                        dependencies={ALLOWANNCES.map(
                          (item) => item.identifier
                        )}
                        monthsApplicable={{ mode: "single" }}
                        componentName="thirteenth_month_salary" //make this a constant so its not a magic variable
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* second */}
          <div className="flex flex-col gap-4">
            <div className={boxStyle}>
              <div className="flex items-center justify-between">
                <h5 className={boxTitle}>Tax</h5>
                <Switch
                  checked={displayTax}
                  onChange={() => dispatch({ type: "displayTax" })}
                />
              </div>
              <p className="text-sm">
                This allows you to create an Tax component
              </p>

              {displayTax && (
                <div className="mt-6">
                  <AddSalaryComponentForm
                    handleSave={() => {}}
                    dependencies={ALLOWANNCES.map((item) => item.identifier)}
                    componentName="nif" //make this a constant so its not a magic variable
                  />
                </div>
              )}
            </div>
            <div className={boxStyle}>
              <div className="flex items-center justify-between">
                <h5 className={boxTitle}>Overtime</h5>
                <Switch
                  checked={displayOvertime}
                  onChange={() => dispatch({ type: "displayOvertime" })}
                />
              </div>
              <p className="text-sm">
                This allows you to create an Overtime component
              </p>

              {displayOvertime && (
                <div className="mt-6">
                  <AddSalaryComponentForm
                    handleSave={() => {}}
                    dependencies={ALLOWANNCES.map((item) => item.identifier)}
                    componentName="nif" //make this a constant so its not a magic variable
                  />
                </div>
              )}
            </div>
            <div className={boxStyle}>
              <div className="flex items-center justify-between">
                <h5 className={boxTitle}>Pension</h5>
                <Switch
                  checked={displayPension}
                  onChange={() => dispatch({ type: "displayPension" })}
                />
              </div>
              <p className="text-sm">
                This allows you to create an Pension component
              </p>

              {displayPension && (
                <div className="mt-6">
                  <AddSalaryComponentForm
                    handleSave={() => {}}
                    dependencies={ALLOWANNCES.map((item) => item.identifier)}
                    componentName="nif" //make this a constant so its not a magic variable
                  />
                </div>
              )}
            </div>
            <div className={boxStyle}>
              <div className="flex items-center justify-between">
                <h5 className={boxTitle}>ITF</h5>
                <Switch
                  checked={displayITF}
                  onChange={() => dispatch({ type: "displayITF" })}
                />
              </div>
              <p className="text-sm">
                This allows you to create an ITF component
              </p>

              {displayITF && (
                <div className="mt-6">
                  <AddSalaryComponentForm
                    handleSave={() => {}}
                    dependencies={ALLOWANNCES.map((item) => item.identifier)}
                    componentName="nif" //make this a constant so its not a magic variable
                  />
                </div>
              )}
            </div>
            <div className={boxStyle}>
              <div className="flex items-center justify-between">
                <h5 className={boxTitle}>NSITF</h5>
                <Switch
                  checked={displayNSITF}
                  onChange={() => dispatch({ type: "displayNSITF" })}
                />
              </div>
              <p className="text-sm">
                This allows you to create an NSITF component
              </p>

              {displayNSITF && (
                <div className="mt-6">
                  <AddSalaryComponentForm
                    handleSave={() => {}}
                    dependencies={ALLOWANNCES.map((item) => item.identifier)}
                    componentName="nif" //make this a constant so its not a magic variable
                  />
                </div>
              )}
            </div>
            <div className={boxStyle}>
              <div className="flex items-center justify-between">
                <h5 className={boxTitle}>NIF</h5>
                <Switch
                  checked={displayNIF}
                  onChange={() => dispatch({ type: "displayNIF" })}
                />
              </div>
              <p className="text-sm">
                This allows you to create an NIF component
              </p>

              {displayNIF && (
                <div className="mt-6">
                  <AddSalaryComponentForm
                    handleSave={() => {}}
                    dependencies={ALLOWANNCES.map((item) => item.identifier)}
                    componentName="nif" //make this a constant so its not a magic variable
                  />
                </div>
              )}
            </div>
            <div className={boxStyle}>
              <div className="flex items-center justify-between">
                <h5 className={boxTitle}>Leave allowance</h5>
                <Switch
                  checked={displayLeaveAllowance}
                  onChange={() => dispatch({ type: "displayLeaveAllowance" })}
                />
              </div>
              <p className="text-sm">
                This allows you add a percentage of your employees salary as
                leave allowance to be paid when an employee goes on leave
              </p>

              {displayLeaveAllowance && (
                <div className="mt-6">
                  <AddSalaryComponentForm
                    handleSave={() => {}}
                    dependencies={ALLOWANNCES.map((item) => item.identifier)}
                    componentName="leave_allowance" //make this a constant so its not a magic variable
                  />
                </div>
              )}
            </div>

            <div className={boxStyle}>
              <div className="flex items-center justify-between">
                <h5 className={boxTitle}>TAX</h5>{" "}
                <Switch
                  checked={displayTax}
                  onChange={() => dispatch({ type: "displayTax" })}
                />
              </div>

              {displayTax && (
                <div className="text-sm mt-3">
                  <div className="flex flex-col gap-1">
                    <p className="">Select Tax Mode</p>
                    <div className="w-1/5">
                      <Select
                        allowClear
                        onClear={() => {
                          setTaxPol("");
                          dispatch({ type: "displayTax" });
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
                        onClick={() => dispatch({ type: "displayTax" })}
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
                  {taxCreate && !displayTax && (
                    <TaxPolicyCreator
                      dependencies={ALLOWANNCES.map((item) => item.identifier)}
                    />
                  )}

                  {/* tax table */}
                  {!!taxpol && displayTax && (
                    <div className="bg-card px-2 py-3 mt-3 rounded font-medium">
                      <div className="flex justify-end">
                        <i
                          onClick={() => dispatch({ type: "displayTax" })}
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
                  {!!taxpol && displayTax && (
                    <div className="bg-card px-2 py-3 mt-3 rounded font-medium">
                      <div className="flex justify-end">
                        <i
                          onClick={() => dispatch({ type: "displayTax" })}
                          className="ri-close-fill cursor-pointer text-lg  pb-3 font-semibold"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center mt-5 pb-2">
                    <button
                      onClick={() => dispatch({ type: "displayTax" })}
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
                <h5 className={boxTitle}>Run Payroll automatically</h5>
                <Switch
                  checked={runAutomatically}
                  onChange={() => dispatch({ type: "runAutomatically" })}
                />
              </div>
              <p className="text-sm">
                This will enable payroll to be run automatically every month
                with the scheme's default settings
              </p>
              {runAutomatically && (
                <div className="mt-6">
                  <InputNumber
                    placeholder="Select the day of execution in month"
                    min={1}
                    max={28}
                    className="w-2/5"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Form>
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
