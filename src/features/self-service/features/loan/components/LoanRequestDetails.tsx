import { Modal } from "antd";
import Themes from "components/Themes";
import { IModalProps } from "types";

const LoanRequestDetails: React.FC<IModalProps> = ({ open, handleClose }) => {
  const inputStyle =
    "w-full rounded-md border border-gray-300 py-2 px-2 text-sm bg-mainBg focus:outline-none placeholder:text-accent mt-1";
  const labelStyle = "font-medium text-sm";
  return (
    <Modal open={open} onCancel={() => handleClose()} footer={null}>
      <Themes>
        <div className="CModal" style={{ maxWidth: 600 }}>
          <div className="flex items-center justify-between mb-6">
            <h5 className="font-semibold text-base">Request Details</h5>
            <i
              onClick={() => handleClose()}
              className="ri-close-line font-semibold text-xl cursor-pointer hover:text-neutral"
            ></i>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-3">
              <div>
                <label className={labelStyle}>Date:</label>
                <input
                  type="text"
                  placeholder="10-08-2022"
                  className={inputStyle}
                  disabled
                />
              </div>
              <div>
                <label className={labelStyle}>Employee Name:</label>
                <input
                  type="text"
                  placeholder="Ruth Godwin"
                  className={inputStyle}
                  disabled
                />
              </div>

              <div>
                <label className={labelStyle}>Employee ID:</label>
                <input
                  type="text"
                  placeholder="G123"
                  className={inputStyle}
                  disabled
                />
              </div>
              <div>
                <label className={labelStyle}>Amount:</label>
                <input
                  type="text"
                  placeholder="000"
                  className={inputStyle}
                  disabled
                />
              </div>
            </div>

            {/* second layer */}
            <div className="flex flex-col gap-3">
              <div>
                <label className={labelStyle}>Employee ID:</label>
                <input
                  type="text"
                  placeholder="N0.00"
                  className={inputStyle}
                  disabled
                />
              </div>
              <div>
                <label className={labelStyle}>Department:</label>
                <input
                  type="text"
                  placeholder="Sales & Marketing"
                  className={inputStyle}
                  disabled
                />
              </div>
              <div>
                <label className={labelStyle}>Loan Type:</label>
                <input
                  type="text"
                  placeholder="Car Loan"
                  className={inputStyle}
                  disabled
                />
              </div>
              <div>
                <label className={labelStyle}>Status:</label>
                <input
                  type="text"
                  placeholder="Approved"
                  className={inputStyle}
                  disabled
                />
              </div>
            </div>
          </form>
        </div>
      </Themes>
    </Modal>
  );
};

export default LoanRequestDetails;
