import { Form } from "antd";
import React from "react";
import { boxCardTitle, boxStyle, boxTitle, cardStyle } from "styles/reused";
import { AddNoOfUsers } from "./AddNoOfUsers";
import { ECreateCompanySubscriptionOps, useCreateCompanySubscriptionStateAndDispatch } from "features/billing/stateManagers";

type IProps = {
  Form: typeof Form;
  pricePerUser: string;
  selectedModules: string[];
  showModules?: boolean;
};
export const SelectedModulesSection: React.FC<IProps> = ({ Form, selectedModules, pricePerUser, showModules = true }) => {
  const { dispatch } = useCreateCompanySubscriptionStateAndDispatch();
  return (
    <div className={`${cardStyle} text-sm bg-card`}>
      {showModules && (
        <div className="flex items-center justify-between">
          <h5 className={boxCardTitle}>Modules</h5>
        </div>
      )}

      <div>
        <div className="flex flex-col gap-2 mt-5">
          {showModules &&
            selectedModules.map((module, index) => (
              <div key={index} className={`${boxStyle} text-sm flex justify-between items-center`}>
                <span>{module}</span>
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
