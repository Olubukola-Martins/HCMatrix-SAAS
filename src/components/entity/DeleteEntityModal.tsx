import { Modal } from "antd";
import PersonTrashIcon from "assets/svg-components/PersonTrashIcon/PersonTrashIcon";
import { AppButton } from "components/button/AppButton";
import { IModalProps } from "types";

interface IProps extends IModalProps {
  title: string;
  entity: {
    type: string;
    name: string;
  };
  handleDelete: {
    fn: () => void;
    isLoading: boolean;
  };
}
const DeleteEntityModal: React.FC<IProps> = ({
  open,
  handleClose,
  title,
  entity,
  handleDelete,
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
          <PersonTrashIcon className="object-contain h-4/5" />
        </div>
        <h4 className="text-center text-base mb-4 font-semibold">
          Are you sure you want to delete {entity.name} {entity.type}?
        </h4>
        <div className="flex justify-between w-full">
          <AppButton
            label="Cancel"
            variant="transparent"
            handleClick={() => handleClose()}
          />
          <AppButton
            label="Delete"
            handleClick={() => handleDelete.fn()}
            isLoading={handleDelete.isLoading}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteEntityModal;
