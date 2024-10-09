import { Radio } from "antd";
import CardWrapper from "../../ui/CardWrapper";

interface IProps {
  planId: number;
  planName: string;
  planRates: string;
  isCurrentPlan?: boolean;
  isSelectedPlan?: boolean;
}

const PlanUpgradeSelectCard = ({
  planName,
  planRates,
  isCurrentPlan,
  isSelectedPlan,
  planId,
}: IProps) => {
  return (
    <CardWrapper
      className={`flex gap-x-2 w-full ${isCurrentPlan && "cursor-not-allowed"}`}
      isActive={isSelectedPlan}
    >
      <Radio
        value={planId}
        disabled={isCurrentPlan}
        className="w-full relative"
      >
        <div className="space-y-3 w-full items-stretch  h-fit">
          <div className="flex w-full justify-between font-medium text-sm">
            <p>{planName}</p>

            {isCurrentPlan && (
              <p className={`${"opacity-70 absolute right-0"}`}>Current plan</p>
            )}
          </div>
          <p className="opacity-85 font-normal text-base  w-full">
            {" "}
            {planRates}{" "}
          </p>
        </div>
      </Radio>
    </CardWrapper>
  );
};

export default PlanUpgradeSelectCard;
