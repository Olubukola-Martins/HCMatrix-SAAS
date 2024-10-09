import { Form, Radio, Skeleton, Switch } from "antd";
import { AppButton } from "components/button/AppButton";
import { appRoutes } from "config/router/paths";
import { FormWorkflowInput } from "features/core/workflows/components/FormWorkflowInput";
import { Link } from "react-router-dom";
import { useGetShiftSwapSetting } from "../hooks/shift/other-settings/useGetShiftSwapSetting";
import { useEffect } from "react";
import {
  TSaveShiftSwapSettingData,
  useSaveShiftSwapSetting,
} from "../hooks/shift/other-settings/useSaveShiftSwapSetting";
import { SHIFT_SWAP_ELIGIBILITY_VALUE_OPTIONS } from "../constants";

export const ShiftSwapConfig = () => {
  const [form] = Form.useForm<TSaveShiftSwapSettingData>();
  const { isLoading: isLoadingSetting, data: setting } =
    useGetShiftSwapSetting();
  useEffect(() => {
    form.setFieldsValue({
      enableShiftSwap: setting?.enableShiftSwap,
      swapEligibility: setting?.swapEligibility,
      swapWorkflowId: setting?.swapWorkflowId,
    });
  }, [setting, form]);
  const { handleSubmit, isLoading: isSaving } = useSaveShiftSwapSetting();
  return (
    <Skeleton loading={isLoadingSetting} paragraph={{ rows: 8 }}>
      <Form
        onFinish={handleSubmit}
        form={form}
        requiredMark={false}
        layout="vertical"
        className="mt-10"
      >
        <div className="bg-card rounded px-3 pt-4 pb-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
            <h3 className="font-semibold">
              Enable shift swap between employees on temporary shift
            </h3>
            <Form.Item<TSaveShiftSwapSettingData>
              name="enableShiftSwap"
              className="flex justify-end items-end"
              valuePropName="checked"
              initialValue={false}
            >
              <Switch />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
              <FormWorkflowInput
                Form={Form}
                control={{
                  label: "Select Workflow",
                  name: "swapWorkflowId",
                }}
              />
              <div className="flex justify-end">
                <Link
                  to={appRoutes.workflowSettings}
                  className="flex items-center justify-end gap-2 text-caramel text-sm -mt-3"
                >
                  <i className="ri-add-circle-fill"></i>
                  <span>Create Workflow</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-card rounded px-3 pt-4 pb-3 mt-3">
          <div>
            <h3 className="font-semibold">
              Swap Eligibility Criteria for employees on temporary shift
            </h3>
            <p className="text-sm pt-1">Only one criteria can be selected</p>
          </div>
          {/* SHIFT_SWAP_ELIGIBILITY_VALUE_OPTIONS */}
          <Form.Item<TSaveShiftSwapSettingData> name="swapEligibility">
            <Radio.Group name="swapEligibility">
              {SHIFT_SWAP_ELIGIBILITY_VALUE_OPTIONS.map(({ label, value }) => (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 mt-5">
                  <Radio value={value}>
                    <h3>{label}</h3>
                  </Radio>
                </div>
              ))}
            </Radio.Group>
          </Form.Item>

          <div className="flex justify-end mt-2 mr-3">
            <AppButton type="submit" label="Save" isLoading={isSaving} />
          </div>
        </div>
      </Form>
    </Skeleton>
  );
};
