import { Form, Input, Switch } from "antd";
import {
  INTERVIEW_STAGE_SETTINGS_MODE_OF_INTERVIEW,
  INTERVIEW_STAGE_SETTINGS_STATUS,
} from "../../constants/defaultOtherSettings";
import { OtherSettingsFormSwitch } from "../OtherSettingsFormSwitch";
import { AppButton } from "components/button/AppButton";
import { generalValidationRules } from "utils/formHelpers/validation";
import { ConfigureScoreTable } from "./ConfigureScoreTable";

export const InterviewConfiguration = () => {
  const [form] = Form.useForm();
  const handleSubmit = (val: any) => {
    console.log("values of form", val);
  };

  const handleAddField = () => {
    const newInterviewStatus = form.getFieldValue("newInterviewStatus") || [];
    const initialInterviewStatus = {
      interviewStatusName: "",
      interviewStatus: true,
    };
    form.setFieldsValue({
      newInterviewStatus: [...newInterviewStatus, initialInterviewStatus],
    });
  };

  const handleRemoveField = (index: number) => {
    const newInterviewStatus = form.getFieldValue("newInterviewStatus") || [];
    form.setFieldsValue({
      newInterviewStatus: newInterviewStatus.filter(
        (_: any, i: number) => i !== index
      ),
    });
  };
  return (
    <div className="Container">
      <p className="p-2 text-base mb-3">Set up score</p>
      <ConfigureScoreTable />
      <div>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          requiredMark={false}
        >
          <p className="p-2 my-3 text-base">Set up mode of interview</p>
          {INTERVIEW_STAGE_SETTINGS_MODE_OF_INTERVIEW.map((item) => (
            <OtherSettingsFormSwitch label={item.label} name={item.name} />
          ))}
          <p className="p-2 mb-3 text-base">Set up interview status</p>

          {INTERVIEW_STAGE_SETTINGS_STATUS.map((item) => (
            <OtherSettingsFormSwitch label={item.label} name={item.name} />
          ))}
          <Form.List name="newInterviewStatus">
            {(fields) => (
              <>
                {fields.map((field, index) => (
                  <div
                    key={field.key}
                    className="flex justify-between items-center"
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, "interviewStatusName"]}
                      label="Interview Status"
                      className="w-full"
                      rules={generalValidationRules}
                    >
                      <Input placeholder="Add Interview Status" />
                    </Form.Item>

                    <div className="flex items-center justify-end gap-3 w-full">
                      <Form.Item
                        valuePropName="checked"
                        name={[field.name, "interviewStatus"]}
                        className="flex justify-end items-end"
                        noStyle
                      >
                        <Switch />
                      </Form.Item>

                      <i
                        className="ri-delete-bin-line text-xl cursor-pointer hover:text-caramel"
                        onClick={() => handleRemoveField(index)}
                      ></i>
                    </div>
                  </div>
                ))}

                <AppButton
                  variant="transparent"
                  label="Add New Interview Status"
                  handleClick={() => handleAddField()}
                />
              </>
            )}
          </Form.List>

          <div className="flex justify-end">
            <AppButton label="Save" type="submit" />
          </div>
        </Form>
      </div>
    </div>
  );
};
