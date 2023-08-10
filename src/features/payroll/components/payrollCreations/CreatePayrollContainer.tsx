import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Skeleton,
  Tag,
  Typography,
  message,
} from "antd";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { AppButton } from "components/button/AppButton";
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
import {
  QUERY_KEY_FOR_SINGLE_PAYROLL,
  useGetSinglePayroll,
} from "features/payroll/hooks/payroll/useGetSinglePayroll";
import moment from "moment";
import { EmployeeTimesheet } from "./EmployeeTimesheet";
import { useRollbackPayroll } from "features/payroll/hooks/payroll/rollback/useRollbackPayroll";
import { useQueryClient } from "react-query";
import { useDeletePayroll } from "features/payroll/hooks/payroll/useDeletePayroll";
import ConfirmationModal from "components/modals/ConfirmationModal";
import Upload, { RcFile } from "antd/lib/upload";
import { useAddOvertimeSheet } from "features/payroll/hooks/payroll/overtimeSheet/useAddOvertimeSheet";
import { useGetOvertimeSheetTemplate } from "features/payroll/hooks/payroll/overtimeSheet/useGetOvertimeSheetTemplate";
import { FormPayrollProjectSchemeInput } from "../payrollSchemes/FormPayrollProjectSchemeInput";

const boxStyle =
  "bg-mainBg flex justify-between items-start md:items-center px-6 py-5 rounded lg:flex-row flex-col gap-y-5";

const buttonStyle =
  "border border-gray-400 hover:text-caramel rounded px-5 py-1 font-medium text-sm text-accent";

type TPayrollFrequency = "monthly" | "daily" | number;
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
interface ITimesheetProps extends IModalProps {
  payrollId: number;
}
export const UploadTimesheet: React.FC<ITimesheetProps> = ({
  open,
  handleClose,
  payrollId,
}) => {
  const [form] = Form.useForm();
  const { mutate, isLoading } = useAddOvertimeSheet();
  const [fileList, setFilelist] = useState<any>([]);
  const handleUpload = (val: any) => {
    setFilelist(val.fileList);
  };
  const beforeUpload = (file: RcFile) => {
    const isSpreadSheetFile = file.type === "text/csv";
    if (!isSpreadSheetFile) {
      message.error("You can only upload CSV file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("File must smaller than 2MB!");
    }
    return false;
  };
  const { mutate: mutateGetTemplate } = useGetOvertimeSheetTemplate();

  const handleGetTemplate = () => {
    mutateGetTemplate(
      {
        data: {
          payrollId,
        },
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

          handleClose();
        },
      }
    );
  };
  const handleSubmit = (data: any) => {
    mutate(
      {
        payrollId,
        data: {
          csvFile: fileList[0]?.originFileObj,
        },
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

          handleClose();
        },
      }
    );
  };

  return (
    <Modal
      open={open}
      footer={null}
      title={"Upload Timesheet"}
      style={{ top: 20 }}
      onCancel={() => handleClose()}
    >
      <Form form={form} onFinish={handleSubmit} requiredMark={false}>
        <div className="border border-dotted border-slate-500 rounded flex flex-col items-center gap-2 py-3 px-2">
          <p>Select file to be Imported</p>
          <Typography.Text title="Please Download template and populate">
            <span
              className="text-sm pt-1 font-medium cursor-pointer hover:text-caramel underline"
              onClick={() => handleGetTemplate()}
            >
              Download template
            </span>
          </Typography.Text>

          <div className="flex justify-center w-3/5">
            <Upload
              fileList={fileList}
              onChange={handleUpload}
              onRemove={(file) => {
                const index = fileList.indexOf(file);
                const newFileList = fileList.slice();
                newFileList.splice(index, 1);
                setFilelist(newFileList);
              }}
              beforeUpload={beforeUpload}
            >
              {fileList.length !== 1 && (
                <div className="w-full border border-dotted border-caramel px-2 py-1 rounded text-caramel text-sm flex flex-col gap-1 items-center justify-center">
                  <i className="ri-download-2-line text-2xl"></i>
                  <span className="text-xs font-medium">Upload File</span>
                </div>
              )}
            </Upload>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <AppButton
            label="Upload"
            type="submit"
            isLoading={isLoading}
            disabled={fileList.length <= 0}
          />
        </div>
      </Form>
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
    useState<TPayrollFrequency>("monthly");
  useEffect(() => {
    if (type === "direct-salary" || type === "office") {
      setPayrollFrequency("monthly");
    }
  }, [type]);
  const [costCentre, setCostCentre] = useState("");
  const { mutate, isLoading } = useCreatePayroll();
  const [projectName, setProjectName] = useState("");
  const handleSubmit = (data: any) => {
    if (type) {
      mutate(
        {
          projectId: type === "project" ? data.projectId : undefined,

          data: {
            costCentreId: data.costCentreId,
            date:
              payrollFrequency === "monthly"
                ? `${data.date?.format("YYYY-MM")}-01`
                : data.date?.format("YYYY-MM-DD"),
            description: data.description,
            frequency: type === "project" ? data.frequency : payrollFrequency,
            name:
              type === "project"
                ? `${projectName} (Payment ${data.frequency})`
                : data.name,
            csvFile:
              fileList.length > 0 ? fileList[0]?.originFileObj : undefined,
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
              frequency: type === "project" ? data.frequency : payrollFrequency,

              costCentre: costCentre,
              payrollId: res.data.data.id,
            });
            handleClose();
          },
        }
      );
    }
  };
  const [fileList, setFilelist] = useState<any>([]);
  const handleUpload = (val: any) => {
    setFilelist(val.fileList);
  };
  const beforeUpload = (file: RcFile) => {
    const isSpreadSheetFile = file.type === "text/csv";
    if (!isSpreadSheetFile) {
      message.error("You can only upload CSV file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("File must smaller than 2MB!");
    }
    return false;
  };
  const { mutate: mutateGetTemplate } = useGetOvertimeSheetTemplate();

  const handleGetTemplate = () => {
    mutateGetTemplate(
      {
        data: {
          payrollId: 0,
        },
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

          handleClose();
        },
      }
    );
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
          <FormPayrollProjectSchemeInput
            control={{ label: "Select Project", name: "projectId" }}
            Form={Form}
            onSelect={(_, scheme) => {
              setPayrollFrequency(+scheme.frequency);
              setProjectName(scheme.name);
            }}
          />
        )}

        {type !== "project" && (
          <Form.Item
            rules={textInputValidationRules}
            name="name"
            label="Payroll Name"
          >
            <Input placeholder="Payroll Name" />
          </Form.Item>
        )}
        {type === "project" && typeof payrollFrequency === "number" && (
          <Form.Item
            rules={generalValidationRules}
            name="frequency"
            label="Select Payment"
          >
            <Select
              getPopupContainer={(triggerNode) => triggerNode.parentElement}
              placeholder="Select payment"
              options={Array(payrollFrequency)
                .fill(0)
                .map((_, i) => ({
                  label: `Payment ${i + 1}`,
                  value: i + 1,
                }))}
            />
          </Form.Item>
        )}
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
            name="csvFile"
            label="Upload Employees' Timesheet"
          >
            <div className="border border-dotted border-slate-500 rounded flex flex-col items-center gap-2 py-3 px-2">
              <p>Select file to be Imported</p>
              <Typography.Text title="Please Download template and populate">
                <span
                  className="text-sm pt-1 font-medium cursor-pointer hover:text-caramel underline"
                  onClick={() => handleGetTemplate()}
                >
                  Download template
                </span>
              </Typography.Text>

              <div className="flex justify-center w-3/5">
                <Upload
                  fileList={fileList}
                  onChange={handleUpload}
                  onRemove={(file) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    setFilelist(newFileList);
                  }}
                  beforeUpload={beforeUpload}
                >
                  {fileList.length !== 1 && (
                    <div className="w-full border border-dotted border-caramel px-2 py-1 rounded text-caramel text-sm flex flex-col gap-1 items-center justify-center">
                      <i className="ri-download-2-line text-2xl"></i>
                      <span className="text-xs font-medium">Upload File</span>
                    </div>
                  )}
                </Upload>
              </div>
            </div>
          </Form.Item>
        )}
        <FormCostCentreInput
          Form={Form}
          control={{ name: "costCentreId", label: "Cost Centre" }}
          onSelect={(_, data) => setCostCentre(data.name)}
        />
        {type === "project" && (
          <Form.Item name="date" label="Date">
            <DatePicker className="w-full" placeholder="Date" />
          </Form.Item>
        )}
        {payrollFrequency === "daily" && type !== "project" && (
          <Form.Item name="date" label="Date">
            <DatePicker className="w-full" placeholder="Date" />
          </Form.Item>
        )}
        {payrollFrequency === "monthly" && type !== "project" && (
          <Form.Item name="date" label="Date">
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
          <AppButton
            type="submit"
            isLoading={isLoading}
            disabled={type === "wages" && fileList.length <= 0}
          />
        </div>
      </Form>
    </Modal>
  );
};

const CreatePayrollContainer: React.FC<{
  type: TPayrollSchemeType;
  payrollId?: number;
}> = ({ type, payrollId }) => {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (payrollId) {
      setPayrollD((item) => ({ ...item, payrollId }));

      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [payrollId]);
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
  const [action, setAction] = useState<
    "rollback-payroll" | "delete-payroll" | "upload-overtime-sheet"
  >();
  const clearAction = () => {
    setAction(undefined);
  };
  const { mutate: mutateRollback, isLoading: isRollbackLoading } =
    useRollbackPayroll();

  const handleRollback = () => {
    if (payrollId) {
      mutateRollback(
        {
          id: payrollId,
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
            clearAction();

            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_SINGLE_PAYROLL],
              // exact: true,
            });
          },
        }
      );
    }
  };
  const { mutate: mutateDelete, isLoading: isDeleteLoading } =
    useDeletePayroll();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (payrollId) {
      mutateDelete(
        {
          id: payrollId,
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
            clearAction();
            navigate(appRoutes.listOfPayrolls);
          },
        }
      );
    }
  };
  return (
    <>
      {payroll && (
        <UploadTimesheet
          open={action === "upload-overtime-sheet"}
          handleClose={() => clearAction()}
          payrollId={payroll?.id}
        />
      )}
      <CreatePayrollInitialForm
        open={open}
        handleSave={(props) => setPayrollD({ ...props })}
        handleClose={() => setOpen(false)}
        type={type}
      />
      <ConfirmationModal
        key="delete"
        title={`Delete Payroll`}
        description={`Are you sure you want to delete ${payroll?.name}`}
        handleClose={() => clearAction()}
        open={action === "delete-payroll"}
        handleConfirm={{
          fn: () => handleDelete(),
          isLoading: isDeleteLoading,
        }}
      />
      <ConfirmationModal
        key="rollback"
        title={`Rollback Payroll`}
        description={`Are you sure you want to rollback ${payroll?.name}`}
        handleClose={() => clearAction()}
        open={action === "rollback-payroll"}
        handleConfirm={{
          fn: () => handleRollback(),
          isLoading: isRollbackLoading,
        }}
      />

      <div className="text-accent">
        <div className="flex items-center justify-between ">
          <div className="ml-8">
            <Tag
              children={<span className="capitalize">{payroll?.status}</span>}
            />
          </div>
          <div className="flex gap-5">
            {payroll?.status === "in-review" && (
              <button className="neutralButton">Run Payroll</button>
            )}
            {payroll?.status === "draft" && (
              <AppButton
                label="Rollback"
                handleClick={() => setAction("rollback-payroll")}
              />
            )}
            {payroll?.status === "draft" && (
              <AppButton
                label="Delete Payroll"
                variant="style-with-class"
                additionalClassNames={[
                  "border border-red-400 hover:text-caramel rounded px-2 py-1 font-medium text-sm text-neutral",
                ]}
                handleClick={() => setAction("delete-payroll")}
              />
            )}
            {payroll?.status === "confirmed" && (
              <button className="border border-red-400 hover:text-caramel rounded px-2 py-1 font-medium text-sm text-neutral">
                Delete
              </button>
            )}
          </div>
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
                      value={
                        type === "project"
                          ? `Payment ${payroll?.frequency}`
                          : payroll?.frequency
                      }
                      className="capitalize bg-slate-100 cursor-not-allowed border text-accent rounded px-3 py-1 border-gray-400 bg-mainBg"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  {typeof payroll?.frequency === "number" && (
                    <input
                      disabled
                      value={moment(payroll?.date).format("YYYY-MM-DD")}
                      type="date"
                      placeholder="Select day"
                      className=" bg-slate-100 cursor-not-allowed border text-accent rounded px-3 py-1 border-gray-400 bg-mainBg"
                    />
                  )}
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
                      <button className={buttonStyle}>View Timesheet</button>
                    </div>
                  </div>
                  <div className="mt-4">
                    {typeof payrollD.frequency !== "number" && (
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
                      onClick={() => setAction("upload-overtime-sheet")}
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
                    eligibility="citizen"
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
                    eligibility="expatriate"
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
