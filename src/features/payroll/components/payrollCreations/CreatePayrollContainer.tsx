import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Skeleton,
  Typography,
} from "antd";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { AppButton } from "components/button/AppButton";
import { FileUpload } from "components/FileUpload";
import { EmployeePayrollUpdatesContainer } from "../employeePayrollUpdates/EmployeePayrollUpdatesContainer";
import { ExchangeRateContainer } from "../exchangeRates/ExchangeRateContainer";
import { SalaryComponentsContainer } from "../salaryComponents/SalaryComponentsContainer";
import { TPayrollSchemeType } from "features/payroll/types/payrollSchemes";
import { appRoutes } from "config/router/paths";
import { FormCostCentreInput } from "../costCentres/FormCostCentreInput";
import { useCreatePayroll } from "features/payroll/hooks/payroll/useCreatePayroll";
import { useGetPayrollSchemeByTypeOrId } from "features/payroll/hooks/scheme/useGetPayrollSchemeByTypeOrId";
import { TSalaryComponent } from "features/payroll/types/salaryComponents";
import { openNotification } from "utils/notifications";
import { useGetSinglePayroll } from "features/payroll/hooks/payroll/useGetSinglePayroll";
import moment from "moment";
import { EmployeeTimesheet } from "./EmployeeTimesheet";

type TPayrollFrequency = "monthly" | "daily" | "none";
type TIntialPayrollDetails = {
  name: string;
  description: string;
  date: string;
  frequency: TPayrollFrequency;
  costCentre: string;
  payrollId?: number;
};
interface IFormProps extends IModalProps {
  type?: TPayrollSchemeType;

  handleSave: (props: TIntialPayrollDetails) => void;
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
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [payrollFrequency, setPayrollFrequency] =
    useState<TPayrollFrequency>("none");
  const [costCentre, setCostCentre] = useState("");
  const { mutate, isLoading } = useCreatePayroll();
  const handleSubmit = (data: any) => {
    if (type === "project" || type === "wages") {
      handleSave({
        name: data.name,
        date:
          payrollFrequency === "monthly"
            ? data?.date.format("YYYY-MM")
            : data?.date.format("YYYY-MM-DD"),
        description: data.description,
        frequency: payrollFrequency,
        costCentre: costCentre,
      });
      handleClose();
      return;
    }
    if (type) {
      mutate(
        {
          data: {
            costCentreId: data.costCentreId,
            date:
              payrollFrequency === "monthly"
                ? `${data.date?.format("YYYY-MM")}-01`
                : data.date?.format("YYYY-MM-DD"),
            description: data.description,
            frequency: payrollFrequency,
            name: data.name,
          },
          schemeType: type,
        },
        {
          onError: (err: any) => {
            openNotification({
              state: "error",
              title: "Error Occurred",
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
            handleSave({
              name: data.name,
              date:
                payrollFrequency === "monthly"
                  ? data?.date.format("YYYY-MM")
                  : data?.date.format("YYYY-MM-DD"),
              description: data.description,
              frequency: payrollFrequency,
              costCentre: costCentre,
              payrollId: res.data.data.id,
            });
            handleClose();
          },
        }
      );
    }
  };

  return (
    <Modal
      open={open}
      footer={null}
      title={"Enter Payroll Details"}
      style={{ top: 10 }}
      onCancel={() => navigate(appRoutes.payrollHome)}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        {type === "project" && (
          <Form.Item
            name="project"
            label="Select Project"
            dependencies={["frequency"]}
          >
            <Select
              placeholder="Select project"
              getPopupContainer={(triggerNode) => triggerNode.parentElement}
              options={Array(4)
                .fill("Project")
                .map((item, i) => ({
                  label: item + `${i + 1}`,
                  value: item,
                }))}
            />
          </Form.Item>
        )}
        {type === "project" && (
          <Form.Item
            name="project"
            label="Select Payment"
            dependencies={["frequency"]}
          >
            <Select
              getPopupContainer={(triggerNode) => triggerNode.parentElement}
              placeholder="Select payment"
              options={Array(4)
                .fill("Payment 1(09/12/23)")
                .map((item) => ({
                  label: item,
                  value: item,
                }))}
            />
          </Form.Item>
        )}
        <Form.Item
          rules={textInputValidationRules}
          name="name"
          label="Payroll Name"
        >
          <Input placeholder="Payroll Name" />
        </Form.Item>
        {type === "wages" && (
          <Form.Item
            rules={generalValidationRules}
            name="frequency"
            label="Payroll Frequency"
          >
            <Select
              getPopupContainer={(triggerNode) => triggerNode.parentElement}
              onSelect={(val: TPayrollFrequency) => setPayrollFrequency(val)}
              placeholder="Payroll Frequency"
              options={[
                { label: "Monthly", value: "monthly" },
                { label: "Daily", value: "daily" },
              ]}
            />
          </Form.Item>
        )}
        {type === "wages" && (
          <Form.Item
            rules={generalValidationRules}
            name="frequency"
            label="Upload Employees' Timesheet"
          >
            <div className={`px-3 py-2 shadow rounded-sm bg-mainBg`}>
              <FileUpload
                allowedFileTypes={[
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                ]}
                fileKey="documentUrl"
                textToDisplay="Upload file"
                displayType="form-space-between"
              />
            </div>
          </Form.Item>
        )}
        <FormCostCentreInput
          Form={Form}
          control={{ name: "costCentreId", label: "Cost Centre" }}
          onSelect={(_, data) => setCostCentre(data.name)}
        />
        {payrollFrequency === "daily" && (
          <Form.Item name="date" label="Date" dependencies={["frequency"]}>
            <DatePicker className="w-full" placeholder="Date" />
          </Form.Item>
        )}
        {payrollFrequency === "monthly" && (
          <Form.Item name="date" label="Date" dependencies={["frequency"]}>
            <DatePicker picker="month" className="w-full" placeholder="Date" />
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
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};

const CreatePayrollContainer: React.FC<{
  type: TPayrollSchemeType;
  payrollId?: number;
}> = ({ type, payrollId }) => {
  const boxStyle =
    "bg-mainBg flex justify-between items-start md:items-center px-6 py-5 rounded lg:flex-row flex-col gap-y-5";

  const buttonStyle =
    "border border-gray-400 hover:text-caramel rounded px-5 py-1 font-medium text-sm text-accent";
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (payrollId) {
      setPayrollD((item) => ({ ...item, payrollId }));

      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [payrollId]);
  const [openT, setOpenT] = useState(false);
  const [payrollD, setPayrollD] = useState<TIntialPayrollDetails>({
    name: "",
    date: "",
    description: "",
    frequency: "monthly",
    costCentre: "",
  });
  const { data: payrollScheme, isLoading: isSchemeLoading } =
    useGetPayrollSchemeByTypeOrId({
      typeOrId: type,
    });
  const { data: payroll, isLoading: isPayrollLoading } = useGetSinglePayroll({
    id: payrollD.payrollId,
  });
  const allowances: TSalaryComponent[] =
    !Array.isArray(payrollScheme) && payrollScheme?.salaryComponents
      ? payrollScheme?.salaryComponents.filter(
          (item) => item.type === "allowance"
        )
      : [];
  const deductions: TSalaryComponent[] =
    !Array.isArray(payrollScheme) && payrollScheme?.salaryComponents
      ? payrollScheme?.salaryComponents.filter(
          (item) => item.type === "deduction"
        )
      : [];

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
          {payroll?.status === "draft" && (
            <button className="neutralButton">Run Payroll</button>
          )}
          {payroll?.status === "in-review" && (
            <button className="button">RollBack</button>
          )}
          {payroll?.status === "confirmed" && (
            <button className="border border-red-400 hover:text-caramel rounded px-2 py-1 font-medium text-sm text-neutral">
              Delete
            </button>
          )}
        </div>

        <Skeleton loading={isPayrollLoading} active paragraph={{ rows: 20 }}>
          <div className="bg-card px-5 py-7 rounded-md mt-7 flex flex-col gap-4">
            <div className={boxStyle}>
              <div>
                <h5 className="font-medium text-base pb-1">Payroll Name</h5>
                <p className="md:text-sm text-xs">
                  The name you which to describe the payroll with.
                </p>
              </div>
              <input
                disabled
                type="text"
                value={payroll?.name}
                className="bg-slate-100 cursor-not-allowed  border text-accent rounded px-3 py-1 border-gray-400 bg-mainBg"
                placeholder="Payroll Name"
              />
            </div>
            <div className={boxStyle}>
              <div className="w-full">
                <div className="flex justify-between">
                  <div>
                    <h5 className="font-medium text-base pb-1">
                      Payroll Frequency and Date
                    </h5>
                    <p className="md:text-sm text-xs">
                      The month or day of the year you wish to run this payroll
                      for.
                    </p>
                  </div>
                  <div>
                    <input
                      disabled
                      value={payroll?.frequency}
                      className="capitalize bg-slate-100 cursor-not-allowed border text-accent rounded px-3 py-1 border-gray-400 bg-mainBg"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  {payroll?.frequency === "daily" && (
                    <input
                      disabled
                      value={moment(payroll?.date).format("YYYY-MM-DD")}
                      type="date"
                      placeholder="Select day"
                      className=" bg-slate-100 cursor-not-allowed border text-accent rounded px-3 py-1 border-gray-400 bg-mainBg"
                    />
                  )}
                  {payroll?.frequency === "monthly" && (
                    <input
                      disabled
                      value={moment(payroll?.date).format("YYYY-MM")}
                      type="month"
                      placeholder="Select month"
                      className=" bg-slate-100 cursor-not-allowed border text-accent rounded px-3 py-1 border-gray-400 bg-mainBg"
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
                  <Input.TextArea disabled value={payroll?.description} />
                </div>
              </div>
            </div>
            <div className={boxStyle}>
              <div className="w-full">
                <div className="flex justify-between">
                  <div>
                    <h5 className="font-medium text-base pb-1">Cost Centre</h5>
                    <p className="md:text-sm text-xs">
                      The Cost Centre from wish payment will be made from
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Input value={payroll?.costCentre.name} disabled />
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
                      Set the foreign currency exchange rate that will be used
                      for expatriates
                    </p>
                  </div>
                  <div>
                    <button className={buttonStyle}>View rates</button>
                  </div>
                </div>
                <div className="mt-4">
                  <ExchangeRateContainer onlyView />
                </div>
              </div>
            </div>
            {type === "wages" && (
              <div className={boxStyle}>
                <div className="w-full">
                  <div className="flex justify-between w-full">
                    <div>
                      <h5 className="font-medium text-base pb-1">
                        Employees' Timesheet
                      </h5>
                      <p className="md:text-sm text-xs">
                        Time sheet that will be used to calculate the amount to
                        be paid to each employee based on the hours worked.{" "}
                        <br />
                        Developer Note: This timesheet will typically be
                        produced from the time & attendance module
                      </p>
                    </div>
                    <div>
                      <button
                        className={buttonStyle}
                        onClick={() => setOpenT(true)}
                      >
                        View Timesheet
                      </button>
                    </div>
                  </div>
                  <div className="mt-4">
                    {payrollD.frequency !== "none" && (
                      <EmployeeTimesheet type={payrollD.frequency} />
                    )}
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
                      Upload the overtime sheet that will be used to add
                      overtime pay to employee.
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
                      The allowances that will be applied generally to employees
                    </p>
                  </div>
                  <div>
                    <button className={buttonStyle}>View Allowances</button>
                  </div>
                </div>
                <div className="mt-4">
                  <SalaryComponentsContainer
                    showControlBtns={false}
                    components={allowances}
                    loading={isSchemeLoading}
                  />
                </div>
              </div>
            </div>
            <div className={boxStyle}>
              <div className="w-full">
                <div className="flex justify-between">
                  <div>
                    <h5 className="font-medium text-base pb-1">Deductions</h5>
                    <p className="md:text-sm text-xs">
                      The deductions that will be applied generally to employees
                    </p>
                  </div>
                  <div>
                    <button className={buttonStyle}>View Deductions</button>
                  </div>
                </div>
                <div className="mt-4">
                  <SalaryComponentsContainer
                    showControlBtns={false}
                    components={deductions}
                    loading={isSchemeLoading}
                  />
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
                  <EmployeePayrollUpdatesContainer
                    expatriate={false}
                    employees={payroll?.employeePayrolls.filter(
                      (item) => item.eligibility === "citizen"
                    )}
                    generalSalaryComponents={[...allowances, ...deductions]}
                    payrollId={payroll?.id}
                  />
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
                  <EmployeePayrollUpdatesContainer
                    expatriate={true}
                    employees={payroll?.employeePayrolls.filter(
                      (item) => item.eligibility === "expatriate"
                    )}
                    generalSalaryComponents={[...allowances, ...deductions]}
                    payrollId={payroll?.id}
                  />
                </div>
              </div>
            </div>
          </div>
        </Skeleton>
      </div>
    </>
  );
};

export default CreatePayrollContainer;
