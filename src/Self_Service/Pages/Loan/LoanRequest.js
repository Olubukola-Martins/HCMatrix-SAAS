import { Popover } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../Layout/DashboardLayout";
import Themes from "../../../Themes/Themes";
import SelfServiceSubNav from "../../Components/SelfServiceSubNav";

const LoanRequest = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  return (
    <DashboardLayout>
      <SelfServiceSubNav />
      <div className="Container">
        <div className="flex items-center gap-3 font-extrabold mb-7">
        <Link to="/self-service/loan">  <i className="ri-arrow-left-s-line text-lg cursor-pointer hover:text-caramel"></i></Link>
          <h2 className="text-xl md:text-2xl text-accent">Loan Request</h2>
        </div>
        <div className="flex justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 transparentButton">
              <span>January</span>
              <i className="ri-arrow-down-s-line text-base"></i>
            </button>
            <button className="flex items-center gap-2 transparentButton">
              <span>Filter</span>
              <i className="ri-arrow-down-s-line text-base"></i>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <i className="ri-download-2-line text-lg"></i>
            <button className="button">Generate Report</button>
          </div>
        </div>
        <table className="payroll-table text-accent mt-6">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Request Date</th>
              <th>Employee Name</th>
              {/* <th>Employee ID</th> */}
              <th>Department</th>
              <th>Loan Type</th>
              {/* <th>Loan Worthiness</th> */}
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((item) => (
              <tr key={item}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>DD/MM/YY</td>
                <td>Ruth Godwin</td>
                {/* <td>000</td> */}
                <td>Sales & Marketing</td>
                {/* <td>app dev</td> */}
                <td>Car Loan</td>
                <td>N0</td>
                <td>Pending</td>
                <td>
                  <i
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    className="ri-more-2-fill text-lg cursor-pointer hover:text-caramel"
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Action popover */}
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "top",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "top",
          }}
        >
          <Themes>
            <div className="py-3 px-4 text-sm font-medium rounded-md flex flex-col bg-card">
              <span className="cursor-pointer hover:text-caramel">View</span>
              <span className="cursor-pointer hover:text-caramel py-1">
                Reject
              </span>
              <span className="cursor-pointer hover:text-caramel py-1">
                Approve
              </span>
            </div>
          </Themes>
        </Popover>
      </div>
    </DashboardLayout>
  );
};

export default LoanRequest;
