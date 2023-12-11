import { employeeManagementSvg } from "assets/images";
import React from "react";
import { ModuleCards } from "./ModuleCards";

const ModuleContainer = () => {
  return (
    <div className="flex flex-col gap-2">
      <p>Checkbox the module you would like to purchase.</p>
      <ModuleCards
        data={[
          {
            icon: (
              // TODO: Refactor to a module icon component
              <div className="bg-[#3A3A3A] p-2 rounded-md">
                <img
                  className="w-[16px] h-[16px]"
                  alt="Employee Management"
                  src={employeeManagementSvg}
                />
              </div>
            ),
            pricePerEmployee: {
              amount: 0,
              currency: "$",
            },
            title: {
              mainText: "Payroll",
              supportingText: "Payroll subscription",
            },
            features: ["Onboarding", "Payroll", "Payroll subscription"],
          },
        ]}
      />
    </div>
  );
};

export default ModuleContainer;
