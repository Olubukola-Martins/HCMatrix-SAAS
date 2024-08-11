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
    <CardWrapper className={`flex gap-x-2 ${isComingSoon && "cursor-not-allowed"}`} isSelectable={!isComingSoon} isActive={isSelectedPlan}>
      <Radio value={planName.toLowerCase()} disabled={isComingSoon} />
      <div className="grid grid-col gap-y-3">
        <div className="flex justify-between font-medium text-sm">
          <p>{planName} Plan</p>
          {(isComingSoon || isCurrentPlan) && <p className={`${isComingSoon && "opacity-80"}`}>{isComingSoon ? "Coming soon" : "Current plan"}</p>}
        </div>
        <p className="opacity-85">{planRates}</p>
      </div>
    </CardWrapper>
  );
};

export default PlanUpgradeSelectCard;
