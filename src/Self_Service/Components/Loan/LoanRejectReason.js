import { Modal } from "@mui/material";
import React from "react";
import Themes from "../../../Themes/Themes";

const LoanRejectReason = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Themes>
        <div className="CModal" style={{ maxWidth: 400 }}>
          <h5 className="font-semibold pb-5">Reason for Rejection</h5>

          <div>
            <label htmlFor="date" className="text-sm font-medium">
              Enter Reason
            </label>
            <textarea
              type="text"
              id="date"
              rows="3"
              className="w-full bg-mainBg px-2 py-2 rounded focus:outline-none mt-1 text-sm border"
            />
          </div>

          <div className="flex items-center justify-between mt-5">
            <button
              onClick={handleClose}
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
