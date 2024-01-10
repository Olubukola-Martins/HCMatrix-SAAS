import { AppButton } from "components/button/AppButton";
import { SummaryCard } from "components/cards/SummaryCard";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { PRICE_TYPE_CURRENCY } from "features/billing/constants";
import { useGetCompanyActiveSubscription } from "features/billing/hooks/company/useGetCompanyActiveSubscription";
import moment from "moment";
import { useState } from "react";
import { boxStyle } from "styles/reused";
import { formatNumberWithCommas } from "utils/dataHelpers/formatNumberWithCommas";
import { CancelSubscription } from "../../subscription/CancelSubscription";
import BillingInvoice from "../BillingInvoice";

const BillingSubscriptionBalance = () => {
  const { isFetching, data } = useGetCompanyActiveSubscription();
  const [action, setAction] = useState<
    "cancel-subscription" | "download-invoice"
  >();

  return (
    <div className="grid grid-cols-2">
      <CancelSubscription
        open={action === "cancel-subscription"}
        handleClose={() => setAction(undefined)}
      />
      <BillingInvoice
        open={action === "download-invoice"}
        handleClose={() => setAction(undefined)}
        subscription={data}
      />
      <div
        className={`${boxStyle} text-sm bg-card flex flex-col gap-4 items-stretch`}
      >
        <SummaryCard
          title="Subscription Balance"
          isLoading={isFetching}
          highlights={[
            {
              name: "Number of User",
              value: data
                ? formatNumberWithCommas(
                    data.licensedEmployeeCount + data.unlicensedEmployeeCount,
                    0
                  )
                : 0,
            },
            {
              name: "Total Balance",
              value: data
                ? `${
                    PRICE_TYPE_CURRENCY[data?.priceType]
                  } ${formatNumberWithCommas(
                    data?.transaction?.totalAmountPaid
                  )}`
                : "", //TODO: Refactor to a function to avoid repetion
            },
          ]}
          details={[
            {
              name: "Start Date",
              value: moment(data?.startDate).format(DEFAULT_DATE_FORMAT),
            },
            {
              name: "Expiry Date",
              value: moment(data?.endDate).format(DEFAULT_DATE_FORMAT),
            },
            {
              name: "Total Amount for License Purchase",
              value: data
                ? `${
                    PRICE_TYPE_CURRENCY[data?.priceType]
                  } ${formatNumberWithCommas(
                    data?.transaction?.totalAmountPaid
                  )}`
                : "",
            },
          ]}
        />

        {!!data?.autoRenew && (
          <AppButton
            label="Cancel Subscription"
            handleClick={() => setAction("cancel-subscription")}
            type="button"
            additionalClassNames={["button", "w-full"]}
          />
        )}
        <p
          onClick={() => setAction("download-invoice")}
          className="text-center capitalize text-caramel cursor-pointer underline hover:no-underline my-4"
        >
          Download Invoice
        </p>
        <p className="text-center">
          By proceeding, you agree to our{" "}
          <a href="/" target="_blank" className="capitalize text-caramel">
            privacy policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default BillingSubscriptionBalance;
