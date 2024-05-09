import { Form, Modal, Input } from "antd";
import { IModalProps } from "types";
import {
  emailValidationRules,
  phoneNumberValidationRule,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { useCreateSisterCompany } from "../hooks/useCreateSisterCompany";
import { AppButton } from "components/button/AppButton";
import { openNotification } from "utils/notifications";
import { FormIndustryInput } from "components/generalFormInputs/FormIndustryInput";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_AUTHENTICATED_USER } from "features/authentication/hooks/useGetAuthUser";

export const AddSisterCompanyForm = ({ open, handleClose }: IModalProps) => {
  const [form] = Form.useForm();

  const { mutate, isLoading } = useCreateSisterCompany();
  const queryClient = useQueryClient();
  const handleSubmit = (data: any) => {
    mutate(
      {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        industryId: data.industryId,
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
          queryClient.invalidateQueries([QUERY_KEY_FOR_AUTHENTICATED_USER]);
          form.resetFields();
          handleClose();
        },
      }
    );
  };

  return (
    <Modal
      title="Add Sister Company"
      open={open}
      onCancel={() => handleClose(false)}
      footer={null}
      style={{ top: 10 }}
    >
      <Form
        layout="vertical"
        requiredMark={false}
        size="middle"
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Company Name"
          name="name"
          rules={textInputValidationRules}
          hasFeedback
        >
          <Input placeholder="Enter Company Name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Company Email"
          rules={emailValidationRules}
          hasFeedback
        >
          <Input placeholder="Company Email" />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[phoneNumberValidationRule]}
          hasFeedback
        >
          <Input placeholder="Phone Number" />
        </Form.Item>
        <FormIndustryInput
          Form={Form}
          control={{ name: "industryId", label: "Industry" }}
        />

        <div className="flex justify-end">
          <AppButton label="Add" type="submit" isLoading={isLoading} />{" "}
        </div>
      </Form>
    </Modal>
  );
};
