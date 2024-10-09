import { Radio } from "antd";
import CardWrapper from "../../ui/CardWrapper";

interface IProps {
  planId: number;
  planName: string;
  planRates: string;
  isCurrentPlan?: boolean;
  isSelectedPlan?: boolean;
  isSelectable?: boolean;
}

const PlanUpgradeSelectCard = ({
  planName,
  planRates,
  isSelectable = true,
  isCurrentPlan,
  isSelectedPlan,
  planId,
}: IProps) => {
  return (
    <CardWrapper
      className={`flex gap-x-2 w-full ${isSelectable && "cursor-not-allowed"}`}
      isActive={isSelectedPlan}
    >
      <Radio value={planId} disabled={!isSelectable} />
      <div className="flex flex-col gap-y-3 w-full h-fit">
        <div className="flex justify-between font-medium text-sm">
          <p>{planName}</p>
          {(isSelectable || isCurrentPlan) && (
            <p className={`${isSelectable && "opacity-70"}`}>
              {isCurrentPlan ? "Current plan" : ""}
            </p>
          )}
        </div>
        <p className="opacity-85 font-normal text-base"> {planRates} </p>
      </div>
    </CardWrapper>
  );
};

export default PlanUpgradeSelectCard;
