import React, { useState } from "react";
import CardWrapper from "../../ui/CardWrapper";
import { TSubscriptionPriceType } from "features/billing/types/priceType";
import BillingSupportPlan from "../BillingSupportPlan";

interface ISupportPlanCardProps {
  currentRecurringAmount: string;
  currency?: TSubscriptionPriceType;
  date: string;
}

const SupportPlanCard: React.FC<ISupportPlanCardProps> = ({
  currentRecurringAmount,
  date,
}) => {
  const [action, setAction] = useState<"download-support-plan">();
  const handleDownloadSupportPlan = () => {
    setAction("download-support-plan");
  };

  return (
    <>
      <BillingSupportPlan
        open={action === "download-support-plan"}
        handleClose={() => setAction(undefined)}
      />
      <CardWrapper className="px-6 py-6  flex flex-col justify-center justify-items-center gap-9 w-full sm:w-auto max-w-full h-52">
        <div className="font-semibold flex flex-col gap-3">
          <div className="border-b-2 border-card flex-col flex justify-center justify-items-center align-middle gap-3 pb-2">
            <p className="text-center text-xs lg:text-sm opacity-90">
              Current reoccurring amount
            </p>
            <p className="text-center text-sm lg:text-base font-semibold">
              {currentRecurringAmount}
            </p>
          </div>
          <div className="border-b-2 border-card flex-col flex justify-center justify-items-center align-middle gap-3 pb-2">
            <p className="text-center text-xs lg:text-sm opacity-90">
              Next reoccurring date
            </p>
            <p className="text-center text-sm lg:text-base font-semibold">
              {date}
            </p>
          </div>
          <p
            className="text-caramel underline underline-offset-2 cursor-pointer text-center text-sm lg:text-base hover:opacity-65"
            onClick={handleDownloadSupportPlan}
          >
            Download Support Plan
          </p>
        </div>
      </CardWrapper>
    </>
  );
};

export default SupportPlanCard;
