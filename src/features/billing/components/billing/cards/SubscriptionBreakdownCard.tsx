import { useEffect, useRef, useState } from "react";
import CardWrapper from "../../ui/CardWrapper";
import { AppButton } from "components/button/AppButton";
import { Link } from "react-router-dom";
import { appRoutes } from "config/router/paths";

interface ISubscriptionBreakdownProps {
  isActivePlan?: boolean;
  name: string;
  rateDetails: Array<string>[];
  features: { name: string; sub_cat?: string[] }[];
  featuresPrefix?: string;
  extraStyles?: string;
  id: number;
}

const SubscriptionBreakdownCard: React.FC<ISubscriptionBreakdownProps> = ({
  name,
  extraStyles,
  isActivePlan,
  rateDetails,
  features,
  featuresPrefix,
  id,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSeeMore, setShowSeeMore] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && contentRef.current.scrollHeight > 300) {
      setShowSeeMore(true);
    }
  }, []);
  return (
    <CardWrapper
      className={`overflow-hidden w-full transition-all duration-300 px-5  ${extraStyles} {${
        isExpanded ? "h-fit" : "h-[450px]"
      }  `}
      isActive={isActivePlan}
    >
      <div className="flex justify-between w-full items-center pb-2 ">
        <h2 className="font-bold sm:text-lg">{name} Plan</h2>
        {isActivePlan && (
          <span className="rounded-full h-5 w-5 border-2 border-caramel flex items-center justify-center">
            <i className="ri-check-line text-caramel h-3 w-4 font-bold mb-[10px]" />
          </span>
        )}
      </div>

      <div
        className={`flex flex-col  h-full ${
          showSeeMore ? "gap-y-3" : "gap-y-4"
        }`}
      >
        {rateDetails?.map((details) => (
          <div className="flex flex-col gap-2">
            {details?.map((detail) => (
              <p className=" opacity-85 text-xs sm:text-sm">{detail}</p>
            ))}
          </div>
        ))}

        <div
          className={`flex flex-col gap-y-2 overflow-hidden transition-all duration-300 ${
            isExpanded ? "h-fit" : "h-[200px]"
          }`}
          ref={contentRef}
        >
          <p className="text-sm sm:text-base font-medium">Features</p>
          {featuresPrefix && (
            <div className="flex gap-x-2">
              <i className="ri-check-line text-caramel h-3 w-4" />
              <p className="text-xs sm:text-sm font-medium text-caramel">
                {featuresPrefix}
              </p>
            </div>
          )}
          {features.map((feature) => (
            <div className="flex flex-col gap-y-2">
              <div className="flex gap-x-2">
                <i className="ri-check-line text-caramel h-3 w-4" />
                <p className="text-xs sm:text-sm font-medium">{feature.name}</p>
              </div>
              {feature.sub_cat?.map((sub) => (
                <div className="flex gap-x-2 pl-3 opacity-50">
                  <i className="ri-checkbox-blank-circle-fill scale-50" />
                  <p className="text-xs sm:text-sm">{sub}</p>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-x-4 align-baseline ml-auto mr-0 ">
          {showSeeMore && (
            <p
              className={`text-caramel hover:opacity-65 cursor-pointer ${
                !isExpanded && "underline underline-offset-1"
              }`}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "See less" : "See more"}
            </p>
          )}
          {!isActivePlan && (
            <Link to={appRoutes.purchaseSubscriptionByPlan(id).path}>
              <AppButton
                label={`Upgrade to ${name}`}
                type="button"
                variant="transparent"
              />
            </Link>
          )}
        </div>
      </div>
    </CardWrapper>
  );
};

export default SubscriptionBreakdownCard;
