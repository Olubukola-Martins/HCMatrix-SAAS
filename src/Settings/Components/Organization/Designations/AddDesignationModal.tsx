import { Modal } from "antd";
import { IModalProps } from "../../../../AppTypes/Component";

import AddDesignationForm from "./AddDesignationForm";

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
