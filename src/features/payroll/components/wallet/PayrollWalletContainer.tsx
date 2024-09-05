import { Tabs } from "antd";
import WalletOverviewContainer from "./overview/WalletOverviewContainer";
import WalletTransactionContainer from "./transactions/WalletTransactionContainer";
import WalletSettingsContainer from "./settings/WalletSettingsContainer";
import { WalletTopUpBtn } from "./topup/WalletTopUp";
import { useState } from "react";
import { useRetrievePayrollWallets } from "features/payroll/hooks/wallet/useRetrievePayrollWallets";
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
    const { data:wallets, isLoading:isLoadingWallets } = useRetrievePayrollWallets();
  return (
    <div>
      <Tabs
        activeKey={selectedKey}
        onChange={(val) => setSelectedKey(val as TWalletContainerTabKey)}
        tabBarExtraContent={
          <div className="flex justify-end">
            {["Transactions", "Settings"].includes(selectedKey) ? (
              <WalletTopUpBtn data={wallets} isLoading={isLoadingWallets} />
            ) : null}
          </div>
        }
        items={tabItems.filter((item) => item.hidden !== true)}
      />
    </div>
  );
};

export default PayrollWalletContainer;
