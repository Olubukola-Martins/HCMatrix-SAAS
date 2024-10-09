import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { useNavigate } from "react-router-dom";
import { ErrorBoundary } from "components/errorHandlers/ErrorBoundary";
import { Segmented } from "antd";
import Capsule from "../components/ui/Capsule";
import { AppButton } from "components/button/AppButton";
import BillingContainer from "../components/billing/containers/BillingContainer";
import BillingHistoryContainer from "../components/billing/containers/BillingHistoryContainer";
import PlansContainer from "../components/billing/containers/PlansContainer";
import ModuleContainer from "../components/subscription/modules/ModuleContainer";
import BillingInfo from "../components/billing/billingInfo/BillingInfo";
import React, { useState } from "react";
import { TCompanySubscription } from "../types/company/companySubscription";
import { TSubscriptionPriceType } from "../types/priceType";
import { TBillingCycle } from "../types/billingCycle";

type THeadingCapsule = {
  text:
    | "Billing"
    | "Plans"
    | "Billing History"
    | "Modules Purchased"
    | "Billing Address";
  tab: React.ReactNode;
};
const headingCapsulesDef = (
  filter: Pick<TCompanySubscription, "currency" | "billingCycle">
): THeadingCapsule[] => [
  { text: "Billing", tab: <BillingContainer /> },
  { text: "Plans", tab: <PlansContainer {...filter} /> },
  {
    text: "Modules Purchased",
    tab: <ModuleContainer {...filter} />,
  },
  { text: "Billing History", tab: <BillingHistoryContainer /> },
  { text: "Billing Address", tab: <BillingInfo /> },
];
const SubsciptionManagement = () => {
  const [filter, setFilter] = useState<
    Pick<TCompanySubscription, "currency" | "billingCycle">
  >({
    billingCycle: "monthly",
    currency: "USD",
  });

  const headingCapsules = headingCapsulesDef(filter);
  const [currentContentCapsule, setCurrentContentCapsule] =
    useState<THeadingCapsule["text"]>("Billing");

  const navigate = useNavigate();

  const renderButton = () => {
    if (currentContentCapsule === "Billing") {
      return (
        <AppButton
          label="Purchase Extra License"
          variant="default"
          type="button"
          handleClick={() => {
            navigate(appRoutes.purchaseExtraLiense);
          }}
        />
      );
    }
    return null;
  };
  const renderSegmentedControl = () => {
    if (
      currentContentCapsule === "Plans" ||
      currentContentCapsule === "Modules Purchased"
    ) {
      return (
        <div className="flex gap-x-2">
          <Segmented
            options={["USD", "NGN"].map((item) => ({
              label: <span className="uppercase">{item}</span>,
              value: item,
            }))}
            size="large"
            value={filter.currency}
            onChange={(val) => {
              setFilter((v) => ({
                ...v,
                currency: val as TSubscriptionPriceType,
              }));
            }}
          />
          <Segmented
            value={filter.billingCycle}
            options={["monthly", "yearly"].map((item) => ({
              label: <span className="capitalize">{item}</span>,
              value: item,
            }))}
            size="large"
            onChange={(val) =>
              setFilter((v) => ({
                ...v,
                billingCycle: val as TBillingCycle,
              }))
            }
          />
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <ErrorBoundary>
        <div className="Container space-y-4 lg:space-y-8 flex flex-col">
          {/* heading area */}
          <div className="flex flex-col gap-3">
            <PageIntro title="Subscription" />
            <h2 className="text-accent text-base">
              Modify your billing and payments information.
            </h2>
            <div className="flex flex-col lg:flex-row  justify-between gap-4">
              <div className="flex flex-wrap gap-x-3 gap-y-2 sm:justify-between">
                {headingCapsules.map((heading) => (
                  <Capsule
                    name={heading.text}
                    isActive={currentContentCapsule === heading.text}
                    onClick={() => {
                      setCurrentContentCapsule(heading.text);
                    }}
                  />
                ))}
              </div>
              {renderButton()}
              {renderSegmentedControl()}
            </div>
          </div>

          {/* body area */}
          {headingCapsules.find((r) => r.text === currentContentCapsule)?.tab}
        </div>
      </ErrorBoundary>
    </>
  );
};

export default SubsciptionManagement;
