import { useState } from "react";
import { Form, Select, Input, Checkbox } from "antd";
import { AppButton } from "components/button/AppButton";
import { OtherSettingsFormSwitch } from "./OtherSettingsFormSwitch";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { FormRoleInput } from "features/core/roles-and-permissions/components/FormRoleInput";
import { FormGroupInput } from "features/core/groups/components/FormGroupInput";

export const NotificationSettings = () => {
  const [form] = Form.useForm();
  const [selectedOption, setSelectedOption] = useState("");

  const handleSubmit = (val: any) => {
    console.log("form values:", val);
  };

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <div>
      <p className="p-2 text-base mb-3">
        Define who receives notifications by selecting employee, group or line
        manager created already in the system.
      </p>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        requiredMark={false}
      >
        <OtherSettingsFormSwitch
          label="Allow notifications when an applicant send in his/her applications"
          name="allowNotifications"
        />

        <p>Select who receives the notification</p>
        <div className="flex gap-5 items-center">
          <Form.Item
            // label=""
            name="notificationRecipient"
            className="w-1/2"
          >
            <Select
              options={[
                { label: "Group", value: "group" },
                { label: "Role", value: "role" },
                { value: "employee", label: "Employee" },
              ]}
              onChange={handleSelectChange}
            />
          </Form.Item>
          <Form.Item className="w-1/2">
            {selectedOption === "group" && <FormGroupInput Form={Form}  />}
            {selectedOption === "role" && (
              <FormRoleInput Form={Form} />
            )}
            {selectedOption === "employee" && (
              <FormEmployeeInput
                Form={Form}
                mode="multiple"
                // showLabel={false}
              />
            )}
          </Form.Item>
        </div>
        <div className="flex justify-end">
          <AppButton label="Save" type="submit" />
        </div>
      </Form>
    </div>
  );
};
