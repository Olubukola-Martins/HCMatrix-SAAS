import { Modal } from "antd";
import Themes from "components/Themes";
import { IModalProps } from "types";

const UnassignedAssetUserModal: React.FC<IModalProps> = ({
  open,
  handleClose,
}) => {
  return (
    <Modal open={open} onCancel={() => handleClose()} footer={null}>
      <Themes>
        <div className="CModal" style={{ maxWidth: 400 }}>
          <h5 className="font-semibold pb-5">Unassign User</h5>

          <div>
            <label htmlFor="date" className="text-sm font-medium">
              End Date
            </label>
            <input
              type="text"
              id="date"
              placeholder="DD/MM/YY"
              className="w-full bg-mainBg px-2 py-2 rounded focus:outline-none mt-1 placeholder:text-sm placeholder:font-medium placeholder:text-accent"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
            />
          </div>

          <div className="flex items-center justify-between mt-5">
            <button
              onClick={() => handleClose()}
              className="transparentButton"
              type="button"
            >
              Cancel
            </button>
            <button className="button" type="submit">
              Unassign
            </button>
          </div>
        </div>
      </Themes>
    </Modal>
  );
};

export default UnassignedAssetUserModal;
