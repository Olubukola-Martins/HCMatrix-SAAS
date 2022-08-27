import { Popover } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Themes from "../../Themes/Themes";
import RollbackModal from "../Components/RollbackModal";
import ViewPayrollBreakdown from "../Components/ViewPayrollBreakdown";
import "../Style/style.css";

const PayrollBreakdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [breakModal, setBreakModal] = useState(false);
  const [rollBack, setRollBack] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <DashboardLayout>
      <div className="Container mt-10 pb-16">
        <div className="flex items-center gap-2 mb-10">
          <Link to="/payroll-review" className="hover:text-caramel">
            <i className="ri-arrow-left-s-line text-xl"></i>
          </Link>
          <h5 className="font-black text-lg">Payroll Breakdown</h5>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-5">
            <button className="button" disabled>
              Deactivate
            </button>
            <button className="neutralButton" onClick={() => setRollBack(true)}>
              Roll back
            </button>
            <button className="button">Approve</button>
          </div>
          <div className="flex justify-end gap-5 font-medium">
            <i className="ri-download-2-line text-xl"></i>
            <i className="ri-logout-box-r-line text-xl"></i>
            <button className="border border-red-500 hover:text-caramel rounded px-2 py-1 font-medium text-sm">
              Filter
            </button>
            <button className="border border-red-500 hover:text-caramel rounded px-2 py-1 font-medium text-sm">
              Compare
            </button>
            <button className="border border-red-500 hover:text-caramel rounded px-2 py-1 font-medium text-sm">
              Create Report
            </button>
          </div>
        </div>
        <table className="payroll-table text-gray-600">
          <thead>
            <tr>
              <th>
                <input type="checkbox" name="" id="" />
              </th>
              <th>Pay Date</th>
              <th>Name</th>
              <th>Pay Type</th>
              <th>Net Pay</th>
              <th>Gross Pay</th>
              <th>Total Deduction</th>
              <th>Total Bonuses</th>
              <th>Tax</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {[1, 2, 3, 4, 5, 6, 7].map((item) => (
              <tr key={item}>
                <td>
                  <input type="checkbox" name="" id="" />
                </td>
                <td>Ruth Godwin</td>
                <td>Salary</td>
                <td>N0.00</td>
                <td>N0.00</td>
                <td>N0.00</td>
                <td>N0.00</td>
                <td>N0.00</td>
                <td>N0.00</td>
                <td>
                  <i
                    className="ri-more-fill text-lg cursor-pointer font-medium"
                    onClick={handleClick}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ViewPayrollBreakdown
          open={breakModal}
          handleClose={() => setBreakModal(false)}
        />

        <RollbackModal open={rollBack} handleClose={() => setRollBack(false)} />
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
              <span
                onClick={() => setBreakModal(true)}
                className="block pb-2 cursor-pointer hover:text-caramel"
              >
                View
              </span>
              <span className="block pb-2 cursor-pointer hover:text-caramel">
                Add Bonus
              </span>
              <span className="block pb-2 cursor-pointer hover:text-caramel">
                Add Deduction
              </span>
              <span className="cursor-pointer hover:text-caramel">
                Deactivate Employee
              </span>
            </div>
          </Themes>
        </Popover>
      </div>
    </DashboardLayout>
  );
};

export default PayrollBreakdown;
