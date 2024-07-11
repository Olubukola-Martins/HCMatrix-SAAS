import { Tabs } from "antd";
import WalletOverviewContainer from "./overview/WalletOverviewContainer";
import WalletTransactionContainer from "./transactions/WalletTransactionContainer";
import WalletSettingsContainer from "./settings/WalletSettingsContainer";
import { WalletTopUpBtn } from "./topup/WalletTopUp";
import { useState } from "react";
type TWalletContainerTabKey = "Overview" | "Transactions" | "Settings";
const PayrollWalletContainer = () => {
  const tabItems = [
    {
      key: "Overview",
      label: "Overview",
      children: <WalletOverviewContainer />,
      hidden: false,
    },
    {
      key: "Transactions",
      label: "Transactions",
      children: <WalletTransactionContainer />,
      hidden: false,
    },

    {
      key: "Settings",
      label: "Settings",
      children: <WalletSettingsContainer />,
      hidden: false,
    },
  ];
  const [selectedKey, setSelectedKey] =
    useState<TWalletContainerTabKey>("Overview");
  return (
    <div>
      <Tabs
        activeKey={selectedKey}
        onChange={(val) => setSelectedKey(val as TWalletContainerTabKey)}
        tabBarExtraContent={
          <div className="flex justify-end">
            {["Transactions", "Settings"].includes(selectedKey) ? (
              <WalletTopUpBtn />
            ) : null}
          </div>
        }
        items={tabItems.filter((item) => item.hidden !== true)}
      />
    </div>
  );
};

export default PayrollWalletContainer;
