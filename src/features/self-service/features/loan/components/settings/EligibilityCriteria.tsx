import { Checkbox, Form, InputNumber, Radio, Switch, Tooltip } from "antd";
import { PercentageOutlined } from "@ant-design/icons";
import { generalValidationRules } from "utils/formHelpers/validation";
import { AppButton } from "components/button/AppButton";
import { useContext, useState } from "react";
import { useEligibilityCriteria } from "../../hooks/setting/eligibilityCriteria/useEligibilityCriteria";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";

export const EligibilityCriteria = () => {
  const [employmentDuration, setEmploymentDuration] = useState<boolean>(true);
  const [employmentStatus, setEmploymentStatus] = useState<boolean>(true);
  const [form] = Form.useForm();
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const queryClient = useQueryClient();
  const { mutate, isLoading: createLoading } = useEligibilityCriteria();

  const handleFinish = (values: any) => {
    if (values.selectEmploymentDuration) {
      const { start, end } = values.selectEmploymentDuration;
      values.employmentDuration = { start, end };
      delete values.selectEmploymentDuration;
    }
    mutate(
      {
        ...values,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
            duration: 7.0,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
            duration: 4,
          });
          dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });
          queryClient.invalidateQueries([]);
        },
      }
    );
  };

  return (
    <div>
      <h3 className="font-medium pb-5">Eligibility Criteria</h3>
      <p className="text-sm pb-3">
        Define the employees that are eligible to apply for a loan
      </p>
      <hr />

      <Form layout="vertical" requiredMark={false} onFinish={handleFinish}>
        <div className="flex items-center justify-between my-4">
          <h5 className="font-medium">Select employment duration</h5>
          <Form.Item
            name="employmentDurationSwitch"
            noStyle
            rules={generalValidationRules}
            valuePropName="checked"
            initialValue={true}
          >
            <Switch onChange={(val) => setEmploymentDuration(val)} />
          </Form.Item>
        </div>

        {employmentDuration && (
          <Form.Item
            name="selectEmploymentDuration"
            rules={generalValidationRules}
          >
            <Radio.Group className="flex flex-col gap-4">
              <Radio value={{ start: 1, end: 2 }}>1-2 years</Radio>
              <Radio value={{ start: 3, end: 4 }}>3-4 years</Radio>
              <Radio value={{ start: 5, end: null }}>5 years and above</Radio>
            </Radio.Group>
          </Form.Item>
        )}

        <hr className="mt-4" />

        <div className="flex items-center justify-between my-4">
          <h5 className="font-medium">Select employee status</h5>
          <Form.Item
            name="employee_status"
            noStyle
            rules={generalValidationRules}
            valuePropName="checked"
            initialValue={true}
          >
            <Switch onChange={(val) => setEmploymentStatus(val)} />
          </Form.Item>
        </div>

        {employmentStatus && (
          <Form.Item name="employmentStatus" rules={generalValidationRules}>
            <Checkbox.Group className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Checkbox value="probation">Probation</Checkbox>
              <Checkbox value="confirmed">Confirmed</Checkbox>
              <Checkbox value="suspended">Suspended</Checkbox>
              <Checkbox value="terminated">Terminated</Checkbox>
            </Checkbox.Group>
          </Form.Item>
        )}
        <hr className="my-4" />
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium">Set Maximum Loan Percentage</h4>
            <Tooltip title="This represent the percentage (%) of the annual gross salary of the employee that can be taken as a loan.">
              <i className="ri-information-line text-lg cursor-pointer"></i>
            </Tooltip>
          </div>
          <Form.Item
            name="maxPercentage"
            label="Define the loan percentage (%) of the annual gross salary of the employee that can be taken as a loan"
            rules={generalValidationRules}
          >
            <InputNumber
              min={0}
              max={100}
              placeholder="5"
              suffix={
                <PercentageOutlined style={{ color: "rgba(0,0,0,.45)" }} />
              }
              className="w-full"
            />
          </Form.Item>
        </div>

        <Form.Item
          rules={generalValidationRules}
          name="maxApplicationDuringRepayment"
          label="What is the maximum amount of loans an employee can apply for while repaying a loan?"
        >
          <InputNumber className="w-full" />
        </Form.Item>

        <AppButton
          type="submit"
          label="Save Changes"
          isLoading={createLoading}
        />
      </Form>
    </div>
  );
};
