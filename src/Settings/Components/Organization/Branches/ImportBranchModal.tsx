import { Modal } from "antd";
import Themes from "Themes/Themes";
import { IModalProps } from "../../../../AppTypes/Component";
import AddBranchForm from "./AddBranchForm";
import ImportBranchForm from "./ImportBranchForm";

export const ImportBranchModal = ({ open, handleClose }: IModalProps) => {
  return (
    <Modal
      title="Import Branches"
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      style={{ top: 10 }}
    >
      <Themes>
        <ImportBranchForm handleClose={handleClose} />
      </Themes>
    </Modal>
  );
};
