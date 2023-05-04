import { Modal } from "antd";
import { IModalProps } from "AppTypes/Component";
import AddGroupForm from "./AddGroupForm";

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
