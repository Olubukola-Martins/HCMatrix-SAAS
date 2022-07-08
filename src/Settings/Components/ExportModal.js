import React from "react";
import Themes from "../../Themes/Themes";
import Modal from "@mui/material/Modal";

const ExportModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="Email Verification"
      aria-describedby="Please verify your account by checking your inbox."
      BackdropProps={{ invisible: false }}
    >
      <Themes>
        <div className="CModal" style={{ maxWidth: 600 }}>
          <div className="flex flex-col items-center justify-center pb-8  text-accent">
            <div className="flex items-center justify-end w-full mb-4">
              <i
                class="fas fa-times cursor-pointer text-2xl"
                onClick={handleClose}
              ></i>
            </div>

            <h4 className="font-bold text-lg mb-4 text-center">Export As</h4>
            <p className="text-center">
              The records that come under the selected filter view will be
              exported.
            </p>
            <div className="radio-inputs mt-6 flex items-center gap-2">
              {["xls", "xlsx", "csv", "tsv"].map((item) => (
                <div
                  key={item}
                  className="radio-input flex gap-2 items-center px-3 py-1 bg-opacity-20 bg-gray-500 rounded"
                >
                  <input type="radio" name="exportType"></input>
                  <label>{item}</label>
                </div>
              ))}
            </div>
            <div className="buttons mt-6 flex items-center gap-4">
              <button className="px-3 py-1 bg-caramel rounded text-sm text-white font-medium hover:bg-opacity-70">
                Export
              </button>
              <button
                onClick={handleClose}
                className="px-3 py-1 bg-transparent rounded text-sm text-accent border border-slate-200 hover:border-slate-400 font-medium transition ease-in-out duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Themes>
    </Modal>
  );
};

export default ExportModal;
