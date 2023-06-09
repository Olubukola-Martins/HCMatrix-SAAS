import PageSubHeader from "components/layout/PageSubHeader";
import React, { useEffect } from "react";
import { useQueryClient } from "react-query";
import { Form, InputNumber, Skeleton } from "antd";
import { AppButton } from "components/button/AppButton";
import { FormWorkflowInput } from "features/core/workflows/components/FormWorkflowInput";
import { openNotification } from "utils/notifications";
import {
  QUERY_KEY_FOR_RESIGNATION_POLICY,
  useGetResignationPolicy,
} from "../hooks/useGetResignationPolicy";
import { useSaveResignationPolicy } from "../hooks/useSaveResignationPolicy";

export const ResignationSetting = () => {
  return (
    <div className="flex flex-col gap-4">
      <PageSubHeader
        description={`You can now select view/edit resignation policy`}
      />
      <ResignationPolicy />
    </div>
  );
};

const ResignationPolicy = () => {
  return (
    <div className="mt-4 bg-card py-6 px-6 flex flex-col gap-4">
      <ResignationPolicyForm />
    </div>
  );
};

const ResignationPolicyForm = () => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { data, isFetching } = useGetResignationPolicy();
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        workflowId: data.workflowId,
        noticePeriod: data.noticePeriod,
      });
    }
  }, [data, form]);

  const { mutate, isLoading } = useSaveResignationPolicy();

  const handleSubmit = (data: any) => {
    mutate(
      {
        noticePeriod: data.noticePeriod,
        workflowId: data.workflowId,
      },
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

          form.resetFields();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_RESIGNATION_POLICY],
            // exact: true,
          });
        },
      }
    );
  };
  return (
    <Skeleton loading={isFetching} active paragraph={{ rows: 3 }}>
      <Form
        labelCol={{ span: 24 }}
        form={form}
        requiredMark={false}
        onFinish={handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <div className="w-1/2">
            <FormWorkflowInput
              Form={Form}
              control={{ label: "Workflow", name: "workflowId" }}
            />
            <Form.Item name="noticePeriod" label="Notice Period (weeks)">
              <InputNumber
                className="w-1/2"
                placeholder="What is your notice period?"
                min={1}
                max={8}
              />
            </Form.Item>
          </div>
          <div className="flex justify-end">
            <Form.Item>
              <AppButton
                label="Save"
                type="submit"
                variant="transparent"
                isLoading={isLoading}
              />
            </Form.Item>
          </div>
        </div>
      </Form>
    </Skeleton>
  );
};
