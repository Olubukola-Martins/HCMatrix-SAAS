import { Tabs } from "antd";
import { useState } from "react";
import { RepaymentPlan } from "./RepaymentPlan";
import { PaymentSettings } from "./PaymentSettings";
import { PaymentPlan } from "./PaymentPlan";

export const ConfigurePayment = () => {
  const [addNewPlan, setAddNewPlan] = useState(false);

  const tabItems = [
    {
      key: "1",
      label: `Payment Settings`,
      children: <PaymentSettings />,
      hidden: false,
    },
    {
      key: "2",
      label: `Payment Plan`,
      children: <PaymentPlan />,
    },
  ];

  return (
    <div>
      <RepaymentPlan
        open={addNewPlan}
        handleClose={() => setAddNewPlan(false)}
      />

      <Tabs defaultActiveKey="1" items={tabItems} />
    </div>
  );
};
