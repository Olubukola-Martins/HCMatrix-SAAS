import { Form } from "antd";
import React, { useEffect } from "react";
import { boxCardTitle, boxStyle, cardStyle } from "styles/reused";
import { AddNoOfUsers } from "./AddNoOfUsers";
import {
  ECreateCompanySubscriptionOps,
  useCreateCompanySubscriptionStateAndDispatch,
} from "features/billing/stateManagers";
import { useGetGetSubscriptionPlanById } from "features/billing/hooks/plan/useGetGetSubscriptionPlanById";

type IProps = {
  Form: typeof Form;
  pricePerUser: string;
  planId?: number;
};
export const SelectedPlansSection: React.FC<IProps> = ({
  Form,
  pricePerUser,
  planId,
}) => {
  const { dispatch } = useCreateCompanySubscriptionStateAndDispatch();
  const { data: plan } = useGetGetSubscriptionPlanById({
    id: planId,
  });
  useEffect(() => {
    dispatch({
      type: ECreateCompanySubscriptionOps.updatePlanOrModulesPrices,
      payload: {
        planOrModulePrices: plan?.prices,
      },
    });
  }, [dispatch, plan]);
  return (
    <div className={`${cardStyle} text-sm bg-card`}>
      <div className="flex items-center justify-between">
        <h5 className={boxCardTitle}>Plans</h5>
      </div>

      <div>
        <div className="flex flex-col gap-2 mt-5">
          <div
            className={`${boxStyle} text-sm flex justify-between items-center`}
          >
            <span>{plan?.name}</span>
            <i className="ri-check-line text-caramel" />
          </div>
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
