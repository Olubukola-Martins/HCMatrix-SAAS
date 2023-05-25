import { Modal } from "antd";
import Themes from "components/Themes";
import { IModalProps } from "types";

const AddMultipleAssets: React.FC<IModalProps> = ({ open, handleClose }) => {
  const inputStyle =
    "w-full rounded-md border border-gray-300 py-2 px-2 text-sm mt-1 bg-mainBg focus:outline-none placeholder:text-accent";
  return (
    <Modal open={open} onCancel={() => handleClose()} footer={null}>
      <Themes>
        <div
          className="CModal scrollBar overflow-auto"
          style={{ width: 500, height: 500 }}
        >
          <div className="flex items-center justify-between mb-5">
            <h5 className="text-lg font-semibold">Add Assets</h5>
            <i className="ri-close-fill text-xl font-semibold"></i>
          </div>

          <div className="mt-3 mb-5 lg:px-6">
            <div>
              <label htmlFor="" className="text-sm font-medium">
                Import data for:
              </label>
              <select name="" id="" className={inputStyle}>
                <option value="">Asset</option>
                <option value="asset">Asset 2</option>
              </select>
            </div>

            <div className="mt-3">
              <label htmlFor="" className="text-sm font-medium">
                Import based on:
              </label>
              <select name="" id="" className={inputStyle}>
                <option value="">Select</option>
                <option value="asset">Asset 2</option>
              </select>
            </div>
          </div>
          <div>
            <div className="flex flex-col align-center text-center text-xs border border-dotted border-caramel px-1 py-2 gap-3 pb-4">
              <i className="ri-upload-2-line text-caramel text-2xl cursor-pointer"></i>
              <h6 className="text-bold text-base mb-2">
                Choose file to be Imported
              </h6>
              <p className="text-light">
                [only xls,xlsx and csv formats are supported] Maximum upload
                file size is 5 MB.
              </p>
              <div className="button-container mt-2">
                <button
                  className="py-1 px-2 rounded text-sm text-caramel border font-medium"
                  style={{ borderColor: "var(--caramel)" }}
                >
                  Upload file
                </button>
              </div>
              <p className="mt-2">Download Sample template for import</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-5">
            <button
              onClick={() => handleClose()}
              type="button"
              className="transparentButton"
            >
              Cancel
            </button>
            <button type="submit" className="button">
              Submit
            </button>
          </div>
        </div>
      </Themes>
    </Modal>
  );
};

export default AddMultipleAssets;
