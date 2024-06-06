import { Form, Input, Select, Button } from "antd";

import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { FormGroupInput } from "features/core/groups/components/FormGroupInput";
import { FormRoleInput } from "features/core/roles-and-permissions/components/FormRoleInput";
import {
  textInputValidationRules,
  generalValidationRules,
} from "utils/formHelpers/validation";
import { TStage, TStagingType } from "../types";
import { OptionalTypeParams } from "types/optionalTypes";
import { WORKFLOW_STAGE_TYPE_OPTIONS } from "../constants";
import { AppButton } from "components/button/AppButton";

export const CreateBasicStage: React.FC<{
  stage: OptionalTypeParams<TStage, "entityId" | "type"> & {
    editable: boolean;
  };
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
        entityId: stage.entityId,
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
            className=""
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
