import { Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import { IModalProps } from "types";

interface IProps extends IModalProps {
  title: string;
  description?: string;
  component: React.ReactNode;
}
const DisplayModal: React.FC<IProps> = ({
  open,
  handleClose,
  title,
  description,
  component,
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
        <div className="flex justify-center  items-center">{component}</div>
        <h4 className="text-center text-base mb-4 font-semibold">
          {description}
        </h4>
        <div className="flex justify-end w-full">
          <AppButton
            label="Close"
            variant="transparent"
            handleClick={() => handleClose()}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DisplayModal;
