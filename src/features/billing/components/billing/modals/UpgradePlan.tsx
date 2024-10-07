import {
  Modal,
  Radio,
  RadioChangeEvent,
  Segmented,
  Skeleton,
  Space,
} from "antd";
import { AppButton } from "components/button/AppButton";
import { TCompanySubscription } from "features/billing/types/company/companySubscription";
import React, { useState } from "react";
import { IModalProps } from "types";
import PlanUpgradeSelectCard from "../cards/PlanUpgradeSelectCard";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import AppSwitch from "components/switch/AppSwitch";
import { useGetSubscriptionPlans } from "features/billing/hooks/plan/useGetSubscriptionPlans";
import { EmptyDataWrapper } from "components/data/EmptyDataWrapper";
import { TBillingCycle } from "features/billing/types/billingCycle";
import formatCurrency from "features/billing/utils/currencyFormatter";
import { TSubscriptionPriceType } from "features/billing/types/priceType";
import { calculateSubscriptionPlanTotalPrice } from "features/billing/utils";
interface IProps extends IModalProps {
  subscription?: TCompanySubscription;
}

const UpgradePlan: React.FC<IProps> = ({ open, handleClose, subscription }) => {
  const navigate = useNavigate();
  const [planId, setPlanId] = useState<number>();
  const [isAnnual, setIsAnnual] = useState<boolean>(false);
  const [currency, setCurrency] = useState<TSubscriptionPriceType>("USD");

  const onChange = (e: RadioChangeEvent) => {
    setPlanId(e.target.value);
  };
  const { data, isLoading } = useGetSubscriptionPlans();
  const constructPlansToDisplay = (): {
    planId: number;
    name: string;
    rates: string;
    isCurrentPlan: boolean;
    isFree: boolean;
  }[] => {
    const billingCycle: TBillingCycle = isAnnual ? "yearly" : "monthly";
    return (
      data?.data.map((p) => {
        const amount = calculateSubscriptionPlanTotalPrice(
          p.prices,
          billingCycle,
          currency
        );
        const rates = `${formatCurrency({ amount, currency })}/${billingCycle}`;
        return {
          isCurrentPlan: subscription?.planId === p.id,
          isFree: p.isFree,
          name: p.name,
          planId: p.id,
          rates: rates,
        };
      }) || []
    );
  };
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      style={{ top: 5 }}
      title={null}
    >
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-3">
          <p className="text-2xl font-semibold">Upgrade your plan</p>
          <p>Flexible pricing plan that grow with you</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-4">
            <AppSwitch
              size="small"
              checkedChildren="On"
              unCheckedChildren="Off"
              checked={isAnnual}
              onChange={setIsAnnual}
            />
            <p className="text-sm font-medium">
              {isAnnual ? "Annual Pricing" : "Monthly Pricing"}
            </p>
          </div>
          <Segmented
            options={["USD", "NGN"].map((item) => ({
              label: <span className="uppercase">{item}</span>,
              value: item,
            }))}
            size="small"
            value={currency}
            onChange={(val) => setCurrency(val as TSubscriptionPriceType)}
          />
        </div>

        <Skeleton loading={isLoading} active paragraph={{ rows: 12 }}>
          <EmptyDataWrapper isEmpty={data?.total === 0}>
            <div className="w-full">
              <Radio.Group
                onChange={onChange}
                value={planId}
                className="w-full"
              >
                <Space direction="vertical" className="gap-y-5 w-full">
                  {constructPlansToDisplay().map((plan) => (
                    <PlanUpgradeSelectCard
                      planId={plan.planId}
                      planName={plan.name}
                      planRates={plan.rates}
                      isCurrentPlan={plan.isCurrentPlan}
                      isSelectable={!plan.isCurrentPlan || !plan.isFree}
                      isSelectedPlan={plan.planId === planId}
                    />
                  ))}
                </Space>
              </Radio.Group>
            </div>
          </EmptyDataWrapper>
        </Skeleton>
      </div>

      <div className="flex justify-between align-middle mt-9">
        {/* <p className="hover:text-caramel text-lg font-semibold cursor-pointer">
          Cancel
        </p> */}
        <AppButton
          label="Cancel"
          variant="transparent"
          type="button"
          handleClick={() => {
            handleClose();
          }}
        />
        <AppButton
          label="Proceed"
          type="submit"
          handleClick={() => {
            handleClose();
            navigate(appRoutes.purchaseSubscriptionByPlan(planId).path);
          }}
        />
      </div>
    </Modal>
  );
};

export default UpgradePlan;
