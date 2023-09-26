import { Modal } from "antd";
import { confirmActionSvg } from "assets/images";
import { AppButton } from "components/button/AppButton";
import { IModalProps } from "types";

interface IProps extends IModalProps {
  title: string;
  description?: string;
  handleConfirm: {
    fn: () => void;
    isLoading: boolean;
  };
}
const ConfirmationModal: React.FC<IProps> = ({
  open,
  handleClose,
  title,
  description,
  handleConfirm,
}) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={title}
      style={{ top: 20 }}
    >
      <div className="flex flex-col gap-4 items-center">
        <div className="flex justify-center h-[50vh] items-center">
          <img
            src={confirmActionSvg}
            alt="delete"
            className="object-contain h-4/5"
          />
        </div>
        <h4 className="text-center text-base mb-4 font-semibold">
          {description}
        </h4>
        <div className="flex justify-between w-full">
          <AppButton
            label="Cancel"
            variant="transparent"
            handleClick={() => handleClose()}
          />
          <AppButton
            label="Confirm"
            handleClick={() => handleConfirm.fn()}
            isLoading={handleConfirm.isLoading}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
