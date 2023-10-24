import PageSubHeader from "components/layout/PageSubHeader";
import React, { useEffect } from "react";
import { useQueryClient } from "react-query";
import { Form, InputNumber, Skeleton } from "antd";
import { AppButton } from "components/button/AppButton";
import { FormWorkflowInput } from "features/core/workflows/components/FormWorkflowInput";
import { openNotification } from "utils/notifications";
import {
  QUERY_KEY_FOR_PROBATION_POLICY,
  useGetProbationPolicy,
} from "../hooks/useGetProbationPolicy";
import { useSaveProbationPolicy } from "../hooks/useSaveProbationPolicy";

export const ProbationSettings = () => {
  return (
    <div className="flex flex-col gap-4">
      <PageSubHeader
        description={`You can now select view/edit probation policy`}
      />
      <ProbationPolicy />
    </div>
  );
};

const ProbationPolicy = () => {
  return (
    <div className="mt-4 bg-card py-6 px-6 flex flex-col gap-4">
      <ProbationPolicyForm />
    </div>
  );
};

const ProbationPolicyForm = () => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { data, isFetching } = useGetProbationPolicy();
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        workflowId: data.workflowId,
        duration: data.duration,
      });
    }
  }, [data, form]);

  const { mutate, isLoading } = useSaveProbationPolicy();

  const handleSubmit = (data: any) => {
    mutate(
      {
        duration: data.duration,
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
            queryKey: [QUERY_KEY_FOR_PROBATION_POLICY],
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
            <Form.Item
              name="duration"
              label="Duration (days)"
              rules={[
                {
                  required: true,

                  validator: async (_, value) => {
                    if (typeof value !== "number") {
                      throw new Error("Please enter a valid number!");
                    }
                    if (+value <= 0) {
                      throw new Error("Please enter a number greater than 0");
                    }

                    return true;
                  },
                },
              ]}
            >
              <InputNumber
                className="w-1/2"
                placeholder="What is your probation period?"
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
