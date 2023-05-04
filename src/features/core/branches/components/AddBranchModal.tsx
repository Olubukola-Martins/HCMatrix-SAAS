import { Modal } from "antd";
import AddBranchForm from "./AddBranchForm";
import Themes from "components/Themes";
import { IModalProps } from "types";

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
