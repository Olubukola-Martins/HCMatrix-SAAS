import {
  DatePicker,
  Form,
  InputNumber,
  message,
  Select,
  Spin,
  Tooltip,
} from "antd";
import { IAuthDets } from "features/authentication/types";
import moment from "moment";

import React, { useContext, useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useQueryClient } from "react-query";
import { BeatLoader } from "react-spinners";
import { GlobalContext } from "stateManagers/GlobalContextProvider";
import { generalValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useCreateEmployeeJobInfo } from "../../hooks/useCreateEmployeeJobInfo";
import { useFetchEmployees } from "../../hooks/useFetchEmployees";
import { useUpdateEmployeeJobInfo } from "../../hooks/useUpdateEmployeeJobInfo";
import { TEmployee, ICreateEmpJobInfoProps } from "../../types";
import { useApiAuth } from "hooks/useApiAuth";
import { EMPLOYMENT_TYPES, WORK_MODELS } from "constants/general";
import { FormPayGradeInput } from "features/payroll/components/payGrades/FormPayGradeInput";
import { FormBranchInput } from "features/core/branches/components/FormBranchInput";
const { Option } = Select;

interface IProps {
  employee?: TEmployee;
}

type TPayrollType = "direct-salary" | "office" | "wages";
const PAYROLL_TYPES: TPayrollType[] = ["direct-salary", "office", "wages"];
const PAYROLL_TYPES_OPTIONS = PAYROLL_TYPES.map((item) => ({
  label: <span className="capitalize">{item.split("-").join(" ")}</span>,
  value: item,
}));
export const JobInformation = ({ employee }: IProps) => {
  const [payrollType, setPayrollType] = useState<
    "direct-salary" | "office" | "wages"
  >("direct-salary");
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { token, companyId } = useApiAuth();

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
    const jobInfo = employee?.jobInformation;
    if (jobInfo) {
      form.setFieldsValue({
        lineManagerId: jobInfo.lineManagerId,
        branchId: jobInfo.branchId,
        payGradeId: jobInfo?.payGradeId,
        startDate: jobInfo.startDate ? moment(jobInfo.startDate) : null,
        monthlyGross: +jobInfo.monthlyGross, // to covert to number
        employmentType: jobInfo.employmentType,
        workModel: jobInfo.workModel,
        numberOfDaysPerWeek: jobInfo.numberOfDaysPerWeek,
        hireDate: jobInfo.hireDate ? moment(jobInfo.hireDate) : null,
        probationEndDate: jobInfo.probationEndDate
          ? moment(jobInfo.probationEndDate)
          : null,
        confirmationDate: jobInfo.confirmationDate
          ? moment(jobInfo.confirmationDate)
          : null,
      });
    }
  }, [employee, form]);
  const { mutate: createMutate, isLoading: createLoading } =
    useCreateEmployeeJobInfo();
  const { mutate: updateMutate, isLoading: updateLoading } =
    useUpdateEmployeeJobInfo();

  const handleFinish = (data: any) => {
    if (companyId && employee && !employee.jobInformation) {
      //if the personal info doesnt exist, then create
      const props: ICreateEmpJobInfoProps = {
        token,
        companyId,
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
        branchId: data.branchId,
        employeeId: employee.id,
      };

      createMutate(props, {
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
            queryKey: ["single-employee", employee?.id],
            exact: true,
          });
        },
      });
    }
    if (companyId && employee && employee.jobInformation) {
      //if the personal info exist, then update
      const props: ICreateEmpJobInfoProps = {
        token,
        companyId,
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
        branchId: data.branchId,

        employeeId: employee.id,
      };

      // return;
      openNotification({
        state: "info",
        title: "Wait a second ...",
        description: <Spin />,
      });
      updateMutate(props, {
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
            queryKey: ["single-employee", employee?.id],
            exact: true,
          });
        },
      });
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
          <Form.Item label="Payroll Type" rules={[...generalValidationRules]}>
            <Select
              value={payrollType}
              className="capitalize"
              options={PAYROLL_TYPES_OPTIONS}
              onSelect={(val: TPayrollType) => setPayrollType(val)}
            />
          </Form.Item>
          {payrollType === "wages" && (
            <Form.Item
              name="hourlyGrossPay"
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

          {!disable && (
            <div className="flex items-center">
              <button className="button" type="submit">
                {createLoading || updateLoading ? (
                  <BeatLoader color="#fff" />
                ) : (
                  "Save changes"
                )}
              </button>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};
