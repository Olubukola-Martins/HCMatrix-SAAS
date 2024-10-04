import { Checkbox, Form } from "antd";
import React from "react";
import { boxCardTitle, boxStyle, boxTitle, cardStyle } from "styles/reused";
import { AddNoOfUsers } from "./AddNoOfUsers";
import {
  ECreateCompanySubscriptionOps,
  useCreateCompanySubscriptionStateAndDispatch,
} from "features/billing/stateManagers";
import { useGetSubscriptionModules } from "features/billing/hooks/module/useGetSubscriptionModules";
import { TCreateCompanySubscriptionProps } from "features/billing/hooks/company/useCreateCompanySubscription";
import { logger } from "utils/logger";

type IProps = {
  Form: typeof Form;
  pricePerUser: string;
  showModules?: boolean;
};
export const SelectedModulesSection: React.FC<IProps> = ({
  Form,
  pricePerUser,
  showModules = true,
}) => {
  const {
    dispatch,
    state: { planOrModulePrices = [] },
  } = useCreateCompanySubscriptionStateAndDispatch();
  const { data: modules, isLoading: isLoadingModules } =
    useGetSubscriptionModules();

  return (
    <div className={`${cardStyle} text-sm bg-card`}>
      {showModules && (
        <div className="flex items-center justify-between">
          <h5 className={boxCardTitle}>Modules</h5>
        </div>
      )}

      <div>
        <div className="flex flex-col gap-2 mt-5">
          {showModules && (
            <Form.Item<TCreateCompanySubscriptionProps> name={`purchased`}>
              <Checkbox.Group
                className="flex flex-col gap-2"
                onChange={(val: number[]) => {
                  console.log(val, "check");
                  dispatch({
                    type: ECreateCompanySubscriptionOps.updatePlanOrModulesPrices,
                    payload: {
                      planOrModulePrices: modules?.data
                        .filter((p) => val.includes(p.id))
                        .map((p) => p.prices)
                        .flat(),
                    },
                  });
                }}
              >
                {modules?.data.map((module) => (
                  <Checkbox
                    key={module.id}
                    value={module.id}
                    className={`${boxStyle} text-sm flex `}
                  >
                    <span className="capitalize">{module.name}</span>
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </Form.Item>
          )}
          <AddNoOfUsers
            title="Number of License User"
            name="licensedEmployeeCount"
            pricePerUser={pricePerUser}
            Form={Form}
            onChange={(val) =>
              dispatch({
                payload: { licensedEmployeeCount: +val },
                type: ECreateCompanySubscriptionOps.update,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};
