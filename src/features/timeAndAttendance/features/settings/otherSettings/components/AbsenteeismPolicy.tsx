import { Form, Select, Skeleton, Switch } from "antd";
import { formWrapStyle } from "../style";
import { FormGroupInput } from "features/core/groups/components/FormGroupInput";
import { AppButton } from "components/button/AppButton";
import { useGetAbsenteeismPolicy } from "../hooks/useGetAbsenteeismPolicy";
import {
  TSaveAbsenteeismPolicyData,
  useSaveAbsenteeismPolicy,
} from "../hooks/useSaveAbsenteeismPolicy";
import { useEffect } from "react";
import { POLICY_REPORT_FREQUENCIES } from "../constants";
import { generalValidationRules } from "utils/formHelpers/validation";

export const AbsenteeismPolicy = () => {
  const [form] = Form.useForm<TSaveAbsenteeismPolicyData>();
  const { isLoading: isLoadingPolicy, data: policy } =
    useGetAbsenteeismPolicy();
  useEffect(() => {
    form.setFieldsValue({
      markAbsent: policy?.markAbsent,
      reportFrequency: policy?.reportFrequency,
      reportToRoleId: policy?.reportToRoleId,
      sendNotification: policy?.sendNotification,
      sendReport: policy?.sendReport ?? false,
    });
  }, [policy, form]);
  const { handleSubmit, isLoading: isSaving } = useSaveAbsenteeismPolicy();
  return (
    <>
      <div className="bg-mainBg py-4 px-4 rounded">
        <h3 className="font-medium text-base pb-3 pt-1">Absenteeism Policy</h3>

        <Skeleton loading={isLoadingPolicy} paragraph={{ rows: 8 }}>
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{ isSoftClockInEnabled: true }}
            form={form}
            requiredMark={false}
          >
            <div
              className={`${formWrapStyle} flex justify-between items-center`}
            >
              <h3>
                Mark an employee as absent if they fail to clock in for the day
              </h3>
              <Form.Item<TSaveAbsenteeismPolicyData>
                name="markAbsent"
                className="flex justify-end items-end"
                valuePropName="checked"
                initialValue={false}
              >
                <Switch />
              </Form.Item>
            </div>
            <div
              className={`${formWrapStyle} flex justify-between items-center`}
            >
              <h3>
                Notify employees and their managers when an instance of absence
                is recorded
              </h3>
              <Form.Item<TSaveAbsenteeismPolicyData>
                name="sendNotification"
                className="flex justify-end items-end"
                valuePropName="checked"
                initialValue={false}
              >
                <Switch />
              </Form.Item>
            </div>
            <div className={formWrapStyle}>
              <h3>Email absenteeism report.</h3>
              <Form.Item<TSaveAbsenteeismPolicyData>
                name="sendReport"
                className="flex justify-end items-end"
                valuePropName="checked"
                initialValue={false}
              >
                <Switch />
              </Form.Item>
            </div>

            <div className={formWrapStyle}>
              <Form.Item<TSaveAbsenteeismPolicyData>
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
                  label: "Select who should receive absenteeism report ",
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
