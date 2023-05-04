import { Modal } from "antd";
import AddDepartmentForm from "./AddDepartmentForm";
import { IModalProps } from "types";

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
