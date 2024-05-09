import { Form, Input, Select, Button } from "antd";

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
import useEditBasicStage from "../hooks/useEditBasicStage";
import { TStage, TStagingType } from "../types";
import { WORKFLOW_STAGE_TYPE_OPTIONS } from "../constants";
import { QUERY_KEY_FOR_SINGLE_WORKFLOW } from "../hooks/useFetchSingleWorkflow";
import { AppButton } from "components/button/AppButton";

export const EditBasicStage: React.FC<{
  workflowId: number;
  stage: TStage;
}> = ({ stage, workflowId }) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const [stagingType, setStagingType] = useState<TStagingType>();
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      name: stage.name,
      type: stage.type,
      entityId: stage.entityId,
    });
    setStagingType(stage.type);
  }, [form, stage]);
  const { mutate, isLoading } = useEditBasicStage();

  const handleFinish = (data: any) => {
    const workflowStage: TBasicWorkflowStage = {
      name: data.name,
      type: data.type,
      entityId: data.entityId,
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
    useDeleteBasicStage();

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
