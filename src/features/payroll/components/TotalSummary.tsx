import { Modal } from "antd";
import Themes from "components/Themes";
import React from "react";
import { IModalProps } from "types";

const TotalSummary: React.FC<IModalProps> = ({ open, handleClose }) => {
  return (
    <Modal open={open} onCancel={() => handleClose()}>
      <Themes>
        <div
          className="CModal border scrollBar overflow-auto"
          style={{ maxWidth: 700, height: 500 }}
        >
          <div className="flex items-center justify-between">
            <h5 className="font-semibold text-lg">Payroll breakdown</h5>
            <i
              onClick={() => handleClose()}
              className="ri-close-line font-semibold text-xl cursor-pointer hover:text-neutral"
            ></i>
          </div>

          <div className="text-sm mt-5 font-medium">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-6">
              <div>
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

            <div className="bg-mainBg flex items-center justify-between px-5 py-2">
              <span> Total</span>
              <span>N0.00</span>
            </div>

            <div className="flex items-center justify-around mt-6">
              <button className="neutralButton">Roll back</button>
              <button className="button">Approve</button>
            </div>
          </div>
        </div>
      </Themes>
    </Modal>
  );
};

export default TotalSummary;
