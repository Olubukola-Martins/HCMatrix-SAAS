import PageSubHeader from "components/layout/PageSubHeader";
import React, { useEffect } from "react";
import { useQueryClient } from "react-query";
import {
  QUERY_KEY_FOR_SINGLE_REQUISITION_SETTING,
  useGetSingleRequisitionSetting,
} from "../../requisitions/hooks/setting/useGetSingleRequisitionSetting";
import { useCreateOrUpdateRequisitionSetting } from "../../requisitions/hooks/setting/useCreateOrUpdateRequisitionSetting";
import { Form, Skeleton } from "antd";
import { AppButton } from "components/button/AppButton";
import { FormWorkflowInput } from "features/core/workflows/components/FormWorkflowInput";
import { useApiAuth } from "hooks/useApiAuth";
import { openNotification } from "utils/notifications";

export const TravelRequestSetting = () => {
  return (
    <div className="flex flex-col gap-4">
      <PageSubHeader
        description={`You can now select the workflow approval for travel requisition`}
      />
      <TravelRequestPolicy />
    </div>
  );
};

const TravelRequestPolicy = () => {
  return (
    <div className="mt-4 bg-card py-6 px-6 flex flex-col gap-4">
      <TravelRequestPolicyForm />
    </div>
  );
};

const TravelRequestPolicyForm = () => {
  const queryClient = useQueryClient();
  const { companyId, token } = useApiAuth();
  const [form] = Form.useForm();

  const { data, isFetching } = useGetSingleRequisitionSetting({
    type: "job", //TO DO: when toyin does this change -> also make this setting a reusable comp : format has been used multiple times
    companyId,
    token,
  });
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        workflowId: data.workflowId,
      });
    }
  }, [data, form]);

  const { mutate, isLoading } = useCreateOrUpdateRequisitionSetting();

  const handleSubmit = (data: any) => {
    mutate(
      {
        type: "job",
        body: {
          isActive: true,
          workflowId: data.workflowId,
        },
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
            queryKey: [QUERY_KEY_FOR_SINGLE_REQUISITION_SETTING],
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
        <div className="flex flex-col gap-4 ">
          <FormWorkflowInput
            Form={Form}
            control={{ label: "Workflow", name: "workflowId" }}
          />

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
