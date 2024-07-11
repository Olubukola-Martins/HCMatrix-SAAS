import React from "react";
import WalletOverviewInfoCards from "./cards/WalletOverviewInfoCards";
import WalletOverviewDetailsCard from "./cards/WalletOverviewDetailsCard";
import WalletOverviewBalanceGraph from "./WalletOverviewBalanceGraph";

const WalletOverviewContainer = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
      <WalletOverviewInfoCards
        data={{}}
        className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      />
      <WalletOverviewDetailsCard
        data={[
          {
            accountNo: "1234567890",
            bankName: "HDFC Bank",
          },
          {
            accountNo: "1234567890",
            bankName: "Fidelity Bank",
          },
        ]}
        showActions
        className="col-span-2 lg:col-span-1 border rounded-md p-4 shadow-sm bg-card hover:shadow-md"
      />
      <WalletOverviewBalanceGraph className="col-span-4 mt-8" />
    </div>
  );
};

export default WalletOverviewContainer;
