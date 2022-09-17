import { Modal } from "@mui/material";
import React from "react";
import Themes from "../../../Themes/Themes";

const MonetaryDetails = ({ open, handleClose }) => {
  const inputStyle =
    "w-full rounded-md border border-gray-300 py-2 px-2 text-sm bg-mainBg focus:outline-none placeholder:text-accent mt-1";
  const labelStyle = "font-medium text-sm";
  return (
    <Modal open={open} onClose={handleClose}>
      <Themes>
        <div className="CModal" style={{ maxWidth: 600 }}>
          <div className="flex items-center justify-between mb-6">
            <h5 className="font-semibold text-base">Requisition Details</h5>
            <i
              onClick={handleClose}
              className="ri-close-line font-semibold text-xl cursor-pointer hover:text-neutral"
            ></i>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-3">
              <div>
                <label className={labelStyle}>Requisition Date:</label>
                <input
                  type="text"
                  placeholder="10-08-2022"
                  className={inputStyle}
                  disabled
                />
              </div>
              <div>
                <label className={labelStyle}>Title:</label>
                <input
                  type="text"
                  placeholder="Laptop Request"
                  className={inputStyle}
                  disabled
                />
              </div>

              <div>
                <label className={labelStyle}>Requisition Type:</label>
                <input
                  type="text"
                  placeholder="Devices/ELectronics"
                  className={inputStyle}
                  disabled
                />
              </div>
              <div>
                <label className={labelStyle}>Attachment:</label>
                <img
                  src="https://via.placeholder.com/350x150"
                  className="rounded-md"
                  alt="Attachment"
                />
              </div>
            </div>

            {/* second layer */}
            <div className="flex flex-col gap-3">
              <div>
                <label className={labelStyle}>Item:</label>
                <input
                  type="text"
                  placeholder="HP EliteBook"
                  className={inputStyle}
                  disabled
                />
              </div>
              <div>
                <label className={labelStyle}>Status:</label>
                <input
                  type="text"
                  placeholder="Rejected"
                  className={inputStyle}
                  disabled
                />
              </div>

              <div>
                <label className={labelStyle}>Description:</label>
                <div className="bg-mainBg rounded-md p-3 text-sm">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>
              <div>
                <label className={labelStyle}>Comment:</label>
                <div className="bg-mainBg rounded-md p-3 text-sm">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Themes>
    </Modal>
  );
};

export default MonetaryDetails;
