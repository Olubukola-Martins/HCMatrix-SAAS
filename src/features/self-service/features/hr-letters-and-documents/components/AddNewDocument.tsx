import { Modal } from "antd";
import { IModalProps } from "types";

export const AddNewDocument: React.FC<IModalProps> = ({
  open,
  handleClose,
}) => {
  return (
    <Modal
      title="Add New Document"
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      //   footer={[
      //     <button className="transparentButton mr-3">Cancel</button>,
      //     <button className="button">Submit</button>,
      //   ]}
    >
      <form>
        <input
          type="text"
          className="border border-slate-400 text-accent bg-transparent py-2 pl-2 text-sm rounded w-full focus:outline-none"
        />
        <div></div>
      </form>
    </Modal>
  );
};
