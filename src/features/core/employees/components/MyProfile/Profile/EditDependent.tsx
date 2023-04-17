import { Button, DatePicker, Drawer, Form, Input, Select, Spin } from "antd";
import { AppButton } from "components/button/AppButton";
import { FormPhoneInput } from "components/generalFormInputs/FormPhoneInput";
import { RELATIONSHIPS } from "constants/general";
import { useUpdateDependantOfEmployee } from "features/core/employees/hooks/useUpdateDependantOfEmployee";
import { TEmployeeDependant } from "features/core/employees/types";
import { useApiAuth } from "hooks/useApiAuth";
import moment from "moment";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { IDrawerProps } from "types";
import { generalValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";

interface IProps extends IDrawerProps {
  employeeId: number;
  dependent: TEmployeeDependant;
}

export const EditDependant = ({
  open,
  handleClose,
  employeeId,
  dependent,
}: IProps) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { token, companyId } = useApiAuth();

  useEffect(() => {
    form.setFieldsValue({
      dob: moment(dependent.dob),
      fullName: dependent.fullName,
      phone: {
        number: dependent.phoneNumber.split("-")[1],
        code: dependent.phoneNumber.split("-")[0].slice(1),
      },
      relationship: dependent.relationship,
    });
  }, [form, dependent]);
  const { mutate, isLoading } = useUpdateDependantOfEmployee();

  const handleSubmit = (data: any) => {
    const phoneNumber = `+${data.phone.code}-${data.phone.number}`;
    if (companyId) {
      // return;
      openNotification({
        state: "info",
        title: "Wait a second ...",
        description: <Spin />,
      });
      mutate(
        {
          id: dependent.id,
          employeeId,
          companyId,
          token,
          dob: data.dob,
          fullName: data.fullName,
          phoneNumber: phoneNumber,
          relationship: data.relationship,
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
              queryKey: ["single-employee", employeeId],
              // exact: true,
            });
          },
        }
      );
    }
  };
  return (
    <Drawer
      title="Edit Dependent"
      placement="right"
      onClose={() => handleClose()}
      open={open}
      className="drawerBg"
    >
      <Form
        layout="vertical"
        className="mt-5"
        form={form}
        requiredMark={false}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={generalValidationRules}
        >
          <Input className="generalInputStyle" placeholder="Enter Name" />
        </Form.Item>
        <Form.Item
          name="dob"
          label="Date of Birth"
          rules={generalValidationRules}
        >
          <DatePicker format="YYYY/MM/DD" className="generalInputStyle" />
        </Form.Item>
        <FormPhoneInput Form={Form} />
        <Form.Item
          name="relationship"
          label="Relationship"
          rules={[{ required: true, message: "Field is required" }]}
        >
          <Select
            className="SelectTag w-full"
            size="large"
            placeholder="Select"
            options={RELATIONSHIPS}
          />
        </Form.Item>

        <AppButton isLoading={isLoading} type="submit" />
      </Form>
    </Drawer>
  );
};
