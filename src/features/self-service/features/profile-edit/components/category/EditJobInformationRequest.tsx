import { message, Tooltip , Form} from "antd";
import { AppButton } from "components/button/AppButton";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import dayjs from "dayjs";
import { JobInformationFormItems, TJobInformationProps } from "features/core/employees/components/MyProfile/JobInformation";
import { useSaveEmployeeJobInformation } from "features/core/employees/hooks/jobInformation/useSaveEmployeeJobInformation";
import { QUERY_KEY_FOR_SINGLE_EMPLOYEE } from "features/core/employees/hooks/useFetchSingleEmployee";
import { TEssentialPayrollType, TPayrollFrequency } from "features/payroll/types/payroll";
import { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";

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
    const { mutate, isLoading } = useSaveEmployeeJobInformation(); //TODO: Replace with end point for the profile edit request
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