import { Popover } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Themes from "../../../Themes/Themes";
import AddVehicle from "./AddVehicle";

const VehicleList = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [addVehicleModal, setAddVehicleModal] = useState(false);

  return (
    <div>
      <AddVehicle
        open={addVehicleModal}
        handleClose={() => setAddVehicleModal(false)}
      />
      <div className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 transparentButton">
            <span>Vehicle Type</span>
            <i className="ri-arrow-down-s-line text-base"></i>
          </button>
          <button className="flex items-center gap-2 transparentButton">
            <span>Status</span>
            <i className="ri-arrow-down-s-line text-base"></i>
          </button>
        </div>
        <div className="flex items-center gap-3">
          <i className="ri-download-2-line text-lg"></i>
          <button className="button" onClick={() => setAddVehicleModal(true)}>
            Add Vehicle
          </button>
        </div>
      </div>
      <table className="payroll-table text-accent mt-6">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Vehicle Name</th>
            <th>Plate No</th>
            <th>Vehicle Type</th>
            <th>Status</th>
            <th>Color</th>
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
                  to="/self-service/vehicle-details"
                  className="hover:text-caramel"
                >
                  Toyota Camry
                </Link>
              </td>
              <td>xxxxx</td>
              <td>Car</td>
              <td>Assigned</td>
              <td>Red</td>
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

export default VehicleList;
