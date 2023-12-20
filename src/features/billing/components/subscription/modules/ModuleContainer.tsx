import { employeeManagementSvg } from "assets/images";
import React from "react";
import { ModuleCards } from "./ModuleCards";
import { useGetAllSubscriptions } from "features/billing/hooks/useGetAllSubscriptions";
import { Skeleton } from "antd";

const ModuleContainer = () => {
  const { data, isFetching } = useGetAllSubscriptions({ type: "module" });
  return (
    <div className="flex flex-col gap-2">
      <p>Checkbox the module you would like to purchase.</p>
      <Skeleton loading={isFetching} active paragraph={{ rows: 40 }}>
        <ModuleCards
          data={data?.data.map((item) => ({
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
              amount: +item.prices?.[0].monthlyPricePerLicensedEmployee,
              currency: "$",
            },
            title: {
              mainText: item.name,
              supportingText: item.description,
            },
            features: item.resources.map((item) => item.resource.name),
          }))}
        />
      </Skeleton>
    </div>
  );
};

export default ModuleContainer;
