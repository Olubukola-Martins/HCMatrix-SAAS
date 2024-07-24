import { InterviewStageReorderDivs } from "./InterviewStageReorderDivs";
import { Form, Input, Switch } from "antd";
import { AppButton } from "components/button/AppButton";
import { generalValidationRules } from "utils/formHelpers/validation";

export const InterviewStages = () => {
  const [form] = Form.useForm();
  const handleSubmit = (val: any) => {
    console.log("values of form", val);
  };

  const handleAddField = () => {
    const newInterviewStage = form.getFieldValue("newInterviewStage") || [];
    const initialInterviewStage = {
      interviewStageName: "",
      interviewStageStatus: true,
    };
    form.setFieldsValue({
      newInterviewStage: [...newInterviewStage, initialInterviewStage],
    });
  };

  const handleRemoveField = (index: number) => {
    const newInterviewStage = form.getFieldValue("newInterviewStage") || [];
    form.setFieldsValue({
      newInterviewStage: newInterviewStage.filter(
        (_: any, i: number) => i !== index
      ),
    });
  };
  return (
    <div>
      <p className="p-2 text-base mb-3">
        You can rearrange the interview stages order, add new interview stage
        and also edit the default settings.
      </p>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        requiredMark={false}
      >
        <InterviewStageReorderDivs />
        <Form.List name="newInterviewStage">
          {(fields) => (
            <>
              {fields.map((field, index) => (
                <div
                  key={field.key}
                  className="flex justify-between items-center"
                >
                  <Form.Item
                    {...field}
                    name={[field.name, "interviewStageName"]}
                    label="Interview Stage Name"
                    className="w-full"
                    rules={generalValidationRules}
                  >
                    <Input placeholder="Add Stage Name" />
                  </Form.Item>

                  <div className="flex items-center justify-end gap-3 w-full">
                    <Form.Item
                      valuePropName="checked"
                      name={[field.name, "interviewStageStatus"]}
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
                label="Add New Interview Stage"
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
  );
};
