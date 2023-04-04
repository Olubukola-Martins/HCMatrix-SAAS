import { Form, Input, Select, Button } from "antd";
import { FormEmployeeInput } from "GeneralComps/FormEmployeeInput";
import { FormGroupInput } from "GeneralComps/FormGroupInput";
import { FormRoleInput } from "GeneralComps/FormRoleInput";
import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import {
  generalValidationRules,
  textInputValidationRules,
} from "FormHelpers/validation";

export type TStagingType = "employee" | "role" | "group" | "department-head";
export type TStage = {
  id: number;
  name: string;
  type?: TStagingType;
  concernedId?: number;
};

export const CreateStage: React.FC<{
  stage: TStage & { editable: boolean };
  handleFinish: (data: any) => void;
  enableEdit: (id: number) => void;
  removeStage: (id: number) => void;
}> = ({ stage, handleFinish, enableEdit, removeStage }) => {
  const [form] = Form.useForm();
  const [stagingType, setStagingType] = useState<TStagingType>();
  useEffect(() => {
    if (stage) {
      form.setFieldsValue({
        name: stage.name,
        type: stage.type,
        employeeId: stage.concernedId,
        roleId: stage.concernedId,
        groupId: stage.concernedId,
      });
    }
  }, [form, stage]);
  return (
    <div className="flex gap-4 items-end">
      <Form
        form={form}
        onFinish={handleFinish}
        disabled={!stage.editable}
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
        {!stage.editable ? (
          <Button icon={<EditOutlined />} onClick={() => enableEdit(stage.id)}>
            Edit
          </Button>
        ) : (
          <Button
            icon={<SaveOutlined />}
            type="text"
            onClick={() => form.submit()}
          >
            Save
          </Button>
        )}
        <Button icon={<DeleteOutlined />} onClick={() => removeStage(stage.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};
