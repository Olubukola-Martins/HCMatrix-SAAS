import React from "react";
import { Modal } from "@mui/material";

const AddMultipleAssets = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="CModal" style={{ width: 400 }}>
        <div className="flex items-center justify-between mb-5">
          <h5 className="text-lg font-semibold">Add Assets</h5>
          <i className="ri-close-fill text-xl font-semibold"></i>
        </div>

        
      </div>
    </Modal>
  );
};

export default AddMultipleAssets;
