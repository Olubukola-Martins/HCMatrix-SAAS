import { Modal } from "antd";
import { IModalProps } from "../../../../../../AppTypes/Component";

export const AddCurrentMedicalCondition = ({ open, handleClose }: IModalProps) => {
  return (
    <Modal
      title="Basic Modal"
      open={open}
      onCancel={() => handleClose}
    >
      AddCurrentMedicalCondition
    </Modal>
  );
};
