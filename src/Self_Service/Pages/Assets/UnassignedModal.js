import { Modal } from "@mui/material";
import React from "react";
import Themes from "../../../Themes/Themes";

const UnassignedModal = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
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
            />
          </div>

          <div className="flex items-center justify-between mt-5">
            <button className="transparentButton" type="button">
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

export default UnassignedModal;
