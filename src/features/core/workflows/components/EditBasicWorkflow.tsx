import { Button, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { EditStage, TStage } from "./EditStage";

import { useQueryClient } from "react-query";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";

import { AddBasicStage } from "./AddBasicStage";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import useAddStageToBasicWorkflow from "../hooks/useAddStageToBasicWorkflow";
import { TBasicWorkflowStage } from "../hooks/useCreateBasicWorkflow";
import useEditBasicWorkflow from "../hooks/useEditBasicWorkflow";
import { useFetchSingleBasicWorkflow } from "../hooks/useFetchSingleBasicWorkflow";

export const EditBasicWorkflow: React.FC<{ id: number }> = ({ id }) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [editName, setEditName] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  const { data, isSuccess } = useFetchSingleBasicWorkflow({ id });

  useEffect(() => {
    if (isSuccess) {
      form.setFieldsValue({ name: data.name });
    }
  }, [data, isSuccess, form]);

  const { mutate: stageMutate } = useAddStageToBasicWorkflow();
  const addStage = (stage: Pick<TStage, "name" | "concernedId" | "type">) => {
    const { type, name, concernedId } = stage;

    const workflowStage: TBasicWorkflowStage = { name };
    if (type === "role") workflowStage["roleId"] = concernedId;
    if (type === "employee") workflowStage["employeeId"] = concernedId;
    if (type === "group") workflowStage["groupId"] = concernedId;
    if (type === "department-head")
      workflowStage["departmentHeadId"] = concernedId;
    stageMutate(
      {
        id,
        stage: {
          ...workflowStage,
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
          queryClient.invalidateQueries({
            queryKey: ["basic-workflow", id],
            // exact: true,
          });
          setShowCreate(false);
        },
      }
    );
  };

  const { mutate, isLoading } = useEditBasicWorkflow();

  const handleSubmit = (data: any) => {
    mutate(
      {
        name: data.name,
        id,
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
            queryKey: ["basic-workflow", id],
            // exact: true,
          });
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Form
        layout="vertical"
        requiredMark={false}
        form={form}
        onFinish={handleSubmit}
      >
        <div className="flex gap-4">
          <Form.Item
            name="name"
            label={<span className="font-bold">Workflow Name</span>}
            rules={textInputValidationRules}
          >
            <Input
              placeholder="Workflow name"
              className="w-40"
              disabled={!editName}
            />
          </Form.Item>
          <div className="flex gap-4 mt-8 relative bottom-1">
            {!editName && (
              <Button icon={<EditOutlined />} onClick={() => setEditName(true)}>
                Edit
              </Button>
            )}
            {editName && (
              <Button
                icon={<SaveOutlined />}
                type="primary"
                loading={isLoading}
                onClick={() => form.submit()}
              >
                Save
              </Button>
            )}
          </div>
        </div>
      </Form>

      <div className="flex flex-col gap-3">
        <span className="font-bold">Workflow Stages</span>
        {data?.stages.map((stage) => (
          <div className="flex gap-4" key={stage.id}>
            <EditStage stage={stage} workflowId={id} />
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
                concernedId: data.concernedId,
                type: data.type,
              });
            }}
          />
        )}

        <Button icon={<PlusOutlined />} onClick={() => setShowCreate(true)}>
          Add Stage
        </Button>
      </div>
    </div>
  );
};
