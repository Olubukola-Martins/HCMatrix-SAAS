import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DatePicker, Form, Input, Modal, Select, Typography } from "antd";
import { IModalProps } from "types";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { AppButton } from "components/button/AppButton";
import { FileUpload } from "components/FileUpload";
import { EmployeePayrollUpdatesContainer } from "../employeePayrollUpdates/EmployeePayrollUpdatesContainer";
import { ExchangeRateContainer } from "../exchangeRates/ExchangeRateContainer";
import { SalaryComponentsContainer } from "../salaryComponents/SalaryComponentsContainer";
import { TPayrollSchemeType } from "features/payroll/types/payrollSchemes";
interface IFormProps extends IModalProps {
  type?: TPayrollSchemeType;

  handleSave: (props: {
    name: string;
    description: string;
    month: string;
  }) => void;
}
export const UploadTimesheet: React.FC<IModalProps> = ({
  open,
  handleClose,
}) => {
  const handleSubmit = (data: any) => {
    handleClose();
  };
  return (
    <Modal
      open={open}
      footer={null}
      title={"Upload Timesheet"}
      style={{ top: 20 }}
      onCancel={() => handleClose()}
    >
      <div className="border border-dotted border-slate-500 rounded flex flex-col items-center gap-2 py-3 px-2">
        <p>Select file to be Imported</p>
        <Typography.Text title="Please Download template and populate">
          <span className="text-sm pt-1 font-medium cursor-pointer hover:text-caramel underline">
            Download template
          </span>
        </Typography.Text>

        <div className="flex justify-center w-3/5">
          <FileUpload
            allowedFileTypes={[
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            ]}
            fileKey="documentUrl"
            textToDisplay="Upload File"
            displayType="dotted-box"
          />
        </div>
      </div>
    </Modal>
  );
};
export const CreatePayrollInitialForm: React.FC<IFormProps> = ({
  open,
  handleClose,
  handleSave,
  type,
}) => {
  const handleSubmit = (data: any) => {
    handleSave({
      name: data.name,
      month: data?.month ? data?.month.format("YYYY-MM") : "",
      description: data.description,
    });
    handleClose();
  };
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      footer={null}
      title={"Enter Payroll Details"}
      style={{ top: 20 }}
      closable={false}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item
          rules={textInputValidationRules}
          name="name"
          label="Payroll Name"
        >
          <Input placeholder="Payroll Name" />
        </Form.Item>
        {type !== "wages" && (
          <Form.Item name="month" label="Month">
            <DatePicker
              picker={"month"}
              className="w-full"
              placeholder="Payroll Month"
            />
          </Form.Item>
        )}
        <Form.Item
          rules={textInputValidationRules}
          name="description"
          label="Description"
        >
          <Input.TextArea placeholder="Description" />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" />
        </div>
      </Form>
    </Modal>
  );
};

const CreatePayrollContainer: React.FC<{ type: TPayrollSchemeType }> = ({
  type,
}) => {
  const boxStyle =
    "bg-mainBg flex justify-between items-start md:items-center px-6 py-5 rounded lg:flex-row flex-col gap-y-5";

  const buttonStyle =
    "border border-gray-400 hover:text-caramel rounded px-5 py-1 font-medium text-sm text-accent";
  const [open, setOpen] = useState(true);
  const [openT, setOpenT] = useState(false);
  const [payrollD, setPayrollD] = useState({
    name: "",
    month: "",
    description: "",
  });
  type TType = "daily" | "monthly";
  const [fType, setFType] = useState<TType>("monthly");
  return (
    <>
      <UploadTimesheet open={openT} handleClose={() => setOpenT(false)} />
      <CreatePayrollInitialForm
        open={open}
        handleSave={(props) => setPayrollD({ ...props })}
        handleClose={() => setOpen(false)}
        type={type}
      />

      <div className="text-accent">
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
              value={payrollD.name}
              className="border text-accent rounded px-3 py-1 border-gray-400 bg-mainBg"
              placeholder="Payroll Name"
            />
          </div>
          {type !== "wages" && (
            <div className={boxStyle}>
              <div>
                <h5 className="font-medium text-base pb-1">Payroll Month</h5>
                <p className="md:text-sm text-xs">
                  Choose the month of the year you wish to run this payroll for.
                </p>
              </div>
              <input
                type="month"
                value={payrollD.month}
                className="border text-accent rounded px-3 py-1 border-gray-400 bg-mainBg"
              />
            </div>
          )}
          {type === "wages" && (
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
                      value={fType}
                      options={["daily", "monthly"].map((item) => ({
                        label: item,
                        value: item,
                      }))}
                      onSelect={(val: TType) => setFType(val)}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  {fType === "daily" && (
                    <input
                      type="date"
                      placeholder="Select day"
                      className="border text-accent rounded px-3 py-1 border-gray-400 bg-mainBg"
                    />
                  )}
                  {fType === "monthly" && (
                    <input
                      type="month"
                      placeholder="Select month"
                      className="border text-accent rounded px-3 py-1 border-gray-400 bg-mainBg"
                    />
                  )}
                </div>
              </div>
            </div>
          )}
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
                <Input.TextArea value={payrollD.description} />
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

          {type === "wages" && (
            <div className={boxStyle}>
              <div className="flex justify-between w-full">
                <div>
                  <h5 className="font-medium text-base pb-1">
                    Add Employees' Timesheet
                  </h5>
                  <p className="md:text-sm text-xs">
                    Upload the time sheet that will be used to calculate the
                    amount to be paid to each employee based on the hours
                    worked. <br />
                    Developer Note: This timesheet will typically be produced
                    from the time & attendance module
                  </p>
                </div>
                <div>
                  <button
                    className={buttonStyle}
                    onClick={() => setOpenT(true)}
                  >
                    Upload Timesheet
                  </button>
                </div>
              </div>
            </div>
          )}
          {type !== "wages" && (
            <div className={boxStyle}>
              <div className="flex justify-between w-full">
                <div>
                  <h5 className="font-medium text-base pb-1">
                    Add Overtime Timesheet
                  </h5>
                  <p className="md:text-sm text-xs">
                    Upload the overtime sheet that will be used to add overtime
                    pay to employee.
                  </p>
                </div>
                <div>
                  <button
                    className={buttonStyle}
                    onClick={() => setOpenT(true)}
                  >
                    Upload Timesheet
                  </button>
                </div>
              </div>
            </div>
          )}

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

export default CreatePayrollContainer;
