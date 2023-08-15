import { Modal } from "antd";
import { IModalProps } from "types";

export const AddUdemyLicense = ({ open, handleClose }: IModalProps) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      style={{ maxWidth: 500, top: 10 }}
      footer={null}
    >
      hello
    </Modal>
  );
};
