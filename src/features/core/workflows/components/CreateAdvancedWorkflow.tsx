import { Button, Form, Input, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";

import { AppButton } from "components/button/AppButton";
import { TStage } from "../types";
import { OptionalTypeParams } from "types/optionalTypes";
import useCreateAdvancedWorkflow, {
  TAdvancedWorkflowStage,
} from "../hooks/useCreateAdvancedWorkflow";
import { CreateAdvancedStage } from "./CreateAdvancedStage";
import { appRoutes } from "config/router/paths";
import { useNavigate } from "react-router-dom";
import { borderCardStyle } from "styles/reused";

export const CreateAdvancedWorkflow = () => {
  const queryClient = useQueryClient();
  const [stages, setStages] = useState<
    ({ editable: boolean } & OptionalTypeParams<
      TStage,
      "entityId" | "type" | "enableTwoFactorAuth"
    >)[]
  >([]);
  const [form] = Form.useForm();
  const addStage = (id: number) => {
    setStages((prev) => [
      ...prev,
      { id, name: "", editable: true, enableTwoFactorAuth: false },
    ]);
  };
  const removeStage = (id: number) => {
    setStages((prev) => {
      const current = prev.filter((item) => item.id !== id);
      return current;
    });
  };

  const { mutate, isLoading } = useCreateAdvancedWorkflow();
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    const workflowStages: TAdvancedWorkflowStage[] = stages
      .map(
        ({
          name,
          entityId,
          type,
          condition,
          count,
          enableTwoFactorAuth,
        }): TAdvancedWorkflowStage => {
          if (!!entityId && !!type && type !== "line-manager") {
            return {
              entityId: entityId,
              type,
              name,
              condition,
              count,
              enableTwoFactorAuth,
            };
          }

          if (type === "line-manager") {
            return {
              type,
              name,
            };
          }
          return {
            entityId: 0,
            type: "employee",
            name,
          };
        }
      )
      .filter((item) => item.entityId !== 0);

    mutate(
      {
        name: data.name,
        advancedStages: workflowStages,
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
          navigate(appRoutes.workflowSettings);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className={borderCardStyle}>
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
            <Input placeholder="Workflow name" className="w-full" />
          </Form.Item>
        </Form>
      </div>
      <div className="flex flex-col gap-3">
        <Typography.Text className="font-bold text-base">
          Advanced Workflow Stages
        </Typography.Text>
        {stages.map((stage, id) => (
          <div className={`flex gap-4 ${borderCardStyle}`} key={id}>
            <CreateAdvancedStage
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
                          entityId: data.entityId,
                          condition: data.condition,
                          count: data.count,
                          enableTwoFactorAuth: data.enableTwoFactorAuth,
                          editable: false,
                        }
                      : stage
                  )
                )
              }
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-4">
        <AppButton
          label="Add Stage"
          variant="transparent"
          handleClick={() => addStage(stages.length)}
        />
        {!(
          stages.length === 0 ||
          (stages.length >= 1 && stages[0].editable === true)
        ) && (
          <AppButton
            label="Submit"
            handleClick={() => form.submit()}
            disabled={
              stages.length === 0 ||
              (stages.length >= 1 && stages[0].editable === true)
            }
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};
