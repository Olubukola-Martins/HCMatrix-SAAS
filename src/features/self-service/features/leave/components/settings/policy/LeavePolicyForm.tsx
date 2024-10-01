import { Form, Typography, InputNumber, Skeleton, Select } from "antd";
import { FormWorkflowInput } from "features/core/workflows/components/FormWorkflowInput";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";
import { AppButton } from "components/button/AppButton";
import AppSwitch from "components/switch/AppSwitch";
import {
  QUERY_KEY_FOR_LEAVE_POLICY_SETTING,
  useGetLeavePolicySetting,
} from "../../../hooks/leavePolicySetting/useGetLeavePolicySetting";
import { useSaveLeavePolicySetting } from "../../../hooks/leavePolicySetting/useSaveLeavePolicySetting";
import {
  generalValidationRules,
  numberHasToBeAWholeNumberRule,
  numberHasToBeInRange,
} from "utils/formHelpers/validation";
import { MONTH_CHART_LABELS } from "constants/general";

const btwnStyle =
  "bg-card pt-4 px-3 flex flex-row w-full justify-between align-center rounded-md";
const gapStyle = "bg-card pt-4 px-3 flex  gap-16 align-center rounded-md";
const LeavePolicyForm = () => {
  const queryClient = useQueryClient();

  const [showMaxCODays, setShowMaxCODays] = useState(false);
  const [form] = Form.useForm();
  const { data, isFetching } = useGetLeavePolicySetting();
  const { mutate, isLoading } = useSaveLeavePolicySetting();
  const handleSubmit = (data: any) => {
    const input = {
      workflowId: data.workflowId,
      includeWeekends: !!data.includeWeekends,
      includeHolidays: !!data.includeHolidays,
      carryover: !!data.carryover,
      maxLengthCarryover: data?.maxLengthCarryover,
      carryoverDay: data?.carryoverDay,
      carryoverMonth: data?.carryoverMonth,
    };
    mutate(
      input,

      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_LEAVE_POLICY_SETTING],
            // exact: true,
          });
        },
      }
    );
  };
  useEffect(() => {
    if (data) {
      setShowMaxCODays(data.carryover);

      form.setFieldsValue({
        workflowId: data.workflowId,
        includeWeekends: data.includeWeekends,
        includeHolidays: data.includeHolidays,
        carryover: data.carryover,
        maxLengthCarryover: data.maxLengthCarryover,
        proration: data.proration,
        carryoverMonth: data.carryoverMonth,
        carryoverDay: data.carryoverDay,
      });
    }
  }, [form, data]);

  return (
    <Skeleton active loading={isFetching}>
      <Form
        labelCol={{ span: 24 }}
        form={form}
        requiredMark={false}
        onFinish={handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <div className={gapStyle}>
            <div className="flex-1">
              <FormWorkflowInput
                Form={Form}
                control={{ label: "Select Workflow", name: "workflowId" }}
              />
            </div>
          </div>
          <div className={btwnStyle}>
            <div>
              {" "}
              <Typography.Text>
                Does your leave include weekends?
              </Typography.Text>
            </div>
            <div>
              <Form.Item label="" className="flex-1" name="includeWeekends">
                <AppSwitch
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                  defaultChecked={!!data?.includeWeekends}
                  // size="small"
                />
              </Form.Item>
            </div>
          </div>
          <div className={btwnStyle}>
            <div>
              {" "}
              <Typography.Text>
                Does your leave include holidays?
              </Typography.Text>
            </div>
            <div>
              <Form.Item label="" className="flex-1" name="includeHolidays">
                <AppSwitch
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                  defaultChecked={!!data?.includeHolidays}

                  // size="small"
                />
              </Form.Item>
            </div>
          </div>
          <div className={btwnStyle}>
            <div>
              {" "}
              <Typography.Text>
                Do you wish to prorate your leave?
              </Typography.Text>
            </div>
            <div>
              <Form.Item label="" className="flex-1" name="proration">
                <AppSwitch
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                  defaultChecked={!!data?.proration}

                  // size="small"
                />
              </Form.Item>
            </div>
          </div>
          <div className={btwnStyle}>
            <div>
              {" "}
              <Typography.Text>Do you carry leave over?</Typography.Text>
            </div>
            <div>
              <Form.Item label="" className="flex-1" name="carryover">
                <AppSwitch
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                  defaultChecked={showMaxCODays}
                  onChange={() => setShowMaxCODays((val) => !val)}

                  // size="small"
                />
              </Form.Item>
            </div>
          </div>
          {showMaxCODays && (
            <>
              <div className={btwnStyle}>
                <div className="flex flex-col gap-4">
                  {" "}
                  <Typography.Text>
                    What is the maximum number of days when carrying leave over?
                  </Typography.Text>
                  <Form.Item
                    label=""
                    className="flex-1 "
                    name="maxLengthCarryover"
                    rules={[numberHasToBeAWholeNumberRule]}
                  >
                    <InputNumber
                      placeholder="What is your Maximum Leave Carryover Length"
                      className="w-full"
                      min={1}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className={btwnStyle}>
                <div className="flex flex-col gap-4">
                  {" "}
                  <Typography.Text>
                    What is your carryover day and month?
                  </Typography.Text>
                  <div className="flex gap-x-12 w-full">
                    <Form.Item
                      label=""
                      className="flex-1 "
                      name="carryoverMonth"
                      rules={generalValidationRules}
                    >
                      <Select
                        placeholder="Month"
                        className="w-full"
                        options={MONTH_CHART_LABELS.map((label, value) => ({
                          value,
                          label: <span className="capitalize">{label}</span>,
                        }))}
                      />
                    </Form.Item>
                    <Form.Item
                      label=""
                      className="flex-1 "
                      name="carryoverDay"
                      rules={[numberHasToBeInRange(1, 31)]}
                    >
                      <InputNumber placeholder="Day" className="w-full" />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end">
            <Form.Item>
              <AppButton type="submit" isLoading={isLoading} label="Save" />
            </Form.Item>
          </div>
        </div>
      </Form>
    </Skeleton>
  );
};

export default LeavePolicyForm;
