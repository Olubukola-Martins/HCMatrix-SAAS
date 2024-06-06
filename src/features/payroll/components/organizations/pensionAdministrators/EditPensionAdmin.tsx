import { Form, Select, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import { generalValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { TPensionAdministrator } from "features/payroll/types";
import { QUERY_KEY_FOR_PENSION_ADMINS } from "features/payroll/hooks/organization/pensionAdministrators/useGetPensionAdmins";
import { useUpdatePensionAdmin } from "features/payroll/hooks/organization/pensionAdministrators/useUpdatePensionAdmin";
import { DEFAULT_PENSION_ADMINISTRATORS } from "features/payroll/constants";

interface IProps extends IModalProps {
  pensionAdmin: TPensionAdministrator;
}
const EditPensionAdmin: React.FC<IProps> = ({
  open,
  handleClose,
  pensionAdmin,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useUpdatePensionAdmin();

  useEffect(() => {
    form.setFieldsValue({
      name: pensionAdmin.name,
    });
  }, [form, pensionAdmin]);

  const handleSubmit = (data: any) => {
    mutate(
      {
        id: pensionAdmin.id,
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
            queryKey: [QUERY_KEY_FOR_PENSION_ADMINS],
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
      title={"Edit Pension Administrator"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item rules={generalValidationRules} name="name" label="Name">
          <Select
            placeholder="Name"
            options={DEFAULT_PENSION_ADMINISTRATORS.map((item) => ({
              label: <span className="capitalize">{item}</span>,
              value: item,
            }))}
          />
        </Form.Item>
        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};

export default EditPensionAdmin;
