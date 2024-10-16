import PageSubHeader from "components/layout/PageSubHeader";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useCreateOrUpdateRequisitionSetting } from "../../requisitions/hooks/setting/useCreateOrUpdateRequisitionSetting";
import { Form, Skeleton, Switch } from "antd";
import { AppButton } from "components/button/AppButton";
import { FormWorkflowInput } from "features/core/workflows/components/FormWorkflowInput";
import { useApiAuth } from "hooks/useApiAuth";
import { openNotification } from "utils/notifications";
import { TRequistionType } from "../types";
import {
  QUERY_KEY_FOR_SINGLE_REQUISITION_SETTING,
  useGetSingleRequisitionSetting,
} from "../hooks/setting/useGetSingleRequisitionSetting";
import AppSwitch from "components/switch/AppSwitch";

export const REQUISITION_TYPES: TRequistionType[] = [
  "asset",
  "job",
  "position-change",
  "promotion",
  "reimbursement",
  "transfer",
  "money",
  "travel",
];

export const RequisitionSetting = () => {
  return (
    <div className="flex flex-col gap-8">
      <PageSubHeader
        description={`You can now select the requisition types you want to activate and select approval workflows`}
      />
      <RequisitionPolicy />
    </div>
  );
};

const RequisitionPolicy = () => {
  return (
    <div className="bg-card px-6 py-8 rounded-md">
      <div className="flex flex-col gap-4 bg-white rounded-lg  px-4 py-4">
        <h4 className="text-base font-bold">Requisition Types</h4>
        <RequisitionPolicyFormList />
      </div>
    </div>
  );
};

const RequisitionPolicyFormList = () => {
  return (
    <>
      {REQUISITION_TYPES.map((item) => (
        <RequisitionPolicyForm key={item} type={item} />
      ))}
    </>
  );
};
export const RequisitionPolicyForm: React.FC<{ type: TRequistionType }> = ({
  type,
}) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { companyId, token } = useApiAuth();
  const [isActive, setIsActive] = useState(false);

  const { data, isFetching } = useGetSingleRequisitionSetting({
    type,
    companyId,
    token,
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        workflowId: data.workflowId,
        isActive: data.isActive,
      });
      setIsActive(data?.isActive);
    }
  }, [data, form]);

  const { mutate, isLoading } = useCreateOrUpdateRequisitionSetting();

  const handleSubmit = (values: any) => {
    mutate(
      {
        type,
        body: {
          isActive,
          workflowId: values.workflowId,
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
            queryKey: [QUERY_KEY_FOR_SINGLE_REQUISITION_SETTING, type],
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
            <div className="flex justify-between">
              <h6 className="capitalize mb-4 font-semibold">
                {data?.type ? data?.type.split("-").join(" ") : type}
              </h6>
              <Form.Item name={"isActive"}>
                <AppSwitch
                  unCheckedChildren="No"
                  checkedChildren="Yes"
                  checked={isActive}
                  onChange={setIsActive}
                />
              </Form.Item>
            </div>
            <div className="w-1/2">
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
