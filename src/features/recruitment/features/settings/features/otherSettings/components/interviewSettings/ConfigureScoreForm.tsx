import { Form, Input, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { IConfigureScoreFormProps } from "../../types";

export const ConfigureScoreForm: React.FC<IConfigureScoreFormProps> = ({
  open,
  onCancel,
  handleScoreFormSubmit,
  initialValues,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Add New Rating"
      footer={null}
      open={open}
      onCancel={onCancel}
      afterClose={() => form.resetFields()}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleScoreFormSubmit}
        initialValues={{ scores: initialValues }}
        requiredMark={false}
      >
        <Form.List name="scores">
          {(fields) => (
            <>
              {fields.map((field, index) => (
                <div key={field.key}>
                  <Form.Item
                    label={`Score Title ${index + 1}`}
                    name={[field.name, "scoreTitle"]}
                    rules={textInputValidationRules}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={`Score ${index + 1}`}
                    name={[field.name, "score"]}
                    rules={generalValidationRules}
                  >
                    <Input />
                  </Form.Item>
                </div>
              ))}
              {fields.length === 0 && (
                <div>
                  <Form.Item
                    label="Score Title"
                    name={[0, "scoreTitle"]}
                    rules={textInputValidationRules}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Score"
                    name={[0, "score"]}
                    rules={generalValidationRules}
                  >
                    <Input />
                  </Form.Item>
                </div>
              )}
            </>
          )}
        </Form.List>
        <div className="flex justify-between">
          <button type="reset" onClick={onCancel}>
            Cancel
          </button>
          <AppButton type="submit" label="Save" />
        </div>
      </Form>
    </Modal>
  );
};
