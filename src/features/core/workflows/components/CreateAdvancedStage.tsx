import { Form, Input, Select, Button, InputNumber } from "antd";

import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { FormGroupInput } from "features/core/groups/components/FormGroupInput";
import { FormRoleInput } from "features/core/roles-and-permissions/components/FormRoleInput";
import {
  textInputValidationRules,
  generalValidationRules,
} from "utils/formHelpers/validation";
import { TStage, TStageCondition, TStagingType } from "../types";
import { OptionalTypeParams } from "types/optionalTypes";
import {
  WORKFLOW_STAGE_CONDITION_OPTIONS,
  WORKFLOW_STAGE_TYPE_OPTIONS,
} from "../constants";

export const CreateAdvancedStage: React.FC<{
  stage: OptionalTypeParams<
    TStage,
    "entityId" | "type" | "enableTwoFactorAuth"
  > & {
    editable: boolean;
  };
  handleFinish: (data: any) => void;
  enableEdit: (id: number) => void;
  removeStage: (id: number) => void;
}> = ({ stage, handleFinish, enableEdit, removeStage }) => {
  const [form] = Form.useForm();
  const [stagingType, setStagingType] = useState<TStagingType>();
  const [stagingCondition, setStagingCondition] = useState<TStageCondition>();
  useEffect(() => {
    if (stage) {
      form.setFieldsValue({
        name: stage.name,
        type: stage.type,
        entityId: stage.entityId,
        enableTwoFactorAuth: stage.enableTwoFactorAuth,
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
          {!!stagingType && stagingType !== "employee" && (
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
