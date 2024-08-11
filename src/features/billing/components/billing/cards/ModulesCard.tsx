import React from "react";
import CardWrapper from "../../ui/CardWrapper";
import { AppButton } from "components/button/AppButton";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";

export interface IModulesCardData {
  name: string;
  icon?: React.ReactNode;
}

interface ModulesCardProps {
  modulesData?: IModulesCardData[];
}
export const modules: IModulesCardData[] = [
  { name: "Employee Management", icon: <i className="ri-line-chart-line text-xs text-white font-light" /> },
  { name: "Core HR", icon: <i className="ri-book-2-line text-xs text-white font-light" /> },
  { name: "Time and Attendance", icon: <i className="ri-time-line text-xs text-white font-light" /> },
  { name: "Payroll", icon: <i className="ri-book-2-line text-xs text-white font-light" /> },
];

const ModulesCard: React.FC<ModulesCardProps> = ({ modulesData = modules }) => {
  const navigate = useNavigate();

  return (
    <CardWrapper className="px-6 pt-6 pb-4 flex flex-col gap-9 w-full sm:w-auto mx-auto ">
      <div className="font-semibold flex flex-col gap-5">
        <h2 className="font-bold lg:text-lg">Modules</h2>
        <div className="grid grid-cols-2 gap-y-3 gap-x-3 lg:gap-x-5 justify-between">
          {modulesData.map((module, index) => {
            // const bgColors = ["#7987A5", "#4764FF", "#FD8311D1", "#FF6647"];
            // const color = bgColors[index % bgColors.length];
            const bgColor = index % 4 === 0 ? "bg-[#7987A5]" : index % 4 === 1 ? "bg-[#4764FF]" : index % 4 === 2 ? "bg-[#FD8311D1]" : "bg-[#FF6647]";
            return (
              <div className="flex align-middle items-center gap-x-2">
                <div className={`h-6 w-6 rounded flex align-middle justify-center py-1  ${bgColor} `}>{module.icon ? module.icon : modules[0].icon}</div> <p className="lg:text-lg">{module.name}</p>{" "}
              </div>
            );
          })}
        </div>
      </div>

      <div className="ml-auto mr-0">
        <AppButton label="Purchase Modules" variant="default" type="button" handleClick={() => navigate(appRoutes.purchaseModules)} />
      </div>
    </CardWrapper>
  );
};

export default ModulesCard;
