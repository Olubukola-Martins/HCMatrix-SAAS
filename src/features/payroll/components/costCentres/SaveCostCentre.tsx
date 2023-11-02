import { Form, Input, InputNumber, Modal } from "antd";
import Themes from "components/Themes";
import { AppButton } from "components/button/AppButton";
import { QUERY_KEY_FOR_COST_CENTRE_TRANSACTIONS } from "features/payroll/hooks/costCentres/transactions/useGetCostCentreTransactions";
import { QUERY_KEY_FOR_COST_CENTRES } from "features/payroll/hooks/costCentres/useGetCostCentres";
import { QUERY_KEY_FOR_SINGLE_COST_CENTRE } from "features/payroll/hooks/costCentres/useGetSingleCostCentre";
import { QUERY_KEY_FOR_TRANSACTIONS_BY_API_ENTITY } from "features/payroll/hooks/transactions/useGetTransactionsByApiEntity";
import { TCostCentre } from "features/payroll/types";
import React, { useEffect } from "react";
import { useQueryClient } from "react-query";
import { IModalProps } from "types";
import { textInputValidationRules } from "utils/formHelpers/validation";

type TFieldToDisplay = "name" | "amountEntered";
interface IProps extends IModalProps {
  handleSubmit: {
    fn: (props: { name?: string; amountEntered?: number }) => void;
    isLoading?: boolean;
  };
  url?: string;
  title?: string;
  costCentre?: TCostCentre;
  fieldsToDisplay?: TFieldToDisplay[];
  onPaymentCompletion?: () => void;
}
export const SaveCostCentre: React.FC<IProps> = ({
  open,
  handleClose,
  handleSubmit,
  url,
  title = "Add Cost Centre",
  costCentre,
  fieldsToDisplay = ["amountEntered", "name"],
  onPaymentCompletion,
}) => {
  const queryClient = useQueryClient();

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
    const iframe = document.getElementById(
      "paystack-frame"
    ) as HTMLIFrameElement;

    iframe?.addEventListener("load", () => {
      // const iframeDocument = iframe?.ownerDocument;
      const iframeDocument =
        iframe?.contentDocument || iframe!.contentWindow?.document;
      if (!iframeDocument) return;
      // TODO: Address this : doesn't work because of cross origin

      const searchText = "Payment Successful";

      const checkText = () => {
        const textIsPresent =
          iframeDocument?.body.innerText.includes(searchText);

        if (textIsPresent) {
          onPaymentCompletion?.();
          // You can perform further actions here
        } else {
          // If the text is not found, set up a Mutation Observer
          const observer = new MutationObserver(() => {
            if (iframeDocument?.body.innerText.includes(searchText)) {
              onPaymentCompletion?.();
              // You can perform further actions here
              observer.disconnect(); // Stop observing once the text is found
            }
          });
          // Start observing changes in the iframe's body
          observer.observe(iframeDocument?.body, {
            childList: true,
            subtree: true,
          });
        }
      };

      if (iframeDocument.readyState === "complete") {
        checkText();
      } else {
        iframeDocument.addEventListener("DOMContentLoaded", checkText);
      }
    });

    return () => iframe?.removeEventListener("load", () => {});
  }, [onPaymentCompletion]);

  const onClose = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY_FOR_COST_CENTRES],
      // exact: true,
    });
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY_FOR_SINGLE_COST_CENTRE],
      // exact: true,
    });
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY_FOR_COST_CENTRE_TRANSACTIONS],
      // exact: true,
    });
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY_FOR_TRANSACTIONS_BY_API_ENTITY],
      // exact: true,
    });
    form.resetFields();
    handleClose();
  };
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={title}
      style={{ top: 5 }}
    >
      <Themes>
        <div className={`${url ? "block" : "hidden"}`}>
          <iframe
            src={url}
            width="100%"
            height="850"
            frameBorder="0"
            title="Paystack"
            id="paystack-frame"
          ></iframe>
        </div>

        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit.fn}
          requiredMark={false}
          className={`${!url ? "block" : "hidden"}`}
        >
          {fieldsToDisplay.includes("name") && (
            <Form.Item
              rules={textInputValidationRules}
              name="name"
              label="Name"
            >
              <Input placeholder="Cost Centre Name" />
            </Form.Item>
          )}
          {fieldsToDisplay.includes("amountEntered") && (
            <Form.Item
              rules={[
                {
                  required: true,
                  validator: async (_, value) => {
                    const MAX_AMOUNT = 9_999_999;
                    if (value >= MAX_AMOUNT)
                      throw new Error(`Amount exceeds ${MAX_AMOUNT - 1}`);

                    return true;
                  },
                },
              ]}
              name="amountEntered"
              label="Amount to be Paid"
            >
              <InputNumber
                min={0}
                className="w-full"
                placeholder="Amount to be paid"
              />
            </Form.Item>
          )}

          <div className="flex justify-end">
            <AppButton type="submit" isLoading={handleSubmit.isLoading} />
          </div>
        </Form>
      </Themes>
    </Modal>
  );
};
