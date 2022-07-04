import React, { useState } from "react";
import DashboardLayout from "../../../Layout/DashboardLayout";

import "../../style/settingsStyle.css";
import MailIcon from "../../Assets/mail.svg";
import UserIcon from "../../Assets/user.svg";
import PenIcon from "../../Assets/pen_icon.svg";
import DummyIcon from "../../Assets/dummy.svg";
import PageXIcon from "../../Assets/page_x_icon.svg";
import RedXIcon from "../../Assets/red_x_icon.svg";
import SyncIcon from "../../Assets/sync.svg";
import InviteDropdown from "../../Components/InviteDropdown";
import ImportDropdown from "../../Components/ImportDropdown";
import DisplayDropdown from "../../Components/DisplayDropdown";
import SyncDropdown from "../../Components/SyncDropdown";
import FilterDrawer from "../../Components/FilterDrawer";
import UploadFileDrawer from "../../Components/UploadFileDrawer";
import ExportModal from "../../Components/ExportModal";
import { motion } from "framer-motion";

const UserProfiles = () => {
  // invite modal controls
  const [anchorInviteEl, setAnchorInviteEl] = useState(null);
  const handleInviteClick = (event) => {
    setAnchorInviteEl(event.currentTarget);
  };
  const handleInviteClose = () => {
    setAnchorInviteEl(null);
  };
  // display modal controls
  const [anchorDisplayEl, setAnchorDisplayEl] = useState(null);
  const handleDisplayClick = (event) => {
    setAnchorDisplayEl(event.currentTarget);
  };

  const handleDisplayClose = () => {
    setAnchorDisplayEl(null);
  };
  // import modal controls
  const [anchorImportEl, setAnchorImportEl] = useState(null);
  const handleImportClick = (event) => {
    setAnchorImportEl(event.currentTarget);
  };

  const handleImportClose = () => {
    setAnchorImportEl(null);
  };
  //sync modal controls
  const [anchorSyncEl, setAnchorSyncEl] = useState(null);
  const handleSyncClick = (event) => {
    setAnchorSyncEl(event.currentTarget);
  };

  const handleSyncClose = () => {
    setAnchorSyncEl(null);
  };
  //filter drawer controls
  const [openFilter, setOpenFilter] = useState(false);
  //export modal
  const [openExport, setOpenExport] = useState(false);
  //upload file drawer
  const [openUploadFile, setOpenUploadFile] = useState(false);
  // experimental
  const [showInviteDrawer, setShowInviteDrawer] = useState(false);
  const toggleExperiment = () => {
    setShowInviteDrawer((val) => !val);
  };

  return (
    <DashboardLayout>
      {/* Employee Status menu */}

      <div className="">
        <div className="flex justify-between mt-5 Container">
          <h4
            // onClick={handleClick}
            className="flex items-center gap-2  text-accent"
          >
            <span>Total Users 1</span>
            {/* <i className="ri-arrow-down-s-line text-xl"></i> */}
          </h4>

          <div className="flex items-center gap-3 text-accent">
            <button
              id="invite-button"
              className="py-1 px-2 bg-caramel rounded text-sm text-white font-medium"
              onClick={handleInviteClick}
            >
              Invite
              <i className="fa fa-caret-down ml-2" aria-hidden="true"></i>
            </button>
            <InviteDropdown
              anchorEl={anchorInviteEl}
              handleClose={handleInviteClose}
              toggleExperiment={toggleExperiment}
            />

            <button
              onClick={handleImportClick}
              className="py-1 px-2 bg-transparent rounded text-sm text-accent border border-slate-200 hover:border-slate-400 font-medium transition ease-in-out duration-300"
            >
              Import
              <i class="fa fa-caret-down ml-2" aria-hidden="true"></i>
            </button>
            <ImportDropdown
              anchorEl={anchorImportEl}
              handleClose={handleImportClose}
            />
            <button
              onClick={handleSyncClick}
              className="py-1 flex items-center px-2 bg-transparent rounded text-sm text-accent border border-slate-200 hover:border-slate-400 font-medium transition ease-in-out duration-300"
            >
              <span>Sync</span>
              <img src={SyncIcon} alt="sync_icon" className="h-2 w-2 ml-2" />
            </button>
            <SyncDropdown
              anchorEl={anchorSyncEl}
              handleClose={handleSyncClose}
            />
            <i
              className="ri-filter-line text-xl cursor-pointer"
              onClick={() => setOpenFilter(true)}
            ></i>
            <FilterDrawer open={openFilter} setOpen={setOpenFilter} />
            <i
              className="ri-upload-2-line text-xl cursor-pointer"
              onClick={() => setOpenUploadFile(true)}
            ></i>
            <UploadFileDrawer
              open={openUploadFile}
              setOpen={setOpenUploadFile}
            />

            <i
              className="ri-question-fill text-xl cursor-pointer text-gray-400"
              title="Employee profile"
            ></i>
          </div>
        </div>
        <br />
        {/* the relative container */}
        <div className="relative">
          {/* The Invite Draggable Modal */}
          {true && (
            <motion.div
              initial={{ x: 500 }}
              animate={{ x: showInviteDrawer ? 0 : 500 }}
              exit={{ x: 500 }}
              transition={{ ease: "easeIn", duration: 0.5 }}
              className="w-96 fixed bg-white right-0 drop-shadow-lg z-50 cursor-pointer pb-8"
              drag
            >
              {/* filter heading */}
              <div className="flex justify-between text-xl items-center font-light p-4">
                <h5 className="text-accent">Invite User</h5>
                <i
                  className="fa fa-times cursor-pointer"
                  aria-hidden="true"
                  onClick={toggleExperiment}
                ></i>
              </div>
              {/* content */}
              <div className="mt-6 text-accent">
                {/* band */}
                <div className="px-6 py-3 bg-caramel flex items-center justify-between">
                  <h6 className="text-sm">Employee Added: 2</h6>
                  <h6 className="text-sm">License count left: 5</h6>
                </div>
                {/* form */}
                <div className="px-6 mt-4">
                  <form className="text-accent mt-6 grid grid-cols-1 gap-4">
                    <p className="mb-2">
                      Fill in the mandatory fields, and click invite.{" "}
                    </p>
                    <div>
                      <div className="input-container w-full">
                        <label className="text-sm mb-2 block">
                          Employee ID
                        </label>
                        <input
                          type="text"
                          placeholder="State/Province"
                          className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                        />
                      </div>
                    </div>
                    <div>
                      <div className="input-container w-full">
                        <label className="text-sm mb-2 block">Full name</label>
                        <input
                          type="text"
                          placeholder="First Name                      Last Name"
                          className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                        />
                      </div>
                    </div>
                    <div>
                      <div className="input-container w-full">
                        <label className="text-sm mb-2 block">
                          Email Address
                        </label>
                        <input
                          type="text"
                          placeholder="Email Address"
                          className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                        />
                      </div>
                    </div>
                    {/* ctrl btns */}
                    <div className="form-buttons flex gap-4 mt-2">
                      <button className="py-2 px-4 bg-caramel rounded text-sm text-white font-medium">
                        Invite
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
          {/* user info */}
          <div className="Container">
            <div
              className="px-6 py-4  mb-6 flex items-center gap-4 text-sm"
              style={{ background: "var(--card)" }}
            >
              <h4 className="text-caramel text-xl">User Information</h4>
              <button
                htmlType="submit"
                className="bg-green-600 flex items-center gap-2 capitalize  hover:bg-opacity-70 transition ease-in duration-300 text-white py-1 text-sm px-2"
              >
                <span>Current View</span>
                <img src={PageXIcon} alt="page_icon" />
              </button>
              <button
                htmlType="submit"
                className="bg-green-600 flex items-center gap-2 capitalize  hover:bg-opacity-70 transition ease-in duration-300 text-white py-1 text-sm px-2"
              >
                <span>All</span>
                <img src={PageXIcon} alt="page_icon" />
              </button>
              <button
                onClick={() => setOpenExport(true)}
                className="bg-red-600 flex items-center gap-2 capitalize  hover:bg-opacity-70 transition ease-in duration-300 text-white py-1 text-sm px-2"
              >
                <span>Export</span>
                <img src={RedXIcon} alt="page_icon" />
              </button>
              <ExportModal
                open={openExport}
                handleClose={() => setOpenExport(false)}
              />
            </div>
          </div>
          {/* resend info component */}
          <div className="Container">
            <div
              className="px-6 py-2  mb-4 flex items-end gap-4 text-sm"
              style={{ background: "var(--card)" }}
            >
              <p className="text-caramel underline">Resend Information</p>
              <p className="text-caramel underline">Change Login Status</p>
              <p className="text-caramel underline">Trigger onboarding</p>
              <p className="text-caramel underline">
                Convert to employee profile
              </p>
              <div className="self-end mb-4 flex-1 flex justify-end ">
                <p className="ml-auto">x</p>
              </div>
            </div>
          </div>
          {/* focus */}
          <div className="Container">
            <div
              className="px-6 py-4  mb-2 flex items-center gap-4 text-sm"
              style={{ background: "var(--card)" }}
            >
              <button
                htmlType="submit"
                className="bg-red-600 flex items-center gap-2 capitalize  hover:bg-opacity-70 transition ease-in duration-300 text-white py-1 text-sm px-2"
              >
                <span>Focus</span>
              </button>
              <button
                id="display-button"
                onClick={handleDisplayClick}
                className="bg-red-600 flex items-center gap-2 capitalize  hover:bg-opacity-70 transition ease-in duration-300 text-white py-1 text-sm px-2"
              >
                Display
                <i className="fa fa-caret-down" aria-hidden="true"></i>
              </button>
              <DisplayDropdown
                anchorEl={anchorDisplayEl}
                handleClose={handleDisplayClose}
              />
            </div>
          </div>
          {/* table */}
          <div className="Container">
            <table className="employee-profile-table">
              <thead>
                <tr>
                  <th className="flex items-center justify-center gap-3">
                    <input type="checkbox" className="invisible" />
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
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <tr key={item}>
                    <td className="flex items-center justify-center gap-3">
                      <input type="checkbox" />
                      <div className="flex items-center gap-2 justify-center">
                        <img
                          src="https://res.cloudinary.com/ddvaelej7/image/upload/v1656616707/samples/Ellipse_1915_maqdtn.png"
                          alt="user"
                        />
                        <div className="flex flex-col">
                          <h6 className="font-medium text-sm">
                            Francis terr, 4
                          </h6>
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
                        <img src={MailIcon} alt="mail" className="h-4" />{" "}
                        <img src={UserIcon} alt="user" className="h-4" />{" "}
                        <img src={PenIcon} alt="edit" className="h-4" />{" "}
                        <i className="ri-delete-bin-line text-slate-400"></i>
                      </span>
                    </td>
                  </tr>
                ))}
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
                      <img src={DummyIcon} alt="edit" className="h-4 w-6" />{" "}
                      <img src={UserIcon} alt="user" className="h-4" />{" "}
                      <img src={PenIcon} alt="edit" className="h-4" />{" "}
                      <i className="ri-delete-bin-line text-slate-400"></i>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserProfiles;
