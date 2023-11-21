import { Form, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { TEmployeeHealthAccess } from "../../types/employee";
import { useUpdateEmployeeHMOPlan } from "../../hooks/employee/useUpdateEmployeeHMOPlan";
import { FormHMOPlanInput } from "../settings/hmoPlan/FormHMOPlanInput";
import { QUERY_KEY_FOR_EMPLOYEE_HEALTH_ACCESSES } from "../../hooks/employee/useGetEmployeeHealthAccesses";

interface IProps extends IModalProps {
  healthAccess?: TEmployeeHealthAccess;
}
export const EditEmployeeHMOPlan: React.FC<IProps> = ({
  open,
  handleClose,
  healthAccess,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useUpdateEmployeeHMOPlan();
  useEffect(() => {
    form.setFieldsValue({
      hmoPlanId: healthAccess?.hmoPlanId,
    });
  }, [form, healthAccess]);

  const handleSubmit = (data: any) => {
    if (!healthAccess) return;
    mutate(
      {
        employeeId: healthAccess?.employeeId,
        body: {
          hmoPlanId: data.hmoPlanId,
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
          });
          form.resetFields();
          handleClose();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_EMPLOYEE_HEALTH_ACCESSES],
          });
        },
      }
    );
  };
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Edit Hospital"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <FormHMOPlanInput
          Form={Form}
          control={{ label: "HMO Plan", name: "hmoPlanId" }}
        />

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
