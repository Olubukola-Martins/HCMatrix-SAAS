import { Modal } from "antd";

import EditDesignationForm from "./EditDesignationForm";
import { IModalProps } from "types";

interface IProps extends IModalProps {
  id: number;
}

export const EditDesignationModal = ({ open, handleClose, id }: IProps) => {
  return (
    <Modal
      title="Edit Designation"
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      style={{ top: 20 }}
    >
      <EditDesignationForm handleClose={handleClose} id={id} />
    </Modal>
  );
};
