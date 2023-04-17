import { Modal } from "antd";
import AddGroupForm from "./AddGroupForm";
import { IModalProps } from "types";

export const AddGroupModal = ({ open, handleClose }: IModalProps) => {
  return (
    <Modal
      title="Add Group"
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      style={{ top: 20 }}
    >
      <AddGroupForm handleClose={handleClose} />
    </Modal>
  );
};
