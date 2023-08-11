import { Form, Input, InputNumber, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_COST_CENTRES } from "features/payroll/hooks/costCentres/useGetCostCentres";
import { TCostCentre } from "features/payroll/types";
import { useUpdateCostCentre } from "features/payroll/hooks/costCentres/useUpdateCostCentre";

interface IProps extends IModalProps {
  costCentre: TCostCentre;
}

export const FundCostCentre: React.FC<IProps> = ({
  open,
  handleClose,
  costCentre,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useUpdateCostCentre();
  useEffect(() => {
    form.setFieldsValue({
      name: costCentre.name,
      amountEntered: costCentre.amountEntered,
    });
  }, [costCentre, form]);

  const handleSubmit = (data: any) => {
    mutate(
      {
        id: costCentre.id,
        body: {
          name: data.name,
          amountEntered: data.amountEntered,
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
          form.resetFields();
          handleClose();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_COST_CENTRES],
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
      title={"Fund Cost Centre"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item rules={textInputValidationRules} name="name" label="Name">
          <Input placeholder="" disabled />
        </Form.Item>
        <Form.Item
          rules={generalValidationRules}
          name="amountEntered"
          label="Amount"
        >
          <InputNumber min={0} className="w-full" />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
