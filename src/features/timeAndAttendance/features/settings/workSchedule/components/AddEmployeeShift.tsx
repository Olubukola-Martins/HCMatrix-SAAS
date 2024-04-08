import { Form, Modal, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { IDrawerProps } from "types";
import { generalValidationRules } from "utils/formHelpers/validation";
import { useAddEmployeeShift } from "../hooks/useAddEmployeeShift";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { useContext } from "react";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_SCHEDULE_EMPLOYEE_SHIFT } from "../hooks/useGetScheduleEmployeeShift";

export const AddEmployeeShift = ({ handleClose, open, id }: IDrawerProps) => {
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useAddEmployeeShift();

  const handleSubmit = (values: any) => {
    mutate(
      {
        data: { ...values },
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
            duration: 6.0,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          form.resetFields();
          dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });
          queryClient.invalidateQueries([
            QUERY_KEY_FOR_SCHEDULE_EMPLOYEE_SHIFT,
          ]);
          handleClose();
        },
      }
    );
  };

  return (
    <Modal
      footer={false}
      title="Assign Employee"
      open={open}
      onCancel={() => handleClose()}
      style={{ top: 10 }}
    >
      <Form requiredMark={false} layout="vertical" onFinish={handleSubmit}>
        <FormEmployeeInput
          Form={Form}
          optional={true}
          mode="multiple"
          control={{ label: "Employee", name: "employeeIds" }}
        />
        <Form.Item
          name="shiftType"
          label="Shift Type"
          rules={generalValidationRules}
        >
          <Select
            className="w-full"
            placeholder="Select"
            options={[
              { value: "morning", label: "Morning" },
              { value: "afternoon", label: "Afternoon" },
              { value: "evening", label: "Evening" },
            ]}
            allowClear
          />
        </Form.Item>

        <AppButton type="submit" isLoading={isLoading} />
      </Form>
    </Modal>
  );
};
