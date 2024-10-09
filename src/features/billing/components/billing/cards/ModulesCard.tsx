import React from "react";
import CardWrapper from "../../ui/CardWrapper";
import { AppButton } from "components/button/AppButton";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import { TSubscriptionLabel } from "features/billing/types/subscription";
import { EmptyDataWrapper } from "components/data/EmptyDataWrapper";
import { generateRandomBgColorClassNameForSubscriptionModule } from "features/billing/utils";

export interface IModulesCardData {
  name: string;
  label: TSubscriptionLabel;
  iconUrl?: string;
  icon: React.ReactNode;
}

interface ModulesCardProps {
  modulesData?: IModulesCardData[];
}

export const SUBSCRIPTION_ICON_MAPPING: Record<
  TSubscriptionLabel,
  React.ReactNode
> = {
  "employee-management": (
    <i className="ri-line-chart-line text-xs text-white font-light" />
  ),
  "core-hr": <i className="ri-book-2-line text-xs text-white font-light" />,
  payroll: <i className="ri-book-2-line text-xs text-white font-light" />,
  "time-and-attendance": (
    <i className="ri-time-line text-xs text-white font-light" />
  ),
  "learning-and-development": null,
  performance: null,
  recruitment: null,
};

const ModulesCard: React.FC<ModulesCardProps> = ({ modulesData = [] }) => {
  const navigate = useNavigate();

  return (
    <CardWrapper className="px-6 pt-6 pb-4 flex flex-col gap-9 w-full lg:col-span-2 col-span-1">
      <div className="font-semibold flex flex-col gap-5">
        <h2 className="font-bold lg:text-lg">Modules</h2>
        <EmptyDataWrapper isEmpty={modulesData.length === 0}>
          <div className="grid grid-cols-2 gap-y-3 gap-x-3 lg:gap-x-5 justify-between">
            {modulesData.map((module, index) => {
              // const bgColors = ["#7987A5", "#4764FF", "#FD8311D1", "#FF6647"];
              // const color = bgColors[index % bgColors.length];
              const bgColor =
                generateRandomBgColorClassNameForSubscriptionModule(index);
              return (
                <div className="flex align-middle items-center gap-x-2">
                  <div
                    className={`h-6 w-6 rounded flex align-middle justify-center py-1  ${bgColor} `}
                  >
                    {module?.iconUrl ? (
                      <img src={module?.iconUrl} alt={module.name} />
                    ) : (
                      SUBSCRIPTION_ICON_MAPPING?.[module.label]
                    )}
                  </div>{" "}
                  <p className="lg:text-lg">{module.name}</p>{" "}
                </div>
              );
            })}
          </div>
        </EmptyDataWrapper>
      </div>

      <div className="ml-auto mr-0">
        <AppButton
          label="Purchase Modules"
          variant="default"
          type="button"
          handleClick={() => navigate(appRoutes.purchaseModules)}
        />
      </div>
    </CardWrapper>
  );
};

export default ModulesCard;
