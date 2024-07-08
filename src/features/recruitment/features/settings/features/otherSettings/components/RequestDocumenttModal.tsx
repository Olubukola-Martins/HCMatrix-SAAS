import { Form, Input, Modal, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";

export const RequestDocumentModal = ({
  open,
  onCancel,
  handleSubmit,
  initialValues,
}: {
  open: boolean;
  onCancel: () => void;
  handleSubmit: (values: any) => void;
  initialValues: any;
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Add Document"
      footer={null}
      open={open}
      onCancel={onCancel}
      afterClose={() => form.resetFields()}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        initialValues={initialValues}
      >
        <Form.Item
          label="Document Name"
          name="document"
          rules={textInputValidationRules}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="File Type"
          name="fileType"
          rules={generalValidationRules}
        >
          <Select
            mode="multiple"
            options={[
              { label: "PDF", value: "pdf" },
              { label: "PPT", value: "ppt" },
              { label: "Word", value: "word" },
            ]}
          />
        </Form.Item>
        <div className="flex justify-between items-center">
          <Form.Item
            label="Maximum Size"
            name="maxSize"
            rules={textInputValidationRules}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Size Type"
            name="sizeType"
            rules={generalValidationRules}
          >
            <Select
              options={[
                { label: "KB", value: "kb" },
                { label: "MB", value: "mb" },
              ]}
            />
          </Form.Item>
        </div>
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
