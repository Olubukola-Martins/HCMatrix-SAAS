import { Modal } from "antd";
import { IModalProps } from "../../../../AppTypes/Component";

import EditBranchForm from "./EditBranchForm";

interface IProps extends IModalProps {
  id: number;
  editable?: boolean;
}

export const EditBranchModal = ({
  open,
  handleClose,
  id,
  editable = true,
}: IProps) => {
  return (
    <Modal
      title={editable ? "Edit Branch" : "View Branch"}
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      style={{ top: 20 }}
    >
      <EditBranchForm handleClose={handleClose} id={id} disabled={!editable} />
    </Modal>
  );
};
