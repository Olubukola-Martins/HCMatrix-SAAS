import Table, { ColumnsType } from "antd/lib/table";
import { SelfServiceIcon } from "assets/icons";
import { FeatureInfoCard } from "components/cards/FeatureInfoCard";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { TCompanySubscriptionTransaction } from "features/billing/types/company/transaction/companySubscriptionTransaction";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import dayjs from "dayjs";
import React from "react";
import { boxStyle, cardStyle } from "styles/reused";
import { formatNumberWithCommas } from "utils/dataHelpers/formatNumberWithCommas";

const BillingTransactionDetails: React.FC<{
  billingTransaction?: TCompanySubscriptionTransaction;
  isLoading?: boolean;
}> = ({ billingTransaction, isLoading }) => {
  const subscription = billingTransaction?.companySubscription;
  return (
    <div className="space-y-6">
      {/* <PurchasedModules data={subscription?.purchased} isLoading={isLoading} /> */}
      <BillingInsights
        isLoading={isLoading}
        data={{
          billingCycle: subscription?.billingCycle,
          createdAt: dayjs(billingTransaction?.createdAt).format(DEFAULT_DATE_FORMAT),
          licensedEmployeeCount: subscription?.licensedEmployeeCount,
          unlicensedEmployeeCount: subscription?.unlicensedEmployeeCount,
          totalAmountPaid: formatNumberWithCommas(+(billingTransaction?.totalAmountPaid ?? 0)),
        }}
      />
      <EmployeeWithLicenseTable title={`Licensed User (${subscription?.licensedEmployeeCount})`} data={subscription?.employeeLicenses.filter((item) => item.licenseType === "licensed")} loading={isLoading} />

      <EmployeeWithLicenseTable title={`Unlicensed User (${subscription?.unlicensedEmployeeCount})`} data={subscription?.employeeLicenses.filter((item) => item.licenseType === "unlicensed")} loading={isLoading} />
    </div>
  );
};

const BillingInsights: React.FC<{
  data: Partial<Pick<TCompanySubscriptionTransaction["companySubscription"], "billingCycle" | "licensedEmployeeCount" | "unlicensedEmployeeCount"> & Pick<TCompanySubscriptionTransaction, "totalAmountPaid" | "createdAt">>;
  isLoading?: boolean;
}> = ({ data, isLoading }) => {
  const { billingCycle, licensedEmployeeCount, unlicensedEmployeeCount, totalAmountPaid, createdAt } = data;
  const items = [
    { title: "No of Licensed Users", value: licensedEmployeeCount },
    { title: "No of Unlicensed Users", value: unlicensedEmployeeCount },
    { title: "Total Amount Paid", value: totalAmountPaid },
    { title: "Billing Cycle", value: billingCycle },
    { title: "Date", value: createdAt },
  ];
  return (
    <div className={`${cardStyle} text-sm bg-card`}>
      <div className={`${boxStyle} flex gap-x-4 shadow-sm rounded-md`}>
        {items.map(({ title, value }, i) => (
          <div key={i} className={`${i !== items.length - 1 && " border-r"} flex-1  flex flex-col gap-2`}>
            <h6 className={"font-light text-sm capitalize"}>{title}</h6>
            <p className={"font-bold text-lg capitalize"}>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const PurchasedModules: React.FC<{
  data?: TCompanySubscriptionTransaction["companySubscription"]["purchased"];
  isLoading?: boolean;
}> = ({ data, isLoading }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {data?.map((item, i) => (
          <FeatureInfoCard
            icon={
              <div className="rounded-md bg-caramel h-9 w-9 flex justify-center items-center">
                <span className="">
                  <SelfServiceIcon />
                </span>
              </div>
            }
            title={item.subscription.name}
            loading={isLoading}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

const EmployeeWithLicenseTable: React.FC<{
  title: string;
  loading?: boolean;
  data?: TCompanySubscriptionTransaction["companySubscription"]["employeeLicenses"];
}> = ({ title, data, loading }) => {
  const columns: ColumnsType<
    TCompanySubscriptionTransaction["companySubscription"]["employeeLicenses"][0] & {
      key: number;
    }
  > = [
    {
      title: "S/N",
      dataIndex: "S/N",
      key: "S/N",
      render: (val, item) => <span className="capitalize">{item.key}</span>,
    },
    {
      title: "Employee’s ID",
      dataIndex: "Employee’s ID",
      key: "Employee’s ID",
      render: (val, item) => <span className="uppercase">{item.employee.empUid}</span>,
    },
    {
      title: "Employee’s Name",
      dataIndex: "Employee’s Name",
      key: "Employee’s Name",
      render: (val, item) => <span className="capitalize">{getEmployeeFullName(item.employee)}</span>,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h6 className="font-semiblod">{title}</h6>
      <Table columns={columns} size="small"  dataSource={data?.map((item, i) => ({ ...item, key: i + 1 }))} loading={loading} />
    </div>
  );
};
export default BillingTransactionDetails;
