import { Modal } from "antd";
import { IModalProps } from "types";

interface IProps extends IModalProps {
  typeId: number;
  paymentPlanId: number;
  amount: number;
}

export const EligibilityModal = ({ open, handleClose }: IProps) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Loan Calculator"}
      style={{ top: 20 }}
    >
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border-r">1</div>
        <div>2</div>
      </div>
    </Modal>
  );
};
