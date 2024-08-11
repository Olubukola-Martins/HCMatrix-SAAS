import { Form } from "antd";
import React from "react";
import { boxCardTitle, boxStyle, boxTitle, cardStyle } from "styles/reused";
import { AddNoOfUsers } from "./AddNoOfUsers";
import { ECreateCompanySubscriptionOps, useCreateCompanySubscriptionStateAndDispatch } from "features/billing/stateManagers";

type IProps = {
  Form: typeof Form;
  pricePerUser: string;
  selectedPlans: string[];
};
export const SelectedPlansSection: React.FC<IProps> = ({ Form,  pricePerUser, selectedPlans }) => {
  const { dispatch } = useCreateCompanySubscriptionStateAndDispatch();
  return (
    <div className={`${cardStyle} text-sm bg-card`}>
        <div className="flex items-center justify-between">
          <h5 className={boxCardTitle}>Plans</h5>
        </div>
      

      <div>
        <div className="flex flex-col gap-2 mt-5">
          
            {selectedPlans.map((plan, index) => (
              <div key={index} className={`${boxStyle} text-sm flex justify-between items-center`}>
                <span>{plan}</span>
                <i className="ri-check-line text-caramel" />
              </div>
            ))}
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
