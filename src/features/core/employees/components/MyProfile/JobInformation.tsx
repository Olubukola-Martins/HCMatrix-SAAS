import { DatePicker, Form, InputNumber, message, Select, Tooltip } from "antd";
import moment from "moment";

import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { generalValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useFetchEmployees } from "../../hooks/useFetchEmployees";
import { TSingleEmployee } from "../../types";
import { EMPLOYMENT_TYPES, WORK_MODELS } from "constants/general";
import { FormPayGradeInput } from "features/payroll/components/payGrades/FormPayGradeInput";
import { FormBranchInput } from "features/core/branches/components/FormBranchInput";
import { useSaveEmployeeJobInformation } from "../../hooks/jobInformation/useSaveEmployeeJobInformation";
import { AppButton } from "components/button/AppButton";
import { QUERY_KEY_FOR_SINGLE_EMPLOYEE } from "../../hooks/useFetchSingleEmployee";
const { Option } = Select;

type TPayrollType = "direct-salary" | "office" | "wages";
type TPayrollFrequency = "daily" | "monthly";
const PAYROLL_FREQUENCIES: TPayrollFrequency[] = ["daily", "monthly"];
const PAYROLL_TYPES: TPayrollType[] = ["direct-salary", "office", "wages"];
const PAYROLL_FREQUENCIES_OPTIONS = PAYROLL_FREQUENCIES.map((item) => ({
  label: <span className="capitalize">{item.split("-").join(" ")}</span>,
  value: item,
}));
const PAYROLL_TYPES_OPTIONS = PAYROLL_TYPES.map((item) => ({
  label: <span className="capitalize">{item.split("-").join(" ")}</span>,
  value: item,
}));

interface IProps {
  employeeId?: number;
  jobInformation?: TSingleEmployee["jobInformation"];
}
export const JobInformation: React.FC<IProps> = ({
  jobInformation,
  employeeId,
}) => {
  const [payrollType, setPayrollType] = useState<
    "direct-salary" | "office" | "wages"
  >("direct-salary");
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const [disable, setDisable] = useState(true);
  const enableEdit = () => {
    setDisable(!disable);
    message.success(
      disable ? "Editing enabled Successfully" : "Editing disabled successfully"
    );
  };
  const { data: employees, isSuccess } = useFetchEmployees({
    pagination: {
      limit: 100,
      offset: 0,
    },
  });

  useEffect(() => {
    const jobInfo = jobInformation;
    if (jobInfo) {
      form.setFieldsValue({
        lineManagerId: jobInfo.lineManagerId,
        branchId: jobInfo.branchId,
        payGradeId: jobInfo?.payGradeId,
        startDate: jobInfo.startDate ? moment(jobInfo.startDate) : null,
        monthlyGross: +jobInfo.monthlyGross, // to covert to number
        employmentType: jobInfo.employmentType,
        workModel: jobInfo.workModel,
        payrollType: jobInfo?.payrollType,
        frequency: jobInfo?.frequency,
        hourlyRate: jobInfo?.hourlyRate ? +jobInfo?.hourlyRate : 0,
        numberOfDaysPerWeek: jobInfo.numberOfDaysPerWeek,
        hireDate: jobInfo?.hireDate ? moment(jobInfo?.hireDate) : null,
        probationEndDate: jobInfo.probationEndDate
          ? moment(jobInfo.probationEndDate)
          : null,
        confirmationDate: jobInfo.confirmationDate
          ? moment(jobInfo.confirmationDate)
          : null,
      });
      jobInfo.payrollType && setPayrollType(jobInfo.payrollType);
      jobInfo.frequency && setFrequency(jobInfo.frequency);
    }
  }, [jobInformation, form]);
  const { mutate, isLoading } = useSaveEmployeeJobInformation();
  const [frequency, setFrequency] = useState<TPayrollFrequency>("monthly");

  const handleFinish = (data: any) => {
    if (employeeId) {
      mutate(
        {
          employeeId,

          data: {
            startDate: data.startDate.format("YYYY-MM-DD"),
            monthlyGross: data.monthlyGross,
            employmentType: data.employmentType,
            workModel: data.workModel,
            numberOfDaysPerWeek: data.numberOfDaysPerWeek,
            hireDate: data.hireDate.format("YYYY-MM-DD"),
            probationEndDate: data.probationEndDate.format("YYYY-MM-DD"),
            confirmationDate: data.confirmationDate.format("YYYY-MM-DD"),
            lineManagerId: data.lineManagerId,
            payGradeId: data.payGradeId,
            payrollType: data.payrollType,
            branchId: data.branchId,
            hourlyRate: data.hourlyRate,
            frequency: payrollType === "wages" ? frequency : "monthly",
          },
        },
        {
          onError: (err: any) => {
            openNotification({
              state: "error",
              title: "Error Occured",
              description:
                err?.response.data.message ?? err?.response.data.error.message,
            });
          },
          onSuccess: (res: any) => {
            openNotification({
              state: "success",

              title: "Success",
              description: res?.data?.message,
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_SINGLE_EMPLOYEE],
            });
          },
        }
      );
    }
  };

  return (
    <div className="bg-mainBg shadow-sm rounded-md p-4 mt-5">
      <div className="flex justify-between mb-3">
        <h2 className="font-medium text-lg">Job Information</h2>
        <Tooltip title={disable ? "Enable editing" : "Disable editing"}>
          <i
            className={
              disable
                ? `ri-pencil-line cursor-pointer hover:text-caramel text-xl`
                : `ri-lock-line cursor-pointer hover:text-caramel text-xl`
            }
            onClick={enableEdit}
          ></i>
        </Tooltip>
      </div>
      <div className="bg-card p-3 rounded">
        <Form
          layout="vertical"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          form={form}
          onFinish={handleFinish}
          requiredMark={false}
          disabled={disable}
        >
          <Form.Item
            label="Payroll Type"
            name={`payrollType`}
            rules={[...generalValidationRules]}
          >
            <Select
              value={payrollType}
              className="capitalize"
              options={PAYROLL_TYPES_OPTIONS}
              onSelect={(val: TPayrollType) => setPayrollType(val)}
            />
          </Form.Item>
          {payrollType === "wages" && (
            <Form.Item
              name="frequency"
              label="Type of Wage"
              rules={[...generalValidationRules]}
            >
              <Select
                value={frequency}
                className="capitalize"
                options={PAYROLL_FREQUENCIES_OPTIONS}
                onSelect={(val: TPayrollFrequency) => setFrequency(val)}
              />
            </Form.Item>
          )}
          {payrollType === "wages" && (
            <Form.Item
              name="hourlyRate"
              label="Hourly Gross"
              rules={[...generalValidationRules, { type: "number" }]}
            >
              <InputNumber min={1} className="w-full" />
            </Form.Item>
          )}

          {payrollType === "direct-salary" && (
            <Form.Item
              name="monthlyGross"
              label="Monthly Gross"
              rules={[...generalValidationRules, { type: "number" }]}
            >
              <InputNumber min={1} className="w-full" />
            </Form.Item>
          )}
          {payrollType === "office" && (
            <FormPayGradeInput
              Form={Form}
              control={{ name: "payGradeId", label: "Pay Grade" }}
            />
          )}
          <Form.Item
            name="numberOfDaysPerWeek"
            label="Number of days per week"
            rules={[...generalValidationRules, { type: "number" }]}
          >
            <InputNumber min={1} className="w-full" />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Resumption Date"
            rules={generalValidationRules}
          >
            <DatePicker format="YYYY/MM/DD" className="w-full" />
          </Form.Item>
          <Form.Item
            name="hireDate"
            label="Hire Date"
            rules={generalValidationRules}
          >
            <DatePicker
              className="w-full"
              format={"DD/MM/YYYY"}
              disabledDate={(d) =>
                !d ||
                d.isAfter(
                  //hire date should be before or on current date, and not a future date
                  moment(new Date().toLocaleDateString())
                    .add(1, "day")
                    .format("YYYY-MM-DD")
                )
              }
            />
          </Form.Item>
          <FormBranchInput
            Form={Form}
            control={{ label: "Branch", name: "branchId" }}
          />
          <Form.Item name="lineManagerId" label="Line Manager (optional)">
            <Select
              showSearch
              allowClear
              optionLabelProp="label"
              placeholder="Select"
            >
              {isSuccess &&
                employees?.data?.map((data) => (
                  <Option
                    key={data.id}
                    value={data.id}
                    label={`${data.firstName} ${data.lastName}`}
                  >
                    {data.firstName} {data.lastName}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="employmentType"
            label="Employment Type"
            rules={generalValidationRules}
          >
            <Select placeholder="Select" options={EMPLOYMENT_TYPES} />
          </Form.Item>
          <Form.Item
            name="probationEndDate"
            label="Probation End Date"
            rules={generalValidationRules}
          >
            <DatePicker format="YYYY/MM/DD" className="w-full" />
          </Form.Item>
          <Form.Item
            name="workModel"
            label="Work Model"
            rules={generalValidationRules}
          >
            <Select placeholder="Select" options={WORK_MODELS} />
          </Form.Item>
          <Form.Item
            name="confirmationDate"
            label="Confirmation Date"
            rules={generalValidationRules}
          >
            <DatePicker format="YYYY/MM/DD" className="w-full" />
          </Form.Item>
          <div className="flex justify-end items-end lg:col-span-3 md:col-span-3">
            {!disable && (
              <AppButton
                type="submit"
                label="Save Changes"
                isLoading={isLoading}
              />
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};
