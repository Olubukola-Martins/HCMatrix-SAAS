import { Radio } from "antd";
import CardWrapper from "../../ui/CardWrapper";

interface IProps {
  planName: string;
  planRates: string;
  isComingSoon?: boolean;
  isCurrentPlan?: boolean;
  isSelectedPlan?: boolean;
  isSelectable?: boolean;
}

const PlanUpgradeSelectCard = ({ planName, planRates, isComingSoon, isCurrentPlan, isSelectedPlan }: IProps) => {
  return (
    <CardWrapper className={`flex gap-x-2 w-full ${isComingSoon && "cursor-not-allowed"}`}  isActive={isSelectedPlan}>
      <Radio value={planName.toLowerCase()} disabled={isComingSoon} />
      <div className="flex flex-col gap-y-3 w-full h-fit">
        <div className="flex justify-between font-medium text-sm">
          <p>{planName} Plan</p>
          {(isComingSoon || isCurrentPlan) && <p className={`${isComingSoon && "opacity-70"}`}>{isComingSoon ? "Coming soon" : "Current plan"}</p>}
        </div>
        <p className="opacity-85 font-normal text-base"> {planRates} </p>
      </div>
    </CardWrapper>
  );
};

export default PlanUpgradeSelectCard;
