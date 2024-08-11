import { Checkbox } from "antd";
import React from "react";
import CardWrapper from "../../ui/CardWrapper";

export interface IModuleCardProps {
  pricePerLicensedEmployee?: {
    amount: number;
    currency: string;
  };
  icon: React.ReactNode;
  title: {
    mainText: string;
    supportingText?: string;
  };
  features?: string[];
  disabled?: boolean;
  subscriptionId?: number;
}
const ModuleCard: React.FC<IModuleCardProps & { Checkbox: typeof Checkbox }> = ({ features, disabled, icon, pricePerLicensedEmployee, title, subscriptionId, Checkbox }) => {
  return (
    <CardWrapper className="p-8 flex flex-col gap-y-7 items-stretch h-full" isActive={true}>
      <div className="flex justify-between items-center py-1">
        <div className="flex gap-4">
          <div className="flex gap-10 items-center">{icon}</div>
          <div className="flex flex-col">
            <h5 className="text-base text-accent  font-semibold">{title.mainText}</h5>
            {title?.supportingText ? <p className="[font-family:'Avenir_LT_Std-55Roman',Helvetica] font-normal text-[#3a3a3a99] text-[16px] tracking-[0] leading-[24px] whitespace-">{title?.supportingText}</p> : null}
          </div>
        </div>
        <Checkbox disabled={disabled} value={subscriptionId} />
      </div>

      <div className="inline-flex items-start justify-between w-full">
        <div className="inline-flex flex-col items-start justify-center gap-[8px] w-5/6">
          <div className="relative w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-semibold text-text-slate-color110 text-[16px] text-center tracking-[0.16px] leading-[normal] whitespace-nowrap">Include</div>
          <p className="relative w-fit [font-family:'Roboto',Helvetica] font-normal text-text-slate-color70 text-[16px] text-center tracking-[0.16px] leading-[normal] whitespace">Everything you get in this plan</p>
        </div>

        <div className="inline-flex flex-col items-center justify-center gap-[2px] ">
          <div className="inline-flex items-start gap-[2px] ">
            <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-semibold text-black text-[18px] text-center tracking-[-0.18px] leading-[normal]">{pricePerLicensedEmployee?.currency}</div>
            <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-semibold text-[#3a3a3a] text-[34px] text-center tracking-[-0.34px] leading-[normal]">{pricePerLicensedEmployee?.amount}</div>
          </div>
          <div className="relative w-fit [font-family:'Roboto',Helvetica] font-normal text-text-slate-color40 text-[14px] text-center tracking-[0.14px] leading-[normal] whitespace-nowrap">{pricePerLicensedEmployee ? "per employee" : ""}</div>
        </div>
      </div>

      <div className="flex flex-col items-start justify-start gap-3 px-1">
        <h3 className="font-semibold text-base">Features</h3>
        <div className="grid grid-cols-2 gap-y-3 justify-between relative self-stretch w-full">
          {features?.map((feature, i) => (
            <div key={i} className={`relative w-full flex items-center gap-3  `}>
              <i className="ri-check-line text-caramel text-lg w-[12px]" />
              <p className="flex-2">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </CardWrapper>
  );
};

export default ModuleCard;
