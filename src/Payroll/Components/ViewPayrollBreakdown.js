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

          <div className="text-sm mt-5 font-medium">
            <div className="bg-mainBg flex items-center justify-between px-5 py-2">
              <span> Employee Name</span>
              <span>Ruth Godwin</span>
            </div>
            <div className="bg-mainBg flex items-center justify-between px-5 py-2 mt-3">
              <span> Employee ID</span>
              <span>HC54321</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-6">
           
                <table className="payroll-table view">
                  <thead>
                    <tr>
                      <th>Earnings</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Total Gross</td>
                      <td>N0.00</td>
                    </tr>
                    <tr>
                      <td>Total Net</td>
                      <td>N0.00</td>
                    </tr>
                    <tr>
                      <td>Total Bonuses</td>
                      <td>N0.00</td>
                    </tr>
                  </tbody>
                </table>
                  
                  <table>
                     
                  </table>
           
            </div>

            <div className="bg-mainBg flex items-center justify-between px-5 py-2">
              <span> Total</span>
              <span>N0.00</span>
            </div>
            <div className="bg-mainBg flex items-center justify-between px-5 py-2 mt-3">
              <span>Account Number</span>
              <span>xxxxxxxxxx</span>
            </div>
          </div>
        </div>
      </Themes>
    </Modal>
  );
};

export default ViewPayrollBreakdown;
