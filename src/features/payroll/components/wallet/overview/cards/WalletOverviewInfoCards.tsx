import { SimpleCard } from "components/cards/SimpleCard";
import { IDivProps } from "types/html";

type IProps = Pick<IDivProps, "className"> & {
  data: Partial<{
    balance: number;
    transactions: number;
    beneficiaries: number;
    debit: number;
    credit: number;
    weeklyUsage: string;
  }>;
  isLoading?: boolean;
};
const WalletOverviewInfoCards: React.FC<IProps> = ({
  isLoading,
  data,
  className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6",
}) => {
  const {
    balance = 0,
    transactions = 0,
    beneficiaries = 0,
    debit = 0,
    credit = 0,
    weeklyUsage = "No data is available!",
  } = data;
  return (
    <div className={className}>
      <>
        <SimpleCard
          title="Wallet Balance"
          highlight={`${balance}`}
          loading={isLoading}
        />
        <SimpleCard
          title="Total Transactions"
          highlight={`${transactions}`}
          loading={isLoading}
        />
        <SimpleCard
          title="Total Beneficiaries"
          highlight={`${beneficiaries}`}
          loading={isLoading}
        />
        <SimpleCard
          title="Total Debit"
          highlight={`${debit}`}
          loading={isLoading}
        />
        <SimpleCard
          title="Total Credit"
          highlight={`${credit}`}
          loading={isLoading}
        />
        <SimpleCard
          title="Weekly Wallet Usage"
          highlight={`${weeklyUsage}`}
          loading={isLoading}
        />
      </>
    </div>
  );
};

export default WalletOverviewInfoCards;
