import { Popover } from "@mui/material";
import React, { useState } from "react";
import DashboardLayout from "../../../Layout/DashboardLayout";
import Themes from "../../../Themes/Themes";
import SelfServiceSubNav from "../../Components/SelfServiceSubNav";

const LoanRequest = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  return (
    <DashboardLayout>
      <SelfServiceSubNav />
      <div className="Container">
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
              <th>Asset Name</th>
              <th>Asset ID</th>
              <th>Asset Type</th>
              <th>Status</th>
              <th>Color</th>
              <th>Serial No</th>
              <th>Assigned to</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((item) => (
              <tr key={item}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>Hp EliteBook</td>
                <td>000</td>
                <td>Computer Accessories</td>
                <td>Assigned</td>
                <td>Red</td>
                <td>0000</td>
                <td>Ruth Godwin</td>
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
