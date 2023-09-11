import { Form, Input, InputNumber, Modal } from "antd";
import Themes from "components/Themes";
import { AppButton } from "components/button/AppButton";
import { TCostCentre } from "features/payroll/types";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";

interface IProps extends IModalProps {
  handleSubmit: {
    fn: (props: { name: string; amountEntered: number }) => void;
    isLoading?: boolean;
  };
  url?: string;
  title?: string;
  costCentre?: TCostCentre;
}
export const SaveCostCentre: React.FC<IProps> = ({
  open,
  handleClose,
  handleSubmit,
  url,
  title = "Add Cost Centre",
  costCentre,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (!costCentre) return;
    form.setFieldsValue({
      name: costCentre.name,
      // amountEntered: costCentre.amountEntered,
      amountEntered: 0, //the amount to be added
    });
  }, [costCentre, form]);

  useEffect(() => {
    // Listen for messages from the iframe
    window.addEventListener("message", function (event) {
      if (event.origin !== "https://api.paystack.co") {
        // Ensure that the message is from a trusted source (same origin policy)
        return;
      }

      // Handle the message received from the iframe
      const data = event.data;
      console.log(data, "iframe");

      // Check if the message indicates that the API call is complete
      if (data.apiCallComplete === true) {
        // Your API call is complete; you can take further actions here
        console.log("API call is complete.");
      }
    });
  }, []);
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={title}
      style={{ top: 5 }}
    >
      <Themes>
        {url ? (
          <iframe
            src={url}
            width="100%"
            height="850"
            frameBorder="0"
            title="Paystack"
          ></iframe>
        ) : (
          <Form
            layout="vertical"
            form={form}
            onFinish={handleSubmit.fn}
            requiredMark={false}
          >
            <Form.Item
              rules={textInputValidationRules}
              name="name"
              label="Name"
            >
              <Input placeholder="Cost Centre Name" />
            </Form.Item>
            <Form.Item
              rules={generalValidationRules}
              name="amountEntered"
              label="Amount to be Paid"
            >
              <InputNumber
                min={0}
                className="w-full"
                placeholder="Amount to be paid"
              />
            </Form.Item>

            <div className="flex justify-end">
              <AppButton type="submit" isLoading={handleSubmit.isLoading} />
            </div>
          </Form>
        )}
      </Themes>
    </Modal>
  );
};
