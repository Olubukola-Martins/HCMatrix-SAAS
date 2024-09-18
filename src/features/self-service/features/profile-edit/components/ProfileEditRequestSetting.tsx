import { Skeleton, Input, Form } from "antd";
import { AppButton } from "components/button/AppButton";
import PageSubHeader from "components/layout/PageSubHeader";
import { FormWorkflowInput } from "features/core/workflows/components/FormWorkflowInput";
import { useApiAuth } from "hooks/useApiAuth";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";
import { TProfileEditRequestType } from "../types";
import { PROFILE_EDIT_REQUEST_TYPES } from "../constants";
import {
  QUERY_KEY_FOR_WORKFLOW_APPROVAL_SETTING,
  useFetchWorkflowApprovalSetting,
} from "features/core/workflows/hooks/useFetchWorkflowApprovalSetting";
import { useCreateOrUpdateWorkflowApprovalSetting } from "features/core/workflows/hooks/useCreateOrUpdateWorkflowApprovalSetting";

export const ProfileEditRequestSetting = () => {
  return (
    <div className="flex flex-col gap-4">
      <PageSubHeader
        description={`You can now select the workflow approval for profile edit requisition`}
      />
      <ProfileEditRequestPolicy />
    </div>
  );
};

const ProfileEditRequestPolicy = () => {
  return (
    <div className="flex flex-col gap-y-6 mt-4">
      {PROFILE_EDIT_REQUEST_TYPES.map((item, i) => (
        <div className="bg-card py-3 px-4" key={i}>
          <ProfileEditSingleRequisitionPolicyForm
            type={item.type}
            name={item.name}
          />
        </div>
      ))}
    </div>
  );
};

export const ProfileEditSingleRequisitionPolicyForm: React.FC<{
  type: TProfileEditRequestType;
  name: string;
}> = ({ type, name }) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { companyId, token } = useApiAuth();

  const { data, isFetching } = useFetchWorkflowApprovalSetting({
    companyId,
    token,
    type,
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        workflowId: data.workflowId,
      });
    }
  }, [data, form]);

  const { mutate, isLoading } = useCreateOrUpdateWorkflowApprovalSetting();

  const handleSubmit = (values: any) => {
    mutate(
      {
        type,

        workflowId: values.workflowId,
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

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_WORKFLOW_APPROVAL_SETTING, type],
            // exact: true,
          });
        },
      }
    );
  };
  return (
    <div className="px-4 py-2 bg-card  rounded-md">
      <Skeleton loading={isFetching} active paragraph={{ rows: 3 }}>
        <Form
          labelCol={{ span: 24 }}
          form={form}
          requiredMark={false}
          onFinish={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <div className="w-full flex gap-x-6 items-center">
              <Form.Item>
                <Input disabled value={name} />
              </Form.Item>
              <FormWorkflowInput
                Form={Form}
                control={{ label: "", name: "workflowId" }}
              />
            </div>

            <div className="flex justify-end">
              <Form.Item>
                <AppButton label="Save" type="submit" isLoading={isLoading} />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Skeleton>
    </div>
  );
};
