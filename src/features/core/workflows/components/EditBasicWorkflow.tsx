import { Button, Form, Input, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { EditBasicStage } from "./EditBasicStage";

import { useQueryClient } from "react-query";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";

import { AddBasicStage } from "./AddBasicStage";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import useAddStageToBasicWorkflow from "../hooks/useAddStageToBasicWorkflow";
import { QUERY_KEY_FOR_SINGLE_WORKFLOW } from "../hooks/useFetchSingleWorkflow";
import { TSingleWorkflow, TStage } from "../types";
import useUpdateSingleWorkflow from "../hooks/useUpdateSingleWorkflow";
import { borderCardStyle } from "styles/reused";
import { AppButton } from "components/button/AppButton";

export const EditBasicWorkflow: React.FC<{ data: TSingleWorkflow }> = ({
  data,
}) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [editName, setEditName] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({ name: data.name });
    }
  }, [data, form]);

  const { mutate: stageMutate } = useAddStageToBasicWorkflow();
  const addStage = (stage: Pick<TStage, "name" | "entityId" | "type">) => {
    stageMutate(
      {
        id: data.id,
        stage,
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
            queryKey: [QUERY_KEY_FOR_SINGLE_WORKFLOW, data.id],
            // exact: true,
          });
          setShowCreate(false);
        },
      }
    );
  };

  const { mutate, isLoading } = useUpdateSingleWorkflow();

  const handleSubmit = (values: any) => {
    mutate(
      {
        name: values.name,
        id: data.id,
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

          setEditName(false);
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_SINGLE_WORKFLOW, data.id],
            // exact: true,
          });
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <>
        <Form
          layout="vertical"
          requiredMark={false}
          form={form}
          labelCol={{ span: 24 }}
          onFinish={handleSubmit}
          className={borderCardStyle}
        >
          <div className="flex flex-col gap-4">
            <Form.Item
              name="name"
              label={<span>Workflow Name</span>}
              rules={textInputValidationRules}
            >
              <Input
                placeholder="Basic Workflow name"
                className="w-full"
                disabled={!editName}
              />
            </Form.Item>
            <div className="flex gap-4 justify-end">
              {!editName && (
                <AppButton label="Edit" handleClick={() => setEditName(true)} />
              )}
              {editName && (
                <AppButton
                  label="Save"
                  isLoading={isLoading}
                  handleClick={() => form.submit()}
                />
              )}
            </div>
          </div>
        </Form>

        <div className="flex flex-col gap-3">
          <Typography.Text className="font-bold text-base">
            Basic Workflow Stages
          </Typography.Text>
          {data?.stages.map((stage) => (
            <div className={`flex gap-4 ${borderCardStyle}`} key={stage.id}>
              <EditBasicStage stage={stage} workflowId={data.id} />
            </div>
          ))}
          {showCreate && (
            <AddBasicStage
              editable={showCreate}
              removeStage={() => setShowCreate(false)}
              enableEdit={() => setShowCreate(true)}
              handleFinish={(data: any) => {
                addStage({
                  name: data.name,
                  entityId: data.entityId,
                  type: data.type,
                });
              }}
            />
          )}

          <div className="flex justify-end">
            <AppButton
              label="Add Stage"
              handleClick={() => setShowCreate(true)}
            />
          </div>
        </div>
      </>
    </div>
  );
};
