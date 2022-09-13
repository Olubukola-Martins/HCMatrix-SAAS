import React from "react";
import { Modal } from "@mui/material";
import Themes from "../../Themes/Themes";
import logo from "../../Layout/Images/logo2.png";

const ViewPayslip = ({ open, handleClose }) => {
  const boxStyle =
    "bg-mainBg flex items-end justify-between rounded px-3 py-2 text-sm font-medium";
  return (
    <Modal open={open} onClose={handleClose}>
      <Themes>
        <div
          className="CModal border scrollBar overflow-auto"
          style={{ maxWidth: 700, height: 500 }}
        >
          <div className="flex items-center justify-between">
            <img src={logo} alt="logo" className="h-8" />
            <i
              onClick={handleClose}
              className="ri-close-line font-semibold text-xl cursor-pointer hover:text-neutral"
            ></i>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
            <div className="flex flex-col gap-3">
              <div className={boxStyle}>
                <span>Employee Name</span>
                <span>Ruth Godwin</span>
              </div>
              <div className={boxStyle}>
                <span>Job Role</span>
                <span>Software Engineer</span>
              </div>

              <div className={boxStyle}>
                <span>Location</span>
                <span>Location</span>
              </div>

              <div className={boxStyle}>
                <span>Account Number</span>
                <span>xxxxxxx</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className={boxStyle}>
                <span>Employee ID</span>
                <span>HC54321</span>
              </div>

              <div className={boxStyle}>
                <span>Department</span>
                <span>Software Development</span>
              </div>

              <div className={boxStyle}>
                <span>Pay group</span>
                <span>Developer</span>
              </div>

              <div className={boxStyle}>
                <span>Bank</span>
                <span>First Bank of Nigeria</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <div>
              <table className="payroll-table view">
                <thead>
                  <tr>
                    <th>Deductions</th>
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
                  <tr>
                    <td>Sub Total</td>
                    <td>N0.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <table className="payroll-table view">
              <thead>
                <tr>
                  <th>Deductions</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>NSSF-employees deduction</td>
                  <td>N0.00</td>
                </tr>
                <tr>
                  <td>NSSF-employer deduction</td>
                  <td>N0.00</td>
                </tr>
                <tr>
                  <td>NHIF-employees deduction</td>
                  <td>N0.00</td>
                </tr>
                <tr>
                  <td>NHIF-employers deduction</td>
                  <td>N0.00</td>
                </tr>
                <tr>
                  <td>SDL-employees deduction</td>
                  <td>N0.00</td>
                </tr>
                <tr>
                  <td>SDL-employers deduction</td>
                  <td>N0.00</td>
                </tr>
                <tr>
                  <td>WCF-employees deduction</td>
                  <td>N0.00</td>
                </tr>
                <tr>
                  <td>WCF-employers deduction</td>
                  <td>N0.00</td>
                </tr>
                <tr>
                  <td>Employees Tax</td>
                  <td>N0.00</td>
                </tr>
                <tr>
                  <td>Employers Tax</td>
                  <td>N0.00</td>
                </tr>
                <tr>
                  <td>Sub Total</td>
                  <td>N0.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-mainBg flex items-center justify-between px-5 py-2 mt-5">
            <span> Total</span>
            <span>N0.00</span>
          </div>
        </div>
      </Themes>
    </Modal>
  );
};

export default ViewPayslip;
