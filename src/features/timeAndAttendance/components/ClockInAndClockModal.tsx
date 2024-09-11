import { Modal } from "antd";
import { IModalProps } from "types";

interface lProps extends IModalProps {
  title: string;
}
export const ClockInAndClockModal = ({ handleClose, open, title }: lProps) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={title}
      style={{ top: 15 }}
    >
      ClockInAndClockModal
    </Modal>
  );
};
