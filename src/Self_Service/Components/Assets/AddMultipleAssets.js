import React from "react";
import { Modal } from "@mui/material";
import Themes from "../../../Themes/Themes";

const AddMultipleAssets = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
    <Themes>
    <div className="CModal" style={{ width: 500 }}>
        <div className="flex items-center justify-between mb-5">
          <h5 className="text-lg font-semibold">Add Assets</h5>
          <i className="ri-close-fill text-xl font-semibold"></i>
        </div>

        <div></div>

        <div>
          <div className="flex flex-col align-center text-center text-xs border border-dotted border-caramel px-1 py-2 gap-3 pb-4">
            <i className="ri-upload-2-line text-caramel text-2xl cursor-pointer"></i>
            <h6 className="text-bold text-base mb-2">
              Choose file to be Imported
            </h6>
            <p className="text-light">
              [only xls,xlsx and csv formats are supported] Maximum upload file
              size is 5 MB.
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
            onClick={handleClose}
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
