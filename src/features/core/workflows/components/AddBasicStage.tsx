import { Form, Input, Select } from "antd";

import { useState } from "react";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { FormRoleInput } from "features/core/roles-and-permissions/components/FormRoleInput";
import {
  textInputValidationRules,
  generalValidationRules,
} from "utils/formHelpers/validation";
import { FormGroupInput } from "features/core/groups/components/FormGroupInput";
import { TStagingType } from "../types";
import { WORKFLOW_STAGE_TYPE_OPTIONS } from "../constants";
import { AppButton } from "components/button/AppButton";
import { borderCardStyle } from "styles/reused";

export const AddBasicStage: React.FC<{
  editable: boolean;
  handleFinish: (data: any) => void;
  enableEdit: () => void;
  removeStage: () => void;
}> = ({ editable, handleFinish, enableEdit, removeStage }) => {
  const [form] = Form.useForm();
  const [stagingType, setStagingType] = useState<TStagingType>();

  return (
    <div className={`flex flex-col gap-4 w-full ${borderCardStyle}`}>
      <Form
        form={form}
        onFinish={handleFinish}
        disabled={!editable}
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
          handleClick={() => removeStage()}
        />
        {!editable ? (
          <AppButton label="Edit" handleClick={() => enableEdit()} />
        ) : (
          <AppButton label="Save" handleClick={() => form.submit()} />
        )}
      </div>
    </div>
  );
};
