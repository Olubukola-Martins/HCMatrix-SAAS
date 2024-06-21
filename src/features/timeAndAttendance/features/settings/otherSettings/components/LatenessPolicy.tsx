import { Form, Select, Skeleton, Switch } from "antd";
import { formWrapStyle } from "../style";
import { FormGroupInput } from "features/core/groups/components/FormGroupInput";
import { AppButton } from "components/button/AppButton";
import { useGetLatenessPolicy } from "../hooks/useGetLatenessPolicy";
import { useEffect } from "react";
import {
  TSaveLatenessPolicyData,
  useSaveLatenessPolicy,
} from "../hooks/useSaveLatenessPolicy";
import { POLICY_GRACE_PERIODS, POLICY_REPORT_FREQUENCIES } from "../constants";
import { generalValidationRules } from "utils/formHelpers/validation";

export const LatenessPolicy = () => {
  const [form] = Form.useForm<TSaveLatenessPolicyData>();
  const { isLoading: isLoadingPolicy, data: policy } = useGetLatenessPolicy();
  useEffect(() => {
    form.setFieldsValue({
      gracePeriod: policy?.gracePeriod, //N?A from backend
      reportFrequency: policy?.reportFrequency,
      reportToRoleId: policy?.reportToRoleId,
      sendNotification: policy?.sendNotification ?? false,
      sendReport: policy?.sendReport ?? false,
    });
  }, [policy, form]);
  const { handleSubmit, isLoading: isSaving } = useSaveLatenessPolicy();

  return (
    <>
      <div className="bg-mainBg py-4 px-4 rounded">
        <h3 className="font-medium text-base pb-3 pt-1">Lateness settings</h3>

        <Skeleton loading={isLoadingPolicy} paragraph={{ rows: 8 }}>
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{ isSoftClockInEnabled: true }}
            form={form}
            requiredMark={false}
          >
            <div className={formWrapStyle}>
              <Form.Item<TSaveLatenessPolicyData>
                name="gracePeriod"
                label="Specify grace period after resumption time"
              >
                <Select
                  options={POLICY_GRACE_PERIODS.map((value) => ({
                    value,
                    label: <span className="capitalize">{value}</span>,
                  }))}
                  placeholder="Select"
                  allowClear
                />
              </Form.Item>
            </div>
            <div
              className={`${formWrapStyle} flex justify-between items-center`}
            >
              <h3>
                Notify employees and their managers when an instance of lateness
                is recorded
              </h3>
              <Form.Item<TSaveLatenessPolicyData>
                name="sendNotification"
                className="flex justify-end items-end"
                valuePropName="checked"
                initialValue={false}
              >
                <Switch />
              </Form.Item>
            </div>
            <div className={formWrapStyle}>
              <h3>Email lateness report</h3>
              <Form.Item<TSaveLatenessPolicyData>
                name="sendReport"
                className="flex justify-end items-end"
                valuePropName="checked"
                initialValue={false}
              >
                <Switch />
              </Form.Item>
            </div>

            <div className={formWrapStyle}>
              <Form.Item<TSaveLatenessPolicyData>
                name={`reportFrequency`}
                label="Select Frequency"
                rules={generalValidationRules}
              >
                <Select
                  options={POLICY_REPORT_FREQUENCIES.map((value) => ({
                    value,
                    label: <span className="capitalize">{value}</span>,
                  }))}
                  placeholder="Select"
                  allowClear
                />
              </Form.Item>
              <FormGroupInput
                Form={Form}
                control={{
                  label: "Select who should receive lateness report ",
                  name: "reportToRoleId",
                }}
              />
            </div>
            <div className="flex justify-end my-2">
              <AppButton label="Save" type="submit" isLoading={isSaving} />
            </div>
          </Form>
        </Skeleton>
      </div>
    </>
  );
};
