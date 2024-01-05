import { Form, FormInstance } from "antd";
import React from "react";
import BillingDetailsSection from "./BillingDetailsSection";
import { TSubscription } from "features/billing/types/subscription";
import SummarySection from "../SummarySection";

const PaymentsContainer: React.FC<{
  Form: typeof Form;
  form: FormInstance;
  isPayingForSubscription?: boolean;
  subscriptions?: TSubscription[];
  isLoading?: boolean;
}> = ({ Form, subscriptions, isLoading, form, isPayingForSubscription }) => {
  return (
    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-7 text-accent">
      <div className="flex flex-col gap-4">
        <BillingDetailsSection Form={Form} form={form} />
        <div>
          <p className="text-sm text-light">
            This payment wil be done through the payment gateway Paystack. Based
            on your card type, the subscription will be on recurring or
            non-recurring mode of payment. In recurring mode, your credit card
            will be charged automatically on your next renewal date until you
            cancel the service. In non-recurring mode, we will charge on time.
            You will receive a renewal notification before your next renewal
            date with a payment link to pay.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <SummarySection
          subscriptions={subscriptions}
          loading={isLoading}
          proceed={{
            isLoading: isPayingForSubscription,
            text: "Confirm",
            fn() {
              form.submit();
            },
          }}
        />
      </div>
    </div>
  );
};

export default PaymentsContainer;
