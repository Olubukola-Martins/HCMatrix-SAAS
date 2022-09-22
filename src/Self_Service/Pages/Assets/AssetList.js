import { Popover } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Themes from "../../../Themes/Themes";

const AssetList = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [assetPopover, setAssetPopover] = useState(null);

  return (
    <div>
      <div className="flex justify-end items-center">
        <button onClick={(e) => setAssetPopover(e.currentTarget)} className="button flex items-center gap-2">
          <span>Add Asset</span>
          <i className="ri-arrow-down-s-line text-base"></i>
        </button>
      </div>

      <Popover
        open={Boolean(assetPopover)}
        anchorEl={assetPopover}
        onClose={() => setAssetPopover(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Themes>
          <div className="py-3 px-4 text-sm font-medium rounded-md flex flex-col bg-card">
            <span className="cursor-pointer hover:text-caramel">
              Add Singular
            </span>
            <span className="cursor-pointer hover:text-caramel py-1">
              import in Bulk
            </span>
          </div>
        </Themes>
      </Popover>
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
  );
};

export default AssetList;
