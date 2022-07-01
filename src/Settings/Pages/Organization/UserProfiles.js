import React, { useState } from "react";
import DashboardLayout from "../../../Layout/DashboardLayout";
import Menu from "@mui/material/Menu";
import Themes from "../../../Themes/Themes";
import "../../style/settingsStyle.css";
import MailIcon from '../../Assets/mail.svg'
import UserIcon from '../../Assets/user.svg'
import PenIcon from '../../Assets/pen_icon.svg'
import DummyIcon from '../../Assets/dummy.svg'

const UserProfiles = () => {
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
              <h5 className="flex items-center justify-between border-b">
                <span>Disengaged</span> <span>8</span>
              </h5>
              <h5 className="flex items-center justify-between py-2 border-b">
                <span>Master records</span> <span>24</span>
              </h5>
            </div>
          </Themes>
        </Menu>
      </div>
      <div className="Container pb-10">
        <div className="flex justify-between mt-5">
          <h4
            // onClick={handleClick}
            className="flex items-center gap-2  text-accent"
          >
            <span>Total Users 1</span>
            {/* <i className="ri-arrow-down-s-line text-xl"></i> */}
          </h4>

          <div className="flex items-center gap-3 text-accent">
            <button className="py-1 px-2 bg-caramel rounded text-sm text-white font-medium">
              Invite
            </button>
            <button className="py-1 px-2 bg-transparent rounded text-sm text-accent border border-slate-200 hover:border-slate-400 font-medium transition ease-in-out duration-300">
              Import
            </button>
            <button className="py-1 px-2 bg-transparent rounded text-sm text-accent border border-slate-200 hover:border-slate-400 font-medium transition ease-in-out duration-300">
              Sync
            </button>
            <i className="ri-filter-line text-xl cursor-pointer"></i>
            <i className="ri-upload-2-line text-xl cursor-pointer"></i>
            <i
              className="ri-question-fill text-xl cursor-pointer text-gray-400"
              title="Employee profile"
            ></i>
          </div>
        </div>
        <br />
        <div className = 'px-6 py-2  mb-4 flex items-end gap-4 text-sm' style = {{background: 'var(--card)'}}>
            <p className="text-caramel underline">Resend Information</p>
            <p className="text-caramel underline">Change Login Status</p>
            <p className="text-caramel underline">Trigger onboarding</p>
            <p className="text-caramel underline">Convert to employee profile</p>
            <div className="self-end mb-4 flex-1 flex justify-end ">
            <p className="ml-auto">x</p>

            </div>

        </div>

        <table className="employee-profile-table">
          <thead>
            <tr>
              <th className="flex items-center justify-center gap-3">
                <input type="checkbox" className="invisible"/>
                <span>Name</span>
              </th>
              <th>Gender</th>
              <th>Resupmtion Date</th>
              <th>Staff ID</th>
              <th>Role</th>
              <th>Email</th>
              <th>Employee Status</th>
              <th>Account Status</th>
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
              <td>Male</td>
              <td>24 - 06 - 2022</td>
              <td>234</td>
              <td>Admin</td>
              <td>francis@gmail.com</td>
              <td>Inactive</td>
              <td>Login Enabled</td>
              <td>
                <span className="flex items-center gap-2 text-xl justify-center">
                  <img src = {MailIcon} alt = "mail" className="h-4"/>{" "}
                  <img src = {UserIcon} alt = "user" className="h-4"/>{" "}
                  <img src = {PenIcon} alt = "edit" className="h-4"/>{" "}
                  <i className="ri-delete-bin-line text-slate-400"></i>

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
              <td>Male</td>
              <td>24 - 06 - 2022</td>
              <td>234</td>
              <td>Admin</td>
              <td>francis@gmail.com</td>
              <td>Inactive</td>
              <td>Invited</td>
              <td>
                <span className="flex items-center gap-2 text-xl justify-center">
                  <img src = {DummyIcon} alt = "edit" className="h-4 w-6"/>{" "}

                  <img src = {UserIcon} alt = "user" className="h-4"/>{" "}
                  <img src = {PenIcon} alt = "edit" className="h-4"/>{" "}
                  <i className="ri-delete-bin-line text-slate-400"></i>

                </span>
              </td>
            </tr>
         

          

          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default UserProfiles;
