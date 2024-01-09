import React from "react";
import BillingTransactionHistory from "./transactionHistory/BillingTransactionHistory";
import BillingSubscriptionBalance from "./subscriptionBalance/BillingSubscriptionBalance";
import BillingInfo from "./billingInfo/BillingInfo";
import ErrorBoundary from "components/errorHandlers/ErrorBoundary";
import { Tabs } from "antd";

const BillingContainer = () => {
  const tabItems: {
    label: string;
    key: string;
    children: React.ReactNode;
  }[] = [
    {
      label: "Transaction History",
      children: <BillingTransactionHistory />,
      key: "Transaction History",
    },
    {
      label: "Billing Address & Other Info",
      children: <BillingInfo />,
      key: "Billing Address & Other Info",
    },
    {
      label: "Subscription Balance",
      children: <BillingSubscriptionBalance />,
      key: "Subscription Balance",
    },
  ];
  return (
    <ErrorBoundary>
      <Tabs items={[...tabItems]} />
    </ErrorBoundary>
  );
};

export default BillingContainer;
