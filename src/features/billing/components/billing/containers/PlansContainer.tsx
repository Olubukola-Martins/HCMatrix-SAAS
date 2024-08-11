import React from "react";
import SubscriptionPlansCard from "../cards/SubscriptionPlansCard";
import { basicPlanFeatures, basicPlanModulesMockData, freePlanModulesMockData, premiumPlanFeatures, premiumPlanModulesMockData, rateDetails } from "features/billing/utils/data";
import { Carousel } from "antd";
import SubscriptionBreakdownCard from "../cards/SubscriptionBreakdownCard";

const basicPlanFeatMockData: { name: string; sub_cat?: string[] }[] = basicPlanFeatures;
const premiumPlanFeatMockData: { name: string; sub_cat?: string[] }[] = premiumPlanFeatures;

const PlansContainer = () => {
  return (
    <div className="flex flex-col gap-y-9">
      <div className="flex flex-col gap-4">
        <p className="font-bold text-lg">Subscription Plans on Module based</p>
        <div className="flex max-w-full justify-evenly max-lg:hidden">
          <SubscriptionPlansCard name="Free" modules={freePlanModulesMockData} description="Eligibility: Users with 5 employees or below" costDescription=" Free, with a charge for each payroll run. " />
          <span className="border-r-[3px] mr-2 border-[#CBCBCB] h-64" />
          <SubscriptionPlansCard name="Basic" modules={basicPlanModulesMockData} costDescription="Subscription fee." />
          <span className="border-r-[3px] mr-2 border-[#CBCBCB] h-64" />
          <SubscriptionPlansCard name="Premium" modules={premiumPlanModulesMockData} />
        </div>

        <div className="lg:hidden w-full">
          <Carousel className=" mx-auto flex justify-center items-center w-full" dots={true} autoplay>
            <SubscriptionPlansCard name="Free" extraClass="mx-auto" modules={freePlanModulesMockData} description="Eligibility: Users with 5 employees or below" costDescription=" Free, with a charge for each payroll run. " />
            <SubscriptionPlansCard name="Basic" extraClass="max-auto" modules={basicPlanModulesMockData} costDescription="Subscription fee." />
            <SubscriptionPlansCard name="Premium" extraClass="mx-auto" modules={premiumPlanModulesMockData} />
          </Carousel>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="font-bold text-lg">Subscription Breakdown of Plan with pricing </p>
        <div className="flex justify-around">
          <SubscriptionBreakdownCard name="Basic" rateDetails={rateDetails} isActivePlan={true} features={basicPlanFeatMockData} extraStyles="w-2/5" />
          <SubscriptionBreakdownCard featuresPrefix="Includes all Basic plan features plus:" name="Premium" rateDetails={rateDetails} features={premiumPlanFeatMockData} extraStyles="w-2/5" />
        </div>
      </div>
    </div>
  );
};

export default PlansContainer;
