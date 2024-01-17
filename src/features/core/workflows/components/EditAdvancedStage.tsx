import { Form, Input, Select, Button, InputNumber } from "antd";

import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { FormGroupInput } from "features/core/groups/components/FormGroupInput";
import { FormRoleInput } from "features/core/roles-and-permissions/components/FormRoleInput";
import { useQueryClient } from "react-query";
import {
  textInputValidationRules,
  generalValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { TBasicWorkflowStage } from "../hooks/useCreateBasicWorkflow";
import useDeleteBasicStage from "../hooks/useDeleteBasicStage";
import { TStage, TStageCondition, TStagingType } from "../types";
import {
  WORKFLOW_STAGE_CONDITION_OPTIONS,
  WORKFLOW_STAGE_TYPE_OPTIONS,
} from "../constants";
import useEditAdvancedStage from "../hooks/useEditAdvancedStage";
import { QUERY_KEY_FOR_SINGLE_WORKFLOW } from "../hooks/useFetchSingleWorkflow";
import { TAdvancedWorkflowStage } from "../hooks/useCreateAdvancedWorkflow";
import useDeleteAdvancedStage from "../hooks/useDeleteAdvancedStage";
import { AppButton } from "components/button/AppButton";

export const EditAdvancedStage: React.FC<{
  workflowId: number;
  stage: TStage;
}> = ({ stage, workflowId }) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const [stagingType, setStagingType] = useState<TStagingType>();
  const [stagingCondition, setStagingCondition] = useState<TStageCondition>();

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      name: stage.name,
      type: stage.type,
      entityId: stage.entityId,
      condition: stage.condition,
      count: stage.count,
      enableTwoFactorAuth: stage.enableTwoFactorAuth,
    });
    setStagingType(stage.type);
    setStagingCondition(stage.condition);
  }, [form, stage]);
  const { mutate, isLoading } = useEditAdvancedStage();

  const handleFinish = (data: any) => {
    const workflowStage: TAdvancedWorkflowStage = {
      name: data.name,
      type: data.type,
      entityId: data.entityId,
      condition: data.condition,
      count: data.count,
      enableTwoFactorAuth: data.enableTwoFactorAuth,
    };

    mutate(
      {
        workflowId,
        id: stage.id,
        stage: workflowStage,
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
          setEdit(false);
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_SINGLE_WORKFLOW, workflowId],
            // exact: true,
          });
        },
      }
    );
  };
  const { mutate: deleteMutate, isLoading: isDelLoading } =
    useDeleteAdvancedStage();

  const removeStage = () => {
    deleteMutate(
      {
        id: stage.id,
        workflowId,
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
            queryKey: [QUERY_KEY_FOR_SINGLE_WORKFLOW, workflowId],

            // exact: true,
          });
        },
      }
    );
  };
  return (
    <div className="flex flex-col gap-4 w-full">
      <Form
        form={form}
        onFinish={handleFinish}
        disabled={!edit}
        labelCol={{ span: 24 }}
        requiredMark={false}
      >
        <div className="grid grid-cols-2 md:gap-8 gap-4">
          <Form.Item
            name={"name"}
            label={`Stage Name`}
            rules={textInputValidationRules}
          >
            <Input placeholder="Stage name" />
          </Form.Item>
          <Form.Item
            name={"enableTwoFactorAuth"}
            label={`Enable 2FA`}
            rules={generalValidationRules}
          >
            <Select
              placeholder="Enable 2FA"
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
            />
          </Form.Item>
          <Form.Item
            name={"type"}
            rules={generalValidationRules}
            label="Approver Type"
          >
            <Select
              placeholder="Staging Type"
              options={WORKFLOW_STAGE_TYPE_OPTIONS}
              onSelect={(val: TStagingType) => {
                setStagingType(val);
              }}
            />
          </Form.Item>
          {stagingType === "employee" && (
            <FormEmployeeInput
              Form={Form}
              control={{ label: "Employee", name: "entityId" }}
            />
          )}
          {stagingType === "role" && (
            <FormRoleInput
              Form={Form}
              control={{ label: "Role", name: "entityId" }}
            />
          )}
          {stagingType === "group" && (
            <FormGroupInput
              Form={Form}
              control={{ label: "Group", name: "entityId" }}
            />
          )}
          {!!stagingType &&
            !["line-manager", "employee"].includes(stagingType) && (
              <Form.Item
                name={"condition"}
                rules={generalValidationRules}
                label="Condition"
              >
                <Select
                  placeholder="Condition"
                  options={WORKFLOW_STAGE_CONDITION_OPTIONS}
                  onSelect={(val: TStageCondition) => {
                    setStagingCondition(val);
                  }}
                />
              </Form.Item>
            )}
          {stagingCondition === "specific" && (
            // TO DO: validation of max/min based on count of entity, or no need as they can add to role at any moment
            <Form.Item
              name={"count"}
              rules={generalValidationRules}
              label="Count"
            >
              <InputNumber placeholder="count" />
            </Form.Item>
          )}
        </div>
      </Form>
      <div className="flex gap-4 justify-end mb-6">
        <AppButton
          label="Delete"
          variant="transparent"
          isLoading={isDelLoading}
          handleClick={() => removeStage()}
        />
        {!edit ? (
          <AppButton label="Edit" handleClick={() => setEdit(true)} />
        ) : (
          <AppButton
            label="Save"
            handleClick={() => form.submit()}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};
