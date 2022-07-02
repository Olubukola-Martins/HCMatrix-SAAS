import React, { useState } from "react";
import DashboardLayout from "../../../Layout/DashboardLayout";
import Menu from "@mui/material/Menu";
import Themes from "../../../Themes/Themes";
import "../../style/settingsStyle.css";

const EmployeeProfiles = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <DashboardLayout>
      {/* Employee Status menu */}
      <div className="me">
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <Themes>
            <div className="bg-card w-36 px-2 text-sm py-3 text-accent">
              <h5 className="flex items-center justify-between border-b">
                <span>Probation</span> <span>6</span>
              </h5>
              <h5 className="flex items-center justify-between py-2 border-b">
                <span>Confirmed</span> <span>10</span>
              </h5>
              <h5 className="flex items-center justify-between">
                <span>Disengaged</span> <span>8</span>
              </h5>
            </div>
          </Themes>
        </Menu>
      </div>
      <div className="Container pb-10">
        <div className="flex justify-between mt-5">
          <div className="flex items-center gap-3">
            <h4 className="cursor-pointer text-accent font-medium">
              Employee Status
            </h4>
            <button
              className="flex items-center gap-2 transition duration-300 ease-in-out hover:border-slate-400 text-slate-400 border rounded text-sm px-2"
              onClick={handleClick}
            >
              <span>Master record 24</span>
              <i className="ri-arrow-down-s-line text-xl"></i>
            </button>
          </div>

          <div className="flex items-center gap-3 text-accent">
            <button className="py-1 px-2 bg-caramel rounded text-sm text-white font-medium">
              Add Employee Profile
            </button>
            <button className="py-1 px-2 bg-transparent rounded text-sm text-accent border border-slate-200 hover:border-slate-400 font-medium transition ease-in-out duration-300">
              Import Employee Profile
            </button>
            <i className="ri-filter-line text-xl cursor-pointer"></i>
            {/* <i className="ri-upload-2-line text-xl cursor-pointer"></i> */}
            <i
              className="ri-question-fill text-xl cursor-pointer text-gray-400"
              title="Employee profile"
            ></i>
          </div>
        </div>
        <br />
        <div className="bg-card flex items-center justify-between p-3">
          <h5 className="font-medium">Employee Information</h5>
          <div className="flex items-center gap-5">
            <button className="flex items-center gap-2 text-sm text-white bg-green-600 px-2 py-1">
              <span>Enroll Biometric</span>
              <i className="ri-fingerprint-fill text-base"></i>
            </button>
            <button className="flex items-center gap-2 text-sm text-white bg-caramel px-2 py-1">
              <span>Remove Biometric</span>
              <i className="ri-fingerprint-fill text-base"></i>
            </button>
            <button className="flex items-center gap-2 text-sm text-white bg-green-600 px-2 py-1">
              <span>Current View</span>
              <i className="ri-file-excel-line text-base"></i>
            </button>
            <button className="flex items-center gap-2 text-sm text-white bg-green-600 px-2 py-1">
              <span>All</span>
              <i className="ri-file-excel-line text-base"></i>
            </button>
            <button className="flex items-center gap-2 text-sm text-white bg-caramel px-2 py-1">
              <span>Export</span>
              <i className="ri-file-hwp-line text-base"></i>
            </button>
          </div>

          <div />
        </div>

        <br />
        <div className="bg-card">
          <div className="flex justify-end">
            <span className="pr-3 pb-2 cursor-pointer">x</span>
          </div>
          <div className="px-3 pb-4 text-caramel font-semibold text-sm flex items-center justify-between">
            <button className="border-b-2 border-caramel">
              Enroll to E-Learning
            </button>
            <button className="border-b-2 border-caramel">
              + Add to Group
            </button>
            <button className="border-b-2 border-caramel">
              Assign to Role
            </button>
            <button className="border-b-2 border-caramel">
              Assign to Line Manager
            </button>

            <button className="border-b-2 border-caramel">
              Change Employee Status
            </button>
            <button className="border-b-2 border-caramel">
              Change Login Status
            </button>
            <button className="border-b-2 border-caramel">Others</button>
          </div>
        </div>
        <br />

        <table className="employee-profile-table">
          <thead>
            <tr>
              <th className="flex items-center justify-center gap-3">
                <input type="checkbox" />
                <span>Basic Information</span>
              </th>
              <th>Date of Birth</th>
              <th>Role</th>
              <th>Location</th>
              <th>Employee status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="flex items-center justify-center gap-3">
                <input type="checkbox" />
                <div className="flex items-center gap-2 justify-center">
                  <img
                    src="https://res.cloudinary.com/ddvaelej7/image/upload/v1656616707/samples/Ellipse_1915_maqdtn.png"
                    alt="user"
                  />
                  <div className="flex flex-col">
                    <h6 className="font-medium text-sm">Francis terr, 4</h6>
                    <span className="text-xs">francis@gmail.com</span>
                  </div>
                </div>
              </td>
              <td>24 - 06 - 2022</td>
              <td>UX Designer</td>
              <td>Abuja</td>
              <td>Active</td>
              <td>
                <span className="flex items-center gap-2 text-xl justify-center">
                  <i className="fa-solid fa-circle-user"></i>{" "}
                  <i className="ri-pencil-line"></i>{" "}
                  <i className="ri-delete-bin-line"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td className="flex items-center justify-center gap-3">
                <input type="checkbox" />
                <div className="flex items-center gap-2 justify-center">
                  <img
                    src="https://res.cloudinary.com/ddvaelej7/image/upload/v1656616707/samples/Ellipse_1915_maqdtn.png"
                    alt="user"
                  />
                  <div className="flex flex-col">
                    <h6 className="font-medium text-sm">Francis terr, 4</h6>
                    <span className="text-xs">francis@gmail.com</span>
                  </div>
                </div>
              </td>
              <td>24 - 06 - 2022</td>
              <td>UX Designer</td>
              <td>Abuja</td>
              <td>Active</td>
              <td>
                <span className="flex items-center gap-2 text-xl justify-center">
                  <i className="fa-solid fa-circle-user"></i>{" "}
                  <i className="ri-pencil-line"></i>{" "}
                  <i className="ri-delete-bin-line"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td className="flex items-center justify-center gap-3">
                <input type="checkbox" />
                <div className="flex items-center gap-2 justify-center">
                  <img
                    src="https://res.cloudinary.com/ddvaelej7/image/upload/v1656616707/samples/Ellipse_1915_maqdtn.png"
                    alt="user"
                  />
                  <div className="flex flex-col">
                    <h6 className="font-medium text-sm">Francis terr, 4</h6>
                    <span className="text-xs">francis@gmail.com</span>
                  </div>
                </div>
              </td>
              <td>24 - 06 - 2022</td>
              <td>UX Designer</td>
              <td>Abuja</td>
              <td>Active</td>
              <td>
                <span className="flex items-center gap-2 text-xl justify-center">
                  <i className="fa-solid fa-circle-user"></i>{" "}
                  <i className="ri-pencil-line"></i>{" "}
                  <i className="ri-delete-bin-line"></i>
                </span>
              </td>
            </tr>

            <tr>
              <td className="flex items-center justify-center gap-3">
                <input type="checkbox" />
                <div className="flex items-center gap-2 justify-center">
                  <img
                    src="https://res.cloudinary.com/ddvaelej7/image/upload/v1656616707/samples/Ellipse_1915_maqdtn.png"
                    alt="user"
                  />
                  <div className="flex flex-col">
                    <h6 className="font-medium text-sm">Francis terr, 4</h6>
                    <span className="text-xs">francis@gmail.com</span>
                  </div>
                </div>
              </td>
              <td>24 - 06 - 2022</td>
              <td>UX Designer</td>
              <td>Abuja</td>
              <td>Active</td>
              <td>
                <span className="flex items-center gap-2 text-xl justify-center">
                  <i className="fa-solid fa-circle-user"></i>{" "}
                  <i className="ri-pencil-line"></i>{" "}
                  <i className="ri-delete-bin-line"></i>
                </span>
              </td>
            </tr>

            <tr>
              <td className="flex items-center justify-center gap-3">
                <input type="checkbox" />
                <div className="flex items-center gap-2 justify-center">
                  <img
                    src="https://res.cloudinary.com/ddvaelej7/image/upload/v1656616707/samples/Ellipse_1915_maqdtn.png"
                    alt="user"
                  />
                  <div className="flex flex-col">
                    <h6 className="font-medium text-sm">Francis terr, 4</h6>
                    <span className="text-xs">francis@gmail.com</span>
                  </div>
                </div>
              </td>
              <td>24 - 06 - 2022</td>
              <td>UX Designer</td>
              <td>Abuja</td>
              <td>Active</td>
              <td>
                <span className="flex items-center gap-2 text-xl justify-center">
                  <i className="fa-solid fa-circle-user"></i>{" "}
                  <i className="ri-pencil-line"></i>{" "}
                  <i className="ri-delete-bin-line"></i>
                </span>
              </td>
            </tr>

            <tr>
              <td className="flex items-center justify-center gap-3">
                <input type="checkbox" />
                <div className="flex items-center gap-2 justify-center">
                  <img
                    src="https://res.cloudinary.com/ddvaelej7/image/upload/v1656616707/samples/Ellipse_1915_maqdtn.png"
                    alt="user"
                  />
                  <div className="flex flex-col">
                    <h6 className="font-medium text-sm">Francis terr, 4</h6>
                    <span className="text-xs">francis@gmail.com</span>
                  </div>
                </div>
              </td>
              <td>24 - 06 - 2022</td>
              <td>UX Designer</td>
              <td>Abuja</td>
              <td>Active</td>
              <td>
                <span className="flex items-center gap-2 text-xl justify-center">
                  <i className="fa-solid fa-circle-user"></i>{" "}
                  <i className="ri-pencil-line"></i>{" "}
                  <i className="ri-delete-bin-line"></i>
                </span>
              </td>
            </tr>

            <tr>
              <td className="flex items-center justify-center gap-3">
                <input type="checkbox" />
                <div className="flex items-center gap-2 justify-center">
                  <img
                    src="https://res.cloudinary.com/ddvaelej7/image/upload/v1656616707/samples/Ellipse_1915_maqdtn.png"
                    alt="user"
                  />
                  <div className="flex flex-col">
                    <h6 className="font-medium text-sm">Francis terr, 4</h6>
                    <span className="text-xs">francis@gmail.com</span>
                  </div>
                </div>
              </td>
              <td>24 - 06 - 2022</td>
              <td>UX Designer</td>
              <td>Abuja</td>
              <td>Active</td>
              <td>
                <span className="flex items-center gap-2 text-xl justify-center">
                  <i className="fa-solid fa-circle-user"></i>{" "}
                  <i className="ri-pencil-line"></i>{" "}
                  <i className="ri-delete-bin-line"></i>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeProfiles;
