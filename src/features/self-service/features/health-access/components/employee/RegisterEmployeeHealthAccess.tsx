import { Form, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useState } from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { useRegisterEmployeeHealthAccess } from "../../hooks/employee/useRegisterEmployeeHealthAccess";
import { QUERY_KEY_FOR_EMPLOYEE_HEALTH_ACCESSES } from "../../hooks/employee/useGetEmployeeHealthAccesses";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { FormHMOPlanInput } from "../settings/hmoPlan/FormHMOPlanInput";

export const RegisterEmployeeHealthAccess: React.FC<IModalProps> = ({
  open,
  handleClose,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useRegisterEmployeeHealthAccess();

  const handleSubmit = (data: any) => {
    mutate(
      {
        employeeId: data.employeeId,
        hmoPlanId: data.hmoPlanId,
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

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_EMPLOYEE_HEALTH_ACCESSES],
            // exact: true,
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
      title={"Register Employee Health Access"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <FormEmployeeInput
          control={{ name: "employeeId", label: "Employee" }}
          Form={Form}
        />

        <FormHMOPlanInput
          Form={Form}
          control={{ name: "hmoPlanId", label: "HMO Plan" }}
        />

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};

export const RegisterEmployeeHealthAccessBtn = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <RegisterEmployeeHealthAccess
        open={open}
        handleClose={() => setOpen(false)}
      />
      <AppButton
        handleClick={() => {
          setOpen(true);
        }}
        label="Register Employee"
      />
    </>
  );
};
