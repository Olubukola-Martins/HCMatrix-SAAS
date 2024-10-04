import React from "react";
import { Form as _Form, Input } from "antd";
import { cardStyle, boxCardTitle, boxStyle, boxTitle } from "styles/reused";
import {
  numberHasToBeGreaterThanValueRule,
  numberInputValidationRulesOp,
} from "utils/formHelpers/validation";
import { TSubscriptionPlan } from "features/billing/hooks/plan/useGetGetSubscriptionPlanById";
import { FormSupportCaseInput } from "../subscription/addOns/form/FormSupportCaseInput";
import { FormStorageInput } from "../subscription/addOns/form/FormStorageInput";
import { FormTrainingSessionInput } from "../subscription/addOns/form/FormTrainingSessionInput";
import { FormUnlicensedEmployeeAdonInput } from "../subscription/addOns/form/FormUnlicensedEmployeeAdonInput";
import AppSwitch from "components/switch/AppSwitch";
import { PurchaseSubscriptionPlanFormFields } from "./PurchaseSubcsriptionPlan";

const SelectPlanOrAddOns: React.FC<{
  Form: typeof _Form;

  plan?: Pick<TSubscriptionPlan, "name" | "id">;
  onProceed: () => void;
}> = ({
  Form,
  plan,

  onProceed,
}) => {
  return (
    <>
      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-7 text-accent">
        <div className="flex flex-col gap-4">
          {/* selected plan */}
          <div className={`${cardStyle} text-sm bg-card`}>
            <div className="flex items-center justify-between">
              <h5 className={boxCardTitle}>Plan</h5>
            </div>

            <div>
              <div className="flex flex-col gap-2 mt-5">
                <div
                  className={`${boxStyle} text-sm flex justify-between items-center`}
                >
                  <span>{plan?.name}</span>
                  <i className="ri-check-line text-caramel" />
                </div>
                <div className={`${boxStyle} text-sm`}>
                  <div className="flex items-center justify-between mb-4">
                    <h5 className={boxTitle}>{`Users`}</h5>
                  </div>
                  <div>
                    <Form.Item<PurchaseSubscriptionPlanFormFields>
                      name={"licensedEmployeeCount"}
                      label={`User`}
                      rules={[numberHasToBeGreaterThanValueRule(1)]}
                    >
                      <Input placeholder={`Number of License User`} />
                    </Form.Item>
                    <div className="flex justify-end mt-4">
                      <span className="text-xs">Price Per User: {`N/A`}</span>
                    </div>
                  </div>
                  <div>
                    <Form.Item<PurchaseSubscriptionPlanFormFields>
                      name={"unlicensedEmployeeCount"}
                      label={`User`}
                      rules={numberInputValidationRulesOp}
                    >
                      <Input placeholder={`Number of UnLicensed User`} />
                    </Form.Item>
                    <div className="flex justify-end mt-4">
                      <span className="text-xs">
                        Price Per Unlicensed User: {`N/A`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* selected plan */}

          {/* add-on section */}
          <div className={`${boxStyle} text-sm bg-card`}>
            <div className="flex items-center justify-between mb-4">
              <h5 className={boxTitle}>{`Add Ons`}</h5>
            </div>
            <div className="flex flex-col gap-2 mt-5">
              <Form.Item name="addOns">
                <FormUnlicensedEmployeeAdonInput
                  Form={Form}
                  control={{
                    name: "unlicensedEmployeeAddOnId",
                    label: `Unlicensed User`,
                  }}
                  optional
                />

                <FormSupportCaseInput
                  Form={Form}
                  control={{ name: "supportCaseId", label: `Support Case` }}
                  optional
                />
                <FormStorageInput
                  Form={Form}
                  control={{ name: "storageId", label: `Storage` }}
                  optional
                />
                <FormTrainingSessionInput
                  Form={Form}
                  control={{
                    name: "trainingSessionId",
                    label: `Training Session`,
                  }}
                  optional
                />
              </Form.Item>
              <div
                className={`${boxStyle} text-sm flex justify-between items-center`}
              >
                <span>{`Auto-Renewal`}</span>
                <Form.Item name="" valuePropName="checked">
                  <AppSwitch
                    size="small"
                    checkedChildren="On"
                    unCheckedChildren="Off"
                  />
                </Form.Item>
              </div>
            </div>
          </div>
          {/* add-on section */}
        </div>

        <div className="flex flex-col gap-4">
          {/* summary section */}
          {/* <SummarySection
            subscriptions={subscriptions}
            loading={isLoading}
            proceed={{
              text: "Proceed",
              fn() {
                onProceed();
              },
            }}
          /> */}
        </div>
      </div>
    </>
  );
};

export default SelectPlanOrAddOns;
