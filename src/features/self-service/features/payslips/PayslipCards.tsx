import { SimpleCard } from "components/cards/SimpleCard";
import React from "react";
import { useGetConferenceRoomAnalytics } from "../conference-room-booking/hooks/useGetConferenceRoomAnalytics";
import moment from "moment";
import { useGetCompanyBaseCurrency } from "hooks/useGetCompanyBaseCurrency";

// TODO: Refactor parent foleder to use standard structure
const PayslipCards = () => {
  const { data, isLoading } = useGetConferenceRoomAnalytics();
  const { formatValueWithCurrency } = useGetCompanyBaseCurrency();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      <>
        <div>
          <SimpleCard
            title="Payment Cycle"
            highlight="Monthly"
            loading={isLoading}
          />
        </div>
        <div>
          <SimpleCard
            title="Current Period"
            highlight="May, 2023"
            loading={isLoading}
          />
        </div>
        <div>
          <SimpleCard
            title="Next Pay Day"
            highlight={moment().add(1, "month").format("DD, MMMM, YYYY")}
            loading={isLoading}
          />
        </div>
        <div>
          <SimpleCard
            title="Gross Salary"
            highlight={formatValueWithCurrency(12_000_000)}
            loading={isLoading}
          />
        </div>
      </>
    </div>
  );
};

export default PayslipCards;
