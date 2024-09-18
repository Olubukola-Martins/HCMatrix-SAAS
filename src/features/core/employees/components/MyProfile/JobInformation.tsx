import { DatePicker, Form, InputNumber, message, Select, Tooltip } from "antd";
import dayjs from "dayjs";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import {
  dateHasToBeLesserThanOrEqualToCurrentDayRule,
  generalValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { TSingleEmployee } from "../../types";
import {
  EMPLOYMENT_TYPES,
  MAX_NO_OF_WORKING_DAYS_PER_WEEK,
  WORK_MODELS,
} from "constants/general";
import { FormPayGradeInput } from "features/payroll/components/payGrades/FormPayGradeInput";
import { FormBranchInput } from "features/core/branches/components/FormBranchInput";
import { useSaveEmployeeJobInformation } from "../../hooks/jobInformation/useSaveEmployeeJobInformation";
import { AppButton } from "components/button/AppButton";
import { QUERY_KEY_FOR_SINGLE_EMPLOYEE } from "../../hooks/useFetchSingleEmployee";
import { FormEmployeeInput } from "../FormEmployeeInput";
import {
  TEssentialPayrollType,
  TPayrollFrequency,
} from "features/payroll/types/payroll";
import {
  ESSENTIAL_PAYROLL_TYPES_OPTIONS,
  PAYROLL_FREQUENCIES_OPTIONS,
} from "features/payroll/constants";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import AppTooltip from "components/tooltip/AppTooltip";
import { Dayjs } from "dayjs";

export interface TJobInformationProps {
  employeeId?: number;
  jobInformation?: TSingleEmployee["jobInformation"];
  isOwner?: boolean;
}
export const JobInformation: React.FC<TJobInformationProps> = ({
  jobInformation,
  employeeId,
  isOwner = false,
}) => {
  const [payrollType, setPayrollType] =
    useState<TEssentialPayrollType>("direct-salary");
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const [disable, setDisable] = useState(true);
  const enableEdit = () => {
    setDisable(!disable);
    message.success(
      disable ? "Editing enabled Successfully" : "Editing disabled successfully"
    );
  };

  useEffect(() => {
    const jobInfo = jobInformation;
    if (jobInfo) {
      form.setFieldsValue({
        lineManagerId: jobInfo.lineManagerId,
        branchId: jobInfo.branchId,
        payGradeId: jobInfo?.payGradeId,
        startDate: jobInfo.startDate ? dayjs(jobInfo.startDate) : null,
        monthlyGross: jobInfo?.monthlyGross ? +jobInfo?.monthlyGross : 0, // to covert to number
        employmentType: jobInfo.employmentType,
        workModel: jobInfo.workModel,
        payrollType: jobInfo?.payrollType,
        frequency: jobInfo?.frequency,
        hourlyRate: jobInfo?.hourlyRate ? +jobInfo?.hourlyRate : 0,
        numberOfDaysPerWeek: jobInfo.numberOfDaysPerWeek,
        hireDate: jobInfo?.hireDate ? dayjs(jobInfo?.hireDate) : null,
        probationEndDate: jobInfo.probationEndDate
          ? dayjs(jobInfo.probationEndDate)
          : null,
        confirmationDate: jobInfo.confirmationDate
          ? dayjs(jobInfo.confirmationDate)
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
            startDate: data.startDate.format(DEFAULT_DATE_FORMAT),
            monthlyGross: data.monthlyGross,
            employmentType: data.employmentType,
            workModel: data.workModel,
            numberOfDaysPerWeek: data.numberOfDaysPerWeek,
            hireDate: data.hireDate.format(DEFAULT_DATE_FORMAT),
            probationEndDate: data.probationEndDate.format(DEFAULT_DATE_FORMAT),
            confirmationDate: data.confirmationDate.format(DEFAULT_DATE_FORMAT),
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
        {isOwner && (
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
        )}
      </div>
      <div className="bg-card p-3 rounded">
        <Form
          layout="vertical"
          className="flex flex-col gap-4"
          form={form}
          onFinish={handleFinish}
          requiredMark={false}
          disabled={disable}
        >
          <JobInformationFormItems
            Form={Form}
            frequency={frequency}
            setFrequency={setFrequency}
            payrollType={payrollType}
            setPayrollType={setPayrollType}
          />
          <div className="flex justify-end items-end ">
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
const rateAndGrossValidation = {
  required: true,

  validator: async (_: any, value: any) => {
    if (typeof value !== "number") {
      throw new Error("Please enter a valid number!");
    }
    if (+value <= 0) {
      throw new Error("Please enter a number greater than 0");
    }

    return true;
  },
};
const workingDaysValidation = {
  required: true,

  validator: async (_: any, value: any) => {
    if (typeof value !== "number") {
      throw new Error("Please enter a valid number!");
    }
    if (!(+value >= 1 && value <= MAX_NO_OF_WORKING_DAYS_PER_WEEK)) {
      throw new Error(
        `Please enter a value ranging from 1 to ${MAX_NO_OF_WORKING_DAYS_PER_WEEK}`
      );
    }

    return true;
  },
};
export const JobInformationFormItems: React.FC<{
  Form: typeof Form;
  frequency: TPayrollFrequency;
  setFrequency: Dispatch<SetStateAction<TPayrollFrequency>>;
  payrollType: TEssentialPayrollType;
  setPayrollType: Dispatch<SetStateAction<TEssentialPayrollType>>;
}> = ({ Form, frequency, setFrequency, payrollType, setPayrollType }) => {
  const [hireDate, setHireDate] = useState<Dayjs | null>(null);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [probationEndDate, setProbationEndDate] = useState<Dayjs | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <Form.Item
        label="Payroll Type"
        name={`payrollType`}
        rules={[...generalValidationRules]}
      >
        <Select
          value={payrollType}
          className="capitalize"
          options={ESSENTIAL_PAYROLL_TYPES_OPTIONS}
          onSelect={(val: TEssentialPayrollType) => setPayrollType(val)}
          placeholder="Payroll Type"
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
            placeholder="Wage Type"
          />
        </Form.Item>
      )}
      {payrollType === "wages" && (
        <Form.Item
          name="hourlyRate"
          label="Hourly Gross"
          rules={[rateAndGrossValidation]}
        >
          <InputNumber min={1} className="w-full" placeholder="Hourly Gross" />
        </Form.Item>
      )}

      {payrollType === "direct-salary" && (
        <Form.Item
          name="monthlyGross"
          label="Monthly Gross"
          rules={[rateAndGrossValidation]}
        >
          <InputNumber min={1} className="w-full" placeholder="Monthly Gross" />
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
        rules={[workingDaysValidation]}
      >
        <InputNumber min={1} className="w-full" placeholder="Working Days" />
      </Form.Item>

      <FormBranchInput
        Form={Form}
        control={{ label: "Branch", name: "branchId" }}
      />
      <FormEmployeeInput
        Form={Form}
        control={{ name: "lineManagerId", label: "Line Manager (optional)" }}
        optional
      />

      <Form.Item
        name="employmentType"
        label="Employment Type"
        rules={generalValidationRules}
      >
        <Select placeholder="Employment Type" options={EMPLOYMENT_TYPES} />
      </Form.Item>

      <Form.Item
        name="workModel"
        label={
          <AppTooltip
            children={<span>Work Model</span>}
            tooltipProps={{
              title:
                "This describes the operational environment of the employee, remote, on site, or hybrid.",
            }}
          />
        }
        rules={generalValidationRules}
      >
        <Select placeholder="Work Model" options={WORK_MODELS} />
      </Form.Item>
      <Form.Item
        name="hireDate"
        label="Hire Date"
        rules={[dateHasToBeLesserThanOrEqualToCurrentDayRule]}
      >
        <DatePicker
          className="w-full"
          format={DEFAULT_DATE_FORMAT}
          placeholder="Hire Date"
          onChange={(val) => setHireDate(val)}
        />
      </Form.Item>
      <Form.Item
        name="startDate"
        label="Start Date"
        rules={[
          {
            required: true,
            validator: async (rule: any, value: Dayjs) => {
              if (value.isBefore(hireDate)) {
                throw new Error("Start Date cannot be before hire date!");
              }

              return true;
            },
          },
        ]}
      >
        <DatePicker
          format={DEFAULT_DATE_FORMAT}
          className="w-full"
          placeholder="Start Date"
          onChange={(val) => setStartDate(val)}
        />
      </Form.Item>
      <Form.Item
        name="probationEndDate"
        label="Probation End Date"
        rules={[
          {
            required: true,
            validator: async (rule: any, value: Dayjs) => {
              if (value.isBefore(startDate)) {
                throw new Error(
                  "Probation End Date cannot be before start date!"
                );
              }

              return true;
            },
          },
        ]}
      >
        <DatePicker
          format={DEFAULT_DATE_FORMAT}
          className="w-full"
          placeholder="Probation End Date"
          onChange={(val) => setProbationEndDate(val)}
        />
      </Form.Item>
      <Form.Item
        name="confirmationDate"
        label="Confirmation Date"
        rules={[
          {
            required: true,
            validator: async (rule: any, value: Dayjs) => {
              if (value.isBefore(probationEndDate)) {
                throw new Error(
                  "Confirmation date cannot be before probation end date!"
                );
              }

              return true;
            },
          },
        ]}
      >
        <DatePicker
          format={DEFAULT_DATE_FORMAT}
          className="w-full"
          placeholder="Confirmation Date"
        />
      </Form.Item>
    </div>
  );
};
