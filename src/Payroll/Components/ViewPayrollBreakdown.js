import { Modal } from "@mui/material";
import React from "react";
import Themes from "../../Themes/Themes";

const ViewPayrollBreakdown = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Themes>
        <div className="CModal border border-red-400" style={{ maxWidth: 600 }}>
          <div className="flex items-center justify-between">
            <h5 className="font-semibold text-lg">Payroll breakdown</h5>
            <i
              onClick={handleClose}
              className="ri-close-line font-semibold text-xl"
            ></i>
          </div>

          <div className="text-sm mt-5">
            <div className="bg-mainBg flex items-center justify-between px-5 py-2">
              <span> Employee Name</span>
              <span>Ruth Godwin</span>
            </div>
          </div>
        </div>
      </Themes>
    </Modal>
  );
};

export default ViewPayrollBreakdown;
