import { Form, Input, Modal } from "antd";
import { IModalProps } from "../../../../AppTypes/Component";

export const AddDomain = ({ open, handleClose }: IModalProps) => {
  return (
    <Modal
      title="Add Domain"
      open={open}
      onCancel={() => handleClose(false)}
      footer={null}
    >
      <Form layout="vertical">
        <Form.Item
          name="domain"
          label="Domain"
          rules={[
            {
              required: true,
              message: "Field is required",
            },
            {
              type: "url",
            },
          ]}
        >
          <Input className="generalInputStyle" placeholder="www.domain.com" />
        </Form.Item>

        <button className="button">Submit</button>
      </Form>
    </Modal>
  );
};
