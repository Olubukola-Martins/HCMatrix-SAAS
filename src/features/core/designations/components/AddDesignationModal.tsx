import { Modal } from "antd";
import AddDesignationForm from "./AddDesignationForm";
import { IModalProps } from "types";

export const AddDesignationModal = ({ open, handleClose }: IModalProps) => {
  return (
    <Modal
      title="Add Designation"
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      style={{ top: 20 }}
    >
      <AddDesignationForm handleClose={handleClose} />
    </Modal>
  );
};
