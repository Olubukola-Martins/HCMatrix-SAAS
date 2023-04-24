import React, { useState } from "react";
import { Popover } from "@mui/material";
import "../style/style.css";
import { Link } from "react-router-dom";
import PayrollSubNav from "../components/PayrollSubNav";
import TotalSummary from "../components/TotalSummary";

const PayrollReview = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [totalSummaryModal, setTotalSummaryModal] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <PayrollSubNav />
      <TotalSummary
        open={totalSummaryModal}
        handleClose={() => setTotalSummaryModal(false)}
      />
      <div>
        <div className="flex items-center gap-1 mb-10">
          <Link to="/payroll/home">
            <i className="ri-arrow-left-s-line text-xl"></i>
          </Link>
          <h5 className="font-black text-lg">Payroll Review</h5>
        </div>

        <div className="flex justify-end mb-6">
          <div className="flex justify-end gap-5 font-medium">
            <i className="ri-download-2-line text-xl"></i>
            <i className="ri-logout-box-r-line text-xl"></i>
            <Link
              to="/payroll/comparison"
              className="border border-caramel rounded px-2 py-1 font-medium text-caramel text-sm"
            >
              Compare
            </Link>
            <Link
              to="/payroll/report"
              className="border border-caramel rounded px-2 py-1 font-medium text-caramel text-sm"
            >
              Create Report
            </Link>
          </div>
        </div>
        <table className="payroll-table text-gray-600">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Pay Period</th>
              <th>Number of Employee</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>DD/MM/YY</td>
              <td>2</td>
              <td>NO</td>
              <td className="text-yellow-500 font-medium">Pending</td>
              <td>
                <i
                  className="ri-eye-line text-lg cursor-pointer font-medium"
                  onClick={handleClick}
                ></i>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>DD/MM/YY</td>
              <td>2</td>
              <td>NO</td>
              <td className="text-neutral font-medium">Closed</td>
              <td>
                <i
                  onClick={handleClick}
                  className="ri-eye-line text-lg cursor-pointer font-medium"
                ></i>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>DD/MM/YY</td>
              <td>2</td>
              <td>NO</td>
              <td className="text-neutral font-medium">Closed</td>
              <td>
                <i
                  className="ri-eye-line text-lg cursor-pointer font-medium"
                  onClick={handleClick}
                ></i>
              </td>
            </tr>
          </tbody>
        </table>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {/* <Themes> */}
          <div className="py-3 px-2 text-xs font-medium rounded-md">
            <Link
              to="/payroll/breakdown"
              className="block pb-2 cursor-pointer hover:text-caramel"
            >
              View Per Employee
            </Link>
            <span
              onClick={() => setTotalSummaryModal(true)}
              className="cursor-pointer hover:text-caramel"
            >
              View Total Summary
            </span>
          </div>
          {/* </Themes> */}
        </Popover>
      </div>
    </>
  );
};

export default PayrollReview;
