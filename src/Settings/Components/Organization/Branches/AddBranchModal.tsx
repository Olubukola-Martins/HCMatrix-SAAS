import { Modal } from "antd";
import Themes from "Themes/Themes";
import { IModalProps } from "../../../../AppTypes/Component";
import AddBranchForm from "./AddBranchForm";

export const AddBranchModal = ({ open, handleClose }: IModalProps) => {
  return (
    <Modal
      title="Add Branch"
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      style={{ top: 10 }}
    >
      <Themes>
        <AddBranchForm handleClose={handleClose} />
      </Themes>
    </Modal>
  );
};
