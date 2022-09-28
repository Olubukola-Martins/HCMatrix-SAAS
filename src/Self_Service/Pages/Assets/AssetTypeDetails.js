import { Popover } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../Layout/DashboardLayout";
import Themes from "../../../Themes/Themes";
import SelfServiceSubNav from "../../Components/SelfServiceSubNav";

const AssetTypeDetails = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  return (
    <DashboardLayout>
      <SelfServiceSubNav />

      <div className="Container">
        <div className="flex items-center gap-3 mt-4 md:mt-0 justify-start md:justify-end">
          <i className="ri-download-2-line text-xl cursor-pointer"></i>
          <i className="fa-solid fa-file-export cursor-pointer"></i>
          <button className="button">Add Assets</button>
          <button
            className="transparentButton"
            style={{ color: "var(--caramel)" }}
          >
            Generate Report
          </button>
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
            {[1, 2, 3, 4, 5].map((item) => (
              <tr key={item}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <Link
                    to="/self-service/assets-details"
                    className="hover:text-caramel"
                  >
                    Hp EliteBook
                  </Link>
                </td>
                <td>000</td>
                <td>Computer Accessories</td>
                <td>Assigned</td>
                <td>Red</td>
                <td>0000</td>
                <td>Ruth Godwin</td>
                <td>
                  <i
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    class="ri-more-2-fill text-lg cursor-pointer hover:text-caramel"
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
              <span className="cursor-pointer hover:text-caramel">Edit</span>
              <span className="cursor-pointer hover:text-caramel py-1">
                Delete
              </span>
              <span className="cursor-pointer hover:text-caramel py-1">
                Download
              </span>
              <span className="cursor-pointer hover:text-caramel py-1">
                Add Document
              </span>
            </div>
          </Themes>
        </Popover>
      </div>
    </DashboardLayout>
  );
};

export default AssetTypeDetails;
