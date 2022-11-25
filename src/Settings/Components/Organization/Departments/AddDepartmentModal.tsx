import { Modal } from "antd";
import { IModalProps } from "../../../../AppTypes/Component";

import AddDepartmentForm from "./AddDepartmentForm";

export const AddDepartmentModal = ({ open, handleClose }: IModalProps) => {
  return (
    <Modal
      title="Add Department"
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      style={{ top: 20 }}
    >
      <AddDepartmentForm handleClose={handleClose} />
    </Modal>
  );
};
