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
import { TSingleBasicWorkflowStage } from "../hooks/useFetchSingleBasicWorkflow";

export type TStagingType = "employee" | "role" | "group" | "department-head";
export type TStage = {
  id: number;
  name: string;
  type?: TStagingType;
  concernedId?: number;
};

export const EditStage: React.FC<{
  workflowId: number;
  stage: TSingleBasicWorkflowStage;
}> = ({ stage, workflowId }) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const [stagingType, setStagingType] = useState<TStagingType>();
  const [edit, setEdit] = useState(false);

  const determineStageType = (stage: TBasicWorkflowStage): TStagingType => {
    let ans: TStagingType = "employee";
    if (typeof stage["roleId"] === "number") ans = "role";
    if (typeof stage["employeeId"] === "number") ans = "employee";
    if (typeof stage["groupId"] === "number") ans = "group";
    if (typeof stage["departmentHeadId"] === "number") ans = "department-head";
    return ans;
  };
  useEffect(() => {
    form.setFieldsValue({
      name: stage.name,
      type: determineStageType(stage),
      employeeId: stage.employeeId,
      roleId: stage.roleId,
      groupId: stage.groupId,
    });
    setStagingType(determineStageType(stage));
  }, [form, stage]);
  const { mutate, isLoading } = useEditBasicStage();

  const handleFinish = (data: any) => {
    const workflowStage: TBasicWorkflowStage = { name: data.name };
    if (stagingType === "role") workflowStage["roleId"] = data.roleId;
    if (stagingType === "employee")
      workflowStage["employeeId"] = data.employeeId;
    if (stagingType === "group") workflowStage["groupId"] = data.groupId;
    // if (stagingType === "department-head")
    //   workflowStage["departmentHeadId"] = data.departmentHeadId;
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
            queryKey: ["basic-workflow", workflowId],
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
            queryKey: ["basic-workflow", workflowId],
            // exact: true,
          });
        },
      }
    );
  };
  return (
    <div className="flex gap-4 items-end">
      <Form
        form={form}
        onFinish={handleFinish}
        disabled={!edit}
        labelCol={{ span: 24 }}
        requiredMark={false}
      >
        <div className="flex gap-4">
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
              options={[
                { label: "employee", value: "employee" },
                { label: "role", value: "role" },
                { label: "group", value: "group" },
                {
                  label: "Department Head",
                  value: "department-head",
                },
              ]}
              onSelect={(val: TStagingType) => {
                setStagingType(val);
              }}
            />
          </Form.Item>
          {stagingType === "employee" && (
            <FormEmployeeInput
              Form={Form}
              control={{ label: "Employee", name: "employeeId" }}
            />
          )}
          {stagingType === "role" && (
            <FormRoleInput
              Form={Form}
              control={{ label: "Role", name: "roleId" }}
            />
          )}
          {stagingType === "group" && (
            <FormGroupInput
              Form={Form}
              control={{ label: "Group", name: "groupId" }}
            />
          )}
        </div>
      </Form>
      <div className="flex gap-4 mb-6">
        {!edit ? (
          <Button icon={<EditOutlined />} onClick={() => setEdit(true)}>
            Edit
          </Button>
        ) : (
          <Button
            icon={<SaveOutlined />}
            type="primary"
            onClick={() => form.submit()}
            loading={isLoading}
          >
            Save
          </Button>
        )}
        <Button
          icon={<DeleteOutlined />}
          type="dashed"
          loading={isDelLoading}
          onClick={() => removeStage()}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
