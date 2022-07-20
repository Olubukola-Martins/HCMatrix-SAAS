import React, { useState } from "react";
import { Modal, Popover, Tooltip } from "@mui/material";
import helpVideo from "../Images/videoIcon.svg";
import read from "../Images/ReadIcon.svg";
import call from "../Images/callIcon.svg";
import chat from "../Images/chatIcon.svg";
import query from "../Images/queryIcon.svg";
import Themes from "../../Themes/Themes";

const GlobalSupport = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [queryModal, setQueryModal] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Themes>
          <div className="rounded-md">
            <div className="flex items-center gap-x-10 bg-caramel font-medium text-white px-3 py-2">
              <span>HCMatrix Quick Links</span>
              <i
                className="ri-close-line cursor-pointer"
                onClick={() => setAnchorEl(null)}
              ></i>
            </div>
            <div className="my-3 font-medium">
              <ul className="flex flex-col gap-y-3">
                <li className="flex items-center gap-x-5 border-b-2 pb-1 px-3 cursor-pointer group">
                  <img src={helpVideo} alt="help video" />
                  <span className="group-hover:text-caramel">Help Video</span>
                </li>
                <li className="flex items-center gap-x-5 border-b-2 pb-1 px-3 cursor-pointer group">
                  <img src={read} alt="help video" />
                  <span className="group-hover:text-caramel">Read Article</span>
                </li>
                <li className="flex items-center gap-x-5 border-b-2 pb-1 px-3 cursor-pointer group">
                  <img src={call} alt="help video" />{" "}
                  <a
                    href="tel: +1 (254) 244-0305"
                    className="group-hover:text-caramel"
                  >
                    Call
                  </a>
                </li>
                <li className="flex items-center gap-x-5 border-b-2 pb-1 px-3 cursor-pointer group">
                  <img src={chat} alt="help video" />{" "}
                  <span className="group-hover:text-caramel">Chat</span>
                </li>
                <li
                  onClick={() => setQueryModal(true)}
                  className="flex items-center gap-x-5 pb-1 px-3 cursor-pointer group"
                >
                  <img src={query} alt="help video" />
                  <span className="group-hover:text-caramel">Drop Query</span>
                </li>
              </ul>
            </div>
          </div>
        </Themes>
      </Popover>

      <Tooltip
        title="HCMatrix Quick Links"
        placement="top"
        onClick={handleClick}
      >
        <i
          style={{ borderWidth: "6px" }}
          className="ri-question-mark text-lg z-50 cursor-pointer font-semibold text-caramel border-caramel bg-white h-10 w-10 flex items-center rounded-full justify-center fixed bottom-10 right-3"
        ></i>
      </Tooltip>

      {/* query modal */}
      <Modal open={queryModal} onClose={() => setQueryModal(false)}>
        <Themes>
          <div className="CModal" style={{ maxWidth: 500 }}>
            <div className="flex items-center justify-between w-full mb-5">
              <h5 className="text-base font-semibold">Drop Query</h5>
              <i
                class="fas fa-times cursor-pointer text-xl"
                onClick={() => setQueryModal(false)}
              ></i>
            </div>

            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="whiteBg_form">
                  <label>Email Address</label>
                  <input type="email" placeholder="godswill@solution.com" />
                </div>
                <div className="whiteBg_form">
                  <label>Module</label>
                  <select name="" id="">
                    <option value="">Select Module</option>
                    <option value="payroll">Payroll</option>
                    <option value="performance">Performance</option>
                    <option value="attendance">Attendance</option>
                  </select>
                </div>
                <div className="whiteBg_form">
                  <label>Complaint Type</label>
                  <select name="" id="">
                    <option value="">Select Complaint</option>
                    <option value="payroll">System failure</option>
                  </select>
                </div>
                <div className="whiteBg_form">
                  <label>Subject</label>
                  <input type="text" placeholder="Not receiving OTP" />
                </div>
              </div>
              <div className="whiteBg_form">

              </div>
            </form>
          </div>
        </Themes>
      </Modal>
    </>
  );
};

export default GlobalSupport;
