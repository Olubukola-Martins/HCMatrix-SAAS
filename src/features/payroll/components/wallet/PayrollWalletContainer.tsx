import { Tabs } from "antd";
import WalletOverviewContainer from "./overview/WalletOverviewContainer";
import WalletTransactionContainer from "./transactions/WalletTransactionContainer";
import WalletSettingsContainer from "./settings/WalletSettingsContainer";
import { WalletTopUpBtn } from "./topup/WalletTopUp";

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
  return (
    <div>
      <Tabs
        tabBarExtraContent={
          <div className="flex justify-end">
            <WalletTopUpBtn />
          </div>
        }
        items={tabItems.filter((item) => item.hidden !== true)}
      />
    </div>
  );
};

export default PayrollWalletContainer;
