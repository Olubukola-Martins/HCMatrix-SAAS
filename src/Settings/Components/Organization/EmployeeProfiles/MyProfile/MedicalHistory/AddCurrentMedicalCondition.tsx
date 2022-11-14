import { Form, Modal } from "antd";
import { IModalProps } from "../../../../../../AppTypes/Component";
import { inputValidationRules } from "../../../../../../FormHelpers/validation";

export const AddCurrentMedicalCondition = ({ open, handleClose }: IModalProps) => {
  return (
    <Modal
      title="Add Current Medical Condition"
      open={open}
      onCancel={() => handleClose(false)}
    //   onOk={false}
    footer={null}
    >
     <Form>
        <Form.Item name="condition" rules={inputValidationRules}>
               
        </Form.Item>
     </Form>
    </Modal>
  );
};
