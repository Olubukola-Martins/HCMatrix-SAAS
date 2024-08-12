import  { useState } from "react";
import WalletOverviewInfoCards from "./cards/WalletOverviewInfoCards";
import WalletOverviewDetailsCard from "./cards/WalletOverviewDetailsCard";
import WalletOverviewBalanceGraph from "./WalletOverviewBalanceGraph";
import { CURRENT_YEAR } from "constants/dateFormats";
import { useGetPayrollWalletDashboardAnalytics } from "features/payroll/hooks/wallet/useGetPayrollWalletDashboardAnalytics";
import { TPayrollGraphAnalyticsItemType } from "features/payroll/types/payroll";
import { useRetrievePayrollWallets } from "features/payroll/hooks/wallet/useRetrievePayrollWallets";

const CHART_ITEMS: TPayrollGraphAnalyticsItemType[] = [
  "bar-chart",
  "line-chart",
  "scatter-chart",
  "waterfall-chart",
  "pie-chart",
  "histogram",
  "area-graph",
  "spider-chart",
];

const WalletOverviewContainer = () => {
  const [chartItem, setChartItem] = useState<TPayrollGraphAnalyticsItemType>(
    CHART_ITEMS[0]
  );
  const [year, setYear] = useState<string>(CURRENT_YEAR);

  const { data, isLoading } = useGetPayrollWalletDashboardAnalytics({
    type: chartItem,
    year,
  });
  const { data:wallets, isLoading:isLoadingWallets } = useRetrievePayrollWallets();
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
      <WalletOverviewInfoCards
        data={{
          balance: Object.values(data?.balance ?? {}).reduce((prev, curr) => prev + curr, 0), 
         credit: data?.totalCredit,
         debit: data?.totalDebit, 
         transactions: data?.totalTransactions, 
         weeklyUsage: data?.lastFundedAmount.toString(),
         
        }}
        className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        isLoading={isLoading}
      />
      <WalletOverviewDetailsCard
      isLoading={isLoadingWallets}
        data={wallets}
        showActions
        className="col-span-2 lg:col-span-1 border rounded-md p-4 shadow-sm bg-card hover:shadow-md"
      />
      <WalletOverviewBalanceGraph className="col-span-4 mt-8" {...{
        chartItem, 
        setChartItem, 
        setYear, 
        year,
        isLoading,
        data: data?.graphData
      }}/>
    </div>
  );
};

export default WalletOverviewContainer;
