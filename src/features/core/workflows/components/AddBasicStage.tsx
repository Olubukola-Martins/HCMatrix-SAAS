import { Form, Input, Select, Button } from "antd";

import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { FormRoleInput } from "features/core/roles-and-permissions/components/FormRoleInput";
import {
  textInputValidationRules,
  generalValidationRules,
} from "utils/formHelpers/validation";
import { FormGroupInput } from "features/core/groups/components/FormGroupInput";

export type TStagingType = "employee" | "role" | "group" | "department-head";
export type TStage = {
  id: number;
  name: string;
  type?: TStagingType;
  concernedId?: number;
};

export const AddBasicStage: React.FC<{
  editable: boolean;
  handleFinish: (data: any) => void;
  enableEdit: () => void;
  removeStage: () => void;
}> = ({ editable, handleFinish, enableEdit, removeStage }) => {
  const [form] = Form.useForm();
  const [stagingType, setStagingType] = useState<TStagingType>();

  return (
    <div className="flex gap-4 items-end">
      <Form
        form={form}
        onFinish={handleFinish}
        disabled={!editable}
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
              control={{ label: "Employee", name: "concernedId" }}
            />
          )}
          {stagingType === "role" && (
            <FormRoleInput
              Form={Form}
              control={{ label: "Role", name: "concernedId" }}
            />
          )}
          {stagingType === "group" && (
            <FormGroupInput
              Form={Form}
              control={{ label: "Group", name: "concernedId" }}
            />
          )}
        </div>
      </Form>
      <div className="flex gap-4 mb-6">
        {!editable ? (
          <Button icon={<EditOutlined />} onClick={() => enableEdit()}>
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
        <Button icon={<DeleteOutlined />} onClick={() => removeStage()}>
          Delete
        </Button>
      </div>
    </div>
  );
};
