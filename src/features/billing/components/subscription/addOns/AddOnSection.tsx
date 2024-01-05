import { Form, Select } from "antd";
import React from "react";
import { boxStyle, boxTitle } from "styles/reused";
import { generalValidationRules } from "utils/formHelpers/validation";
import AppSwitch from "components/switch/AppSwitch";
import { AddNoOfUsers } from "./AddNoOfUsers";
import { useGetAllSupportCases } from "features/billing/hooks/addOns/supportCase/useGetAllSupportCases";
import { useGetAllExtraStorages } from "features/billing/hooks/addOns/extraStorage/useGetAllExtraStorages";
import { useGetAllTrainingSessions } from "features/billing/hooks/addOns/trainingSession/useGetAllTrainingSessions";
import {
  ECreateCompanySubscriptionOps,
  useCreateCompanySubscriptionStateAndDispatch,
} from "features/billing/stateManagers";

type IProps = {
  Form: typeof Form;
  pricePerUser: string;
  autoRenewal: boolean;
  handleAutoRenewal: (val: boolean) => void;
};
export const AddOnSection: React.FC<IProps> = ({
  Form,
  pricePerUser,
  autoRenewal,
  handleAutoRenewal,
}) => {
  const { dispatch } = useCreateCompanySubscriptionStateAndDispatch();
  return (
    <div className={`${boxStyle} text-sm bg-card`}>
      <div className="flex items-center justify-between">
        <h5 className={boxTitle}>Add Ons</h5>
      </div>

      <div>
        <div className="flex flex-col gap-2 mt-5">
          <AddNoOfUsers
            title="Number of Unlicensed User"
            name="unlicensedEmployeeCount"
            pricePerUser={pricePerUser}
            Form={Form}
            onChange={(val) =>
              dispatch({
                payload: { unlicensedEmployeeCount: +val },
                type: ECreateCompanySubscriptionOps.update,
              })
            }
          />
          <Form.Item name="addOns">
            <SupportCaseAddon Form={Form} />
            <ExtraStorageAddon Form={Form} />
            <TrainingSessionAddon Form={Form} />
          </Form.Item>
          <div
            className={`${boxStyle} text-sm flex justify-between items-center`}
          >
            <span>{`Auto-Renewal`}</span>
            <AppSwitch
              size="small"
              checked={autoRenewal}
              checkedChildren="On"
              unCheckedChildren="Off"
              onChange={handleAutoRenewal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
const TrainingSessionAddon: React.FC<{ Form: typeof Form }> = ({ Form }) => {
  const { data, isFetching } = useGetAllTrainingSessions();
  const { dispatch } = useCreateCompanySubscriptionStateAndDispatch();

  return (
    <SelectAddon
      Form={Form}
      name={["addOns", "trainingSessionId"]}
      title={"Training Session"}
      options={data?.data.map((item) => ({ label: item.name, value: item.id }))}
      isLoading={isFetching}
      onChange={(val) =>
        dispatch({
          payload: { addOns: { trainingSessionId: +val } },
          type: ECreateCompanySubscriptionOps.updateAddOnsOnly,
        })
      }
    />
  );
};
const ExtraStorageAddon: React.FC<{ Form: typeof Form }> = ({ Form }) => {
  const { data, isFetching } = useGetAllExtraStorages();
  const { dispatch } = useCreateCompanySubscriptionStateAndDispatch();

  return (
    <SelectAddon
      Form={Form}
      name={["addOns", "extraStorageId"]}
      title={"Extra Storage"}
      options={data?.data.map((item) => ({ label: item.name, value: item.id }))}
      isLoading={isFetching}
      onChange={(val) =>
        dispatch({
          payload: { addOns: { extraStorageId: +val } },
          type: ECreateCompanySubscriptionOps.updateAddOnsOnly,
        })
      }
    />
  );
};
const SupportCaseAddon: React.FC<{ Form: typeof Form }> = ({ Form }) => {
  const { data, isFetching } = useGetAllSupportCases();
  const { dispatch } = useCreateCompanySubscriptionStateAndDispatch();
  return (
    <SelectAddon
      Form={Form}
      name={["addOns", "supportCaseId"]}
      title={"Support Case"}
      options={data?.data.map((item) => ({ label: item.name, value: item.id }))}
      isLoading={isFetching}
      onChange={(val) =>
        dispatch({
          payload: { addOns: { supportCaseId: +val } },
          type: ECreateCompanySubscriptionOps.updateAddOnsOnly,
        })
      }
    />
  );
};
const SelectAddon: React.FC<
  Pick<IProps, "Form"> & {
    name: string | string[];
    title: string;
    options?: { label: string; value: string | number }[];
    isLoading?: boolean;
    onChange?: (val: number | string) => void;
  }
> = ({ Form, name, title, options = [], isLoading, onChange }) => {
  return (
    <div className={`${boxStyle} text-sm`}>
      <div className="flex items-center justify-between mb-4">
        <h5 className={boxTitle}>{title}</h5>
      </div>
      <Form.Item name={name} rules={generalValidationRules}>
        <Select
          placeholder={title}
          options={options}
          loading={isLoading}
          onChange={(val) => onChange?.(val)}
        />
      </Form.Item>
    </div>
  );
};
