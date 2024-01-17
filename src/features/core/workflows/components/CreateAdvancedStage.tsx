import { Form, Input, Select, InputNumber } from "antd";

import { useEffect, useState } from "react";
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
import { AppButton } from "components/button/AppButton";

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
    <div className="flex flex-col gap-4 w-full">
      <Form
        form={form}
        onFinish={handleFinish}
        disabled={!stage.editable}
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
          handleClick={() => removeStage(stage.id)}
        />
        {!stage.editable ? (
          <AppButton label="Edit" handleClick={() => enableEdit(stage.id)} />
        ) : (
          <AppButton label="Save" handleClick={() => form.submit()} />
        )}
      </div>
    </div>
  );
};
