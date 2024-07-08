import { useState } from "react";
import { Form, Select, InputNumber } from "antd";
import { AppButton } from "components/button/AppButton";
import { OtherSettingsFormSwitch } from "./OtherSettingsFormSwitch";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { FormRoleInput } from "features/core/roles-and-permissions/components/FormRoleInput";
import { FormGroupInput } from "features/core/groups/components/FormGroupInput";
import { notificationSettings } from "../constants/defaultOtherSettings";

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
        Define who receives notifications by selecting employees, groups or line
        managers already created in the system.
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
          <Form.Item name="notificationRecipient" className="w-1/2">
            <Select
              options={[
                { label: "Group", value: "group" },
                { label: "Role", value: "role" },
                { value: "employee", label: "Employee" },
              ]}
              onChange={handleSelectChange}
            />
          </Form.Item>
          {selectedOption === "group" && (
            <FormGroupInput
              Form={Form}
              mode="multiple"
              control={{ name: "group", label: "" }}
            />
          )}
          {selectedOption === "role" && (
            <FormRoleInput
              Form={Form}
              mode="multiple"
              control={{ name: "role", label: "" }}
            />
          )}
          {selectedOption === "employee" && (
            <FormEmployeeInput
              Form={Form}
              mode="multiple"
              control={{ name: "employee", label: "" }}
            />
          )}
        </div>
        {notificationSettings.map((item) => (
          <OtherSettingsFormSwitch label={item.label} name={item.name} />
        ))}

        <p className="mb-2">Panelist Notification</p>
        <OtherSettingsFormSwitch
          label="Send Notification reminder to Panelist before the expiration of their invite due date."
          name="panelistNotifExpire"
        />
        <div>
          <Form.Item
            className="w-full"
            label="Set number of days before the due date"
          >
            <InputNumber suffix="days" className="w-1/3" />
          </Form.Item>
        </div>

        <div className="flex justify-end">
          <AppButton label="Save" type="submit" />
        </div>
      </Form>
    </div>
  );
};
