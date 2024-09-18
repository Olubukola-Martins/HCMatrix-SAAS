import { message, Tooltip, Form } from "antd";
import { AppButton } from "components/button/AppButton";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import dayjs, { Dayjs } from "dayjs";
import {
  JobInformationFormItems,
  TJobInformationProps,
} from "features/core/employees/components/MyProfile/JobInformation";
import {
  TEssentialPayrollType,
  TPayrollFrequency,
} from "features/payroll/types/payroll";
import { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";
import { useCreateProfileEditRequest } from "../../hooks/useCreateProfileEditRequest";
import { QUERY_KEY_FOR_PROFILE_EDIT_REQUISITIONS } from "../../hooks/useGetAllProfileEditRequests";
import { QUERY_KEY_FOR_PROFILE_EDIT_REQUISITIONS_FOR_AUTH_EMPLOYEE } from "../../hooks/useGetMyProfileEditRequests";

export const EditJobInformationRequest: React.FC<TJobInformationProps> = ({
  jobInformation,
  employeeId,
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
  const { mutate, isLoading } = useCreateProfileEditRequest();
  const [frequency, setFrequency] = useState<TPayrollFrequency>("monthly");

  const handleFinish = async (data: {
    startDate: Dayjs;
    monthlyGross: number;
    employmentType: string;
    workModel: string;
    numberOfDaysPerWeek: number;
    hireDate: Dayjs;
    probationEndDate: Dayjs;
    confirmationDate: Dayjs;
    lineManagerId: number;
    payGradeId: number;
    payrollType: string;
    branchId: number;
    hourlyRate: number;
    frequency: string;
  }) => {
    mutate(
      {
        employeeId,
        category: "job-information",

        content: {
          startDate: data.startDate.format(DEFAULT_DATE_FORMAT),
          monthlyGross: data.monthlyGross,
          employmentType: data.employmentType,
          workModel: data.workModel,
          numberOfDaysPerWeek: data.numberOfDaysPerWeek,
          hireDate: data.hireDate.format(DEFAULT_DATE_FORMAT),
          probationEndDate: data.probationEndDate.format(DEFAULT_DATE_FORMAT),
          confirmationDate: data.confirmationDate.format(DEFAULT_DATE_FORMAT),
          lineManagerId: data.lineManagerId,
          payrollType: data.payrollType,
          branchId: data.branchId,
          branchName: "",
          lineManagerName: "",
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
            queryKey: [QUERY_KEY_FOR_PROFILE_EDIT_REQUISITIONS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [
              QUERY_KEY_FOR_PROFILE_EDIT_REQUISITIONS_FOR_AUTH_EMPLOYEE,
            ],
            // exact: true,
          });
        },
      }
    );
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
