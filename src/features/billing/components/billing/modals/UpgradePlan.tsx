import { Modal, Radio, RadioChangeEvent, Space } from "antd";
import { AppButton } from "components/button/AppButton";
import { TCompanySubscription } from "features/billing/types/company/companySubscription";
import React, { useState } from "react";
import { IModalProps } from "types";
import PlanUpgradeSelectCard from "../cards/PlanUpgradeSelectCard";
interface IProps extends IModalProps {
  subscription?: TCompanySubscription;
}

const UpgradePlan: React.FC<IProps> = ({ open, handleClose }) => {
  const [value, setValue] = useState("free");

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <Modal open={open} onCancel={() => handleClose()} footer={null} style={{ top: 5 }} width={`70%`} title={null}>
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-3">
          <p className="text-2xl font-semibold">Upgrade your plan</p>
          <p>Flexible pricing plan that grow with you</p>
        </div>

        <div>
          <p className="text-sm">Annual pricing</p>
        </div>

        <div>
          <Radio.Group onChange={onChange} value={value}>
            <Space direction="vertical">
              {[
                { name: "Free", rates: "$2.47/user/month (billed annually) ", isCurrentPlan: true },
                { name: "Basic", rates: "$2.47/user/month (billed annually) " },
                { name: "Premium", rates: "$4.11/user/month (billed annually)", isComingSoon: false },
              ].map((plan) => (
                <PlanUpgradeSelectCard planName={plan.name} planRates={plan.rates} isComingSoon={plan.isComingSoon} isCurrentPlan={plan.isCurrentPlan} isSelectable={!plan.isComingSoon} isSelectedPlan={plan.name.toLowerCase() === value} />
              ))}
            </Space>
          </Radio.Group>
        </div>
      </div>

      <div className="flex justify-between align-middle">
        <AppButton label="Cancel" variant="default" type="reset" />
        <AppButton label="Proceed" type="submit" disabled={value === "free"} />
      </div>
    </Modal>
  );
};

export default UpgradePlan;
