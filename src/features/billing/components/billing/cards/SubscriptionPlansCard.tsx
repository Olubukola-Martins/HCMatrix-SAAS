import React from "react";

interface ISubscriptionPlansCardProps {
  extraClass?: string;
  name: string;
  description?: string;
  modules: string[];
  costDescription?: string;
}

const SubscriptionPlansCard: React.FC<ISubscriptionPlansCardProps> = ({
  extraClass,
  name,
  description,
  modules,
  costDescription,
}) => {
  return (
    <div className={`h-64 flex flex-col justify-between ${extraClass}`}>
      <div>
        <h2 className="sm:text-lg flex flex-col gap-y-2 font-bold">{name}</h2>
        {description && (
          <p className="text-xs sm:text-sm opacity-75">{description}</p>
        )}
      </div>
      <div className="flex flex-col gap-y-2">
        <p className="text-sm sm:text-base">Modules</p>
        {modules.map((module) => (
          <div className="flex gap-x-2">
            <i className="ri-check-line text-caramel h-3 w-4" />
            <p className="text-xs sm:text-sm">{module}</p>
          </div>
        ))}
      </div>

      {costDescription && (
        <p className="text-xs sm:text-sm opacity-75 font-bold">
          Cost:{costDescription}
        </p>
      )}
    </div>
  );
};

export default SubscriptionPlansCard;
