import React from "react";
import ModuleCard, { IModuleCardProps } from "./ModuleCard";

export const ModuleCards: React.FC<{
  data?: IModuleCardProps[];
  loading?: boolean;
}> = ({ data }) => {
  return (
    <div className="w-full flex flex-col items-stretch gap-8">
      {data?.map((module, index) => (
        <ModuleCard key={index} {...module} />
      ))}
    </div>
  );
};
