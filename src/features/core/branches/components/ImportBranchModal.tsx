import { Modal } from "antd";

import ImportBranchForm from "./ImportBranchForm";
import Themes from "components/Themes";
import { IModalProps } from "types";

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
