import { Modal } from "antd";
import Themes from "components/Themes";
import { IModalProps } from "types";

const LoanRejectReason: React.FC<IModalProps> = ({ open, handleClose }) => {
  return (
    <Modal open={open} onCancel={() => handleClose()} footer={null}>
      <Themes>
        <div className="CModal" style={{ maxWidth: 400 }}>
          <h5 className="font-semibold pb-5">Reason for Rejection</h5>

          <div>
            <label htmlFor="date" className="text-sm font-medium">
              Enter Reason
            </label>
            <textarea
              id="date"
              className="w-full bg-mainBg px-2 py-2 rounded focus:outline-none mt-1 text-sm border"
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
              Submit
            </button>
          </div>
        </div>
      </Themes>
    </Modal>
  );
};

export default LoanRejectReason;
