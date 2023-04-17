import { Button, Form, Input, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { CreateStage, TStage, TStagingType } from "./CreateStage";
import { useQueryClient } from "react-query";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import useCreateBasicWorkflow, {
  TBasicWorkflowStage,
} from "../hooks/useCreateBasicWorkflow";
import { AppButton } from "components/button/AppButton";

export const CreateBasicWorkflow = () => {
  const queryClient = useQueryClient();

  const [stages, setStages] = useState<({ editable: boolean } & TStage)[]>([]);
  const [form] = Form.useForm();
  const addStage = (id: number) => {
    setStages((prev) => [...prev, { id, name: "", editable: true }]);
  };
  const removeStage = (id: number) => {
    setStages((prev) => {
      const current = prev.filter((item) => item.id !== id);
      return current;
    });
  };

  const { mutate, isLoading } = useCreateBasicWorkflow();

  const handleSubmit = (data: any) => {
    const workflowStages: TBasicWorkflowStage[] = stages.map(
      ({ name, type, concernedId }): TBasicWorkflowStage => {
        const workflowStage: TBasicWorkflowStage = { name };
        if (type === "role") workflowStage["roleId"] = concernedId;
        if (type === "employee") workflowStage["employeeId"] = concernedId;
        if (type === "group") workflowStage["groupId"] = concernedId;
        if (type === "department-head")
          workflowStage["departmentHeadId"] = concernedId;
        return workflowStage;
      }
    );

    mutate(
      {
        name: data.name,
        stages: workflowStages,
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
          setStages([]);

          queryClient.invalidateQueries({
            queryKey: ["workflows"],
            // exact: true,
          });
        },
      }
    );
  };
  type TStagingTypeKey =
    | "employeeId"
    | "groupId"
    | "roleId"
    | "departmentHeadId";
  const transalateConcernedIdKey = (val: TStagingType): TStagingTypeKey => {
    let key: TStagingTypeKey = "employeeId";
    switch (val) {
      case "employee":
        key = "employeeId";

        break;
      case "group":
        key = "groupId";

        break;
      case "role":
        key = "roleId";

        break;
      case "department-head":
        key = "departmentHeadId";

        break;

      default:
        break;
    }
    return key;
  };
  return (
    <div className="flex flex-col gap-4">
      <Form
        layout="vertical"
        requiredMark={false}
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="name"
          label="Workflow Name"
          rules={textInputValidationRules}
        >
          <Input placeholder="Workflow name" className="w-40" />
        </Form.Item>
      </Form>
      <div className="flex flex-col gap-3">
        <Typography.Text>Workflow Stages</Typography.Text>
        {stages.map((stage, id) => (
          <div className="flex gap-4" key={id}>
            <CreateStage
              stage={stage}
              removeStage={removeStage}
              enableEdit={(id) => {
                setStages((stages) =>
                  stages.map((stage) =>
                    stage.id === id
                      ? {
                          ...stage,

                          editable: true,
                        }
                      : stage
                  )
                );
              }}
              handleFinish={(data) =>
                setStages((stages) =>
                  stages.map((stage) =>
                    stage.id === id
                      ? {
                          ...stage,
                          type: data.type,
                          name: data.name,
                          concernedId:
                            data[transalateConcernedIdKey(data.type)],
                          editable: false,
                        }
                      : stage
                  )
                )
              }
            />
          </div>
        ))}
        <Button icon={<PlusOutlined />} onClick={() => addStage(stages.length)}>
          Add Stage
        </Button>
      </div>
      <div className="flex justify-end">
        <AppButton
          label="Submit"
          handleClick={() => form.submit()}
          disabled={
            stages.length === 0 ||
            (stages.length >= 1 && stages[0].editable === true)
          }
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
