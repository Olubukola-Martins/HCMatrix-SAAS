import { Form, Input, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { TTaxAuthority } from "features/payroll/types";
import { useUpdateNSITFAuthority } from "features/payroll/hooks/organization/nsitfAuthorities/useUpdateNSITFAuthority";
import { QUERY_KEY_FOR_NSITF_AUTHORITY } from "features/payroll/hooks/organization/nsitfAuthorities/useGetNSITFAuthorities";

interface IProps extends IModalProps {
  taxAuth: TTaxAuthority;
}
const EditNSITFAuth: React.FC<IProps> = ({ open, handleClose, taxAuth }) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useUpdateNSITFAuthority();

  useEffect(() => {
    form.setFieldsValue({
      name: taxAuth.name,
    });
  }, [form, taxAuth]);

  const handleSubmit = (data: any) => {
    mutate(
      {
        id: taxAuth.id,
        body: {
          name: data.name,
        },
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            duration: 2,
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
            queryKey: [QUERY_KEY_FOR_NSITF_AUTHORITY],
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
      title={"Edit NSITF Authority"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item rules={textInputValidationRules} name="name" label="Name">
          <Input placeholder="Name" />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};

export default EditNSITFAuth;
