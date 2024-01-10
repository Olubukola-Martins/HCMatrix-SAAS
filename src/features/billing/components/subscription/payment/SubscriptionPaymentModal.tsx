import { Form, Input, InputNumber, Modal } from "antd";
import Themes from "components/Themes";
import { AppButton } from "components/button/AppButton";
import { TCreateCompanySubscriptionProps } from "features/billing/hooks/company/useCreateCompanySubscription";
import { QUERY_KEY_FOR_ACTIVE_COMPANY_SUBSCRITION } from "features/billing/hooks/company/useGetCompanyActiveSubscription";
import { QUERY_KEY_FOR_COST_CENTRE_TRANSACTIONS } from "features/payroll/hooks/costCentres/transactions/useGetCostCentreTransactions";
import { QUERY_KEY_FOR_COST_CENTRES } from "features/payroll/hooks/costCentres/useGetCostCentres";
import { QUERY_KEY_FOR_SINGLE_COST_CENTRE } from "features/payroll/hooks/costCentres/useGetSingleCostCentre";
import { QUERY_KEY_FOR_TRANSACTIONS_BY_API_ENTITY } from "features/payroll/hooks/transactions/useGetTransactionsByApiEntity";
import { TCostCentre } from "features/payroll/types";
import React, { useEffect } from "react";
import { useQueryClient } from "react-query";
import { IModalProps } from "types";

type TFieldToDisplay = "name" | "amountEntered";
interface IProps extends IModalProps {
  url?: string;
  title?: string;
  costCentre?: TCostCentre;
  fieldsToDisplay?: TFieldToDisplay[];
  onPaymentCompletion?: () => void;
}
export const SubscriptionPaymentModal: React.FC<IProps> = ({
  open,
  handleClose,
  url,
  title = "Payment for Subscription",
  costCentre,
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
      queryKey: [QUERY_KEY_FOR_ACTIVE_COMPANY_SUBSCRITION],
      // exact: true,
    });

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
      </Themes>
    </Modal>
  );
};
