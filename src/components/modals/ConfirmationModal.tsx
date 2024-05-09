import { Modal, Skeleton } from "antd";
import { confirmActionSvg } from "assets/images";
import { AppButton } from "components/button/AppButton";
import { IModalProps } from "types";

interface IProps extends IModalProps {
  title: string;
  description?: string;
  loading?: boolean;
  hideImage?: boolean;
  handleConfirm: {
    fn: () => void;
    isLoading?: boolean;
    text?: string;
  };
}
const ConfirmationModal: React.FC<IProps> = ({
  open,
  handleClose,
  title,
  description,
  loading,
  handleConfirm,
  hideImage = false,
}) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={title}
      style={{ top: 20 }}
    >
      <Skeleton loading={loading} paragraph={{ rows: 12 }}>
        <div className="flex flex-col gap-4 items-center">
          {!hideImage ? (
            <div className="flex justify-center h-[50vh] items-center">
              <img
                src={confirmActionSvg}
                alt="confirm action"
                className="object-contain h-4/5"
              />
            </div>
          ) : null}
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
              label={handleConfirm?.text ?? "Confirm"}
              handleClick={() => handleConfirm.fn()}
              isLoading={handleConfirm.isLoading}
            />
          </div>
        </div>
      </Skeleton>
    </Modal>
  );
};

export default ConfirmationModal;
