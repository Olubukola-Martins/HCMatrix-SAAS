import { Form, Input, message, Tooltip } from "antd";
import { AppButton } from "components/button/AppButton";
import { QUERY_KEY_FOR_SINGLE_EMPLOYEE } from "features/core/employees/hooks/useFetchSingleEmployee";
import { useSaveEmployeeMedicalInfo } from "features/self-service/features/health-access/hooks/employee/medical/info/useSaveEmployeeMedicalInfo";
import { QUERY_KEY_FOR_AUTHENTICATED_EMPLOYEE_HEALTH_ACCESS } from "features/self-service/features/health-access/hooks/employee/useGetAuthenticatedEmployeeHealthAccess";
import { QUERY_KEY_FOR_SINGLE_EMPLOYEE_HEALTH_ACCESS } from "features/self-service/features/health-access/hooks/employee/useGetSingleEmployeeHealthAccess";
import { TSingleEmployeeHealthAccess } from "features/self-service/features/health-access/types/employee";

import { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import { textInputValidationRules } from "utils/formHelpers/validation";

import { openNotification } from "utils/notifications";

interface IProps {
  medicalInfo?: TSingleEmployeeHealthAccess["medicalInfo"];
  employeeId?: number;
}
export const MedicalInfo: React.FC<IProps> = ({ employeeId, medicalInfo }) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const [disable, setDisable] = useState(true);

  const enableEdit = () => {
    setDisable(!disable);
    message.success(
      disable ? "Editing enabled Successfully" : "Editing disabled successfully"
    );
  };

  useEffect(() => {
    if (!medicalInfo) return;
    form.setFieldsValue({
      bloodGroup: medicalInfo.bloodGroup,
      genotype: medicalInfo.genotype,
      hmoId: medicalInfo.hmoId,
    });
  }, [medicalInfo, form]);
  const { mutate, isLoading } = useSaveEmployeeMedicalInfo();
  const handleFinish = (data: any) => {
    if (!employeeId) return;
    mutate(
      {
        employeeId,
        body: {
          bloodGroup: data.bloodGroup,
          genotype: data.genotype,
          hmoId: data.hmoId,
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

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_SINGLE_EMPLOYEE_HEALTH_ACCESS, employeeId],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_AUTHENTICATED_EMPLOYEE_HEALTH_ACCESS],
            // exact: true,
          });
        },
      }
    );
  };

  return (
    <div className="bg-mainBg shadow-sm rounded-md p-4 mt-5">
      <div className="flex justify-between mb-3">
        <h2 className="font-medium text-lg">Medical Info</h2>
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
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          onFinish={handleFinish}
          form={form}
          disabled={disable}
          requiredMark={false}
        >
          <Form.Item
            name="hmoId"
            label="HMO ID"
            rules={textInputValidationRules}
          >
            <Input placeholder="HMO ID" />
          </Form.Item>
          <Form.Item
            name="genotype"
            label="Genotype"
            rules={textInputValidationRules}
          >
            <Input placeholder="Genotype" />
          </Form.Item>
          <Form.Item
            name="bloodGroup"
            label="Blood Group"
            rules={textInputValidationRules}
          >
            <Input placeholder="Blood Group" />
          </Form.Item>

          <div className="md:col-span-2 flex justify-end">
            {!disable && (
              <AppButton
                label="Save Changes"
                type="submit"
                isLoading={isLoading}
              />
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};
