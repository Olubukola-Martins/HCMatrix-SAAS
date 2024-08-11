import React from "react";
import CardWrapper from "../../ui/CardWrapper";
import formatCurrency from "features/billing/utils/currencyFormatter";
import { TSubscriptionPriceType } from "features/billing/types/priceType";
import ProgressBar from "features/home/components/ProgressBar";
import { AppButton } from "components/button/AppButton";

interface CurrentPlanCardProps {
  currentPlanName: string;
  billingPrice: number;
  currency?: TSubscriptionPriceType;
  billingRate?: string;
  currentUsers: number;
  usersLimit: number;
  borderedProgressBar?: boolean;
  showUpgradeBtn?: boolean;
  extraStyles?: string;
}

const CurrentPlanCard: React.FC<CurrentPlanCardProps> = ({ currentPlanName, extraStyles, billingPrice, currentUsers, usersLimit, borderedProgressBar = false, showUpgradeBtn = true, currency = "usd", billingRate = "user/mnth" }) => {
  return (
    <CardWrapper className={`px-6 pt-6 pb-4 flex flex-col gap-9 w-full sm:w-80  ${extraStyles}`}>
      <div className="font-semibold flex flex-col gap-3">
        <h2 className="font-bold lg:text-lg">{currentPlanName} Plan</h2>
        <p className="lg:text-lg">
          {formatCurrency({ amount: billingPrice, currency })} <span className="opacity-75">/{billingRate}</span>
        </p>
        {borderedProgressBar ? (
          <CardWrapper className="py-3">
            <p className=" text-sm lg:text-base mb-2">
              {currentUsers}/{usersLimit} <span className="opacity-50"> Users</span>
            </p>
            <ProgressBar width={`${(currentUsers / usersLimit) * 100}%`} />
          </CardWrapper>
        ) : (
          <div>
            <p className=" text-sm lg:text-base mb-2">
              {currentUsers}/{usersLimit} <span className="opacity-50"> Users</span>
            </p>

            <ProgressBar width={`${(currentUsers / usersLimit) * 100}%`} />
          </div>
        )}
      </div>

      {showUpgradeBtn && (
        <div className="ml-auto mr-0">
          <AppButton label="Upgrade" variant="default" type="button" />
        </div>
      )}
    </CardWrapper>
  );
};

export default CurrentPlanCard;
