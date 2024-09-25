import { SimpleCard } from "components/cards/SimpleCard";
import { TPayrollWalletDashboardAnalytics } from "features/payroll/types/wallet";
import { useState } from "react";
import { IDivProps } from "types/html";
import { formatNumberWithCommas } from "utils/dataHelpers/formatNumberWithCommas";
import WalletBalanceOverviewDetails from "../WalletBalanceOverviewDetails";

type IProps = Pick<IDivProps, "className"> & {
  data: Partial<{
    balance: number;
    transactions: number;
    debit: number;
    credit: number;
    lastFunded: string;
    balanceOverview: TPayrollWalletDashboardAnalytics["balance"];
  }>;
  isLoading?: boolean;
};
type TAction = "view-balance-overview";
const WalletOverviewInfoCards: React.FC<IProps> = ({
  isLoading,
  data,
  className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6",
}) => {
  const {
    balance = 0,
    transactions = 0,
    debit = 0,
    credit = 0,
    lastFunded = "No data is available!",
    balanceOverview,
  } = data;
  const [action, setAction] = useState<TAction>();
  const handleClose = () => {
    setAction(undefined);
  };
  return (
    <>
      <WalletBalanceOverviewDetails
        data={balanceOverview}
        handleClose={handleClose}
        open={action === "view-balance-overview"}
      />
      <div className={className}>
        <>
          <SimpleCard
            title="Wallet Balance"
            highlight={`${formatNumberWithCommas(balance)}`}
            loading={isLoading}
            handleClick={() => setAction("view-balance-overview")}
          />
          <SimpleCard
            title="Total Transactions"
            highlight={`${formatNumberWithCommas(transactions, 0)}`}
            loading={isLoading}
          />
          {/* <SimpleCard
          title="Total Beneficiaries"
          highlight={`${formatNumberWithCommas(beneficiaries, 0)}`}
          loading={isLoading}
        /> */}
          <SimpleCard
            title="Total Debit"
            highlight={`${formatNumberWithCommas(debit)}`}
            loading={isLoading}
          />
          <SimpleCard
            title="Total Credit"
            highlight={`${formatNumberWithCommas(credit)}`}
            loading={isLoading}
          />
          <SimpleCard
            title="Last Funded Amount"
            highlight={`${formatNumberWithCommas(lastFunded)}`}
            loading={isLoading}
          />
        </>
      </div>
    </>
  );
};

export default WalletOverviewInfoCards;
