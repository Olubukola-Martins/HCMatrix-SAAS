import React, { useState } from "react";
import { Popover } from "@mui/material";
import DashboardLayout from "../../Layout/DashboardLayout";
import Themes from "../../Themes/Themes";
import "../Style/style.css";
import { Link } from "react-router-dom";

const PayrollReview = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <DashboardLayout>
      <div className="Container mt-10">
        <div className="flex items-center gap-1 mb-10">
          <Link to="#!">
            {" "}
            <i className="ri-arrow-left-s-line font-semibold"></i>
          </Link>
          <h5 className="font-black text-base">Payroll Review</h5>
        </div>

        <div className="flex justify-end mb-6">
          <div className="flex justify-end gap-5 font-medium">
            <i className="ri-download-2-line text-xl"></i>
            <i className="ri-logout-box-r-line text-xl"></i>
            <button className="border border-caramel rounded px-2 py-1 font-medium text-caramel text-sm">
              Compare
            </button>
            <button className="border border-caramel rounded px-2 py-1 font-medium text-caramel text-sm">
              Create Report
            </button>
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
          <Themes>
            <div className="border border-red-300 py-3 px-2 text-xs font-medium rounded-md">
              <Link
                to="/payroll-breakdown"
                className="block pb-2 cursor-pointer hover:text-caramel"
              >
                View Per Employee
              </Link>
              <span className="cursor-pointer hover:text-caramel">
                View Total Summary
              </span>
            </div>
          </Themes>
        </Popover>
      </div>
    </DashboardLayout>
  );
};

export default PayrollReview;
