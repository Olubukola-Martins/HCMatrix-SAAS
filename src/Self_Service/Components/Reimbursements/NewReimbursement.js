import { Modal } from "@mui/material";
import React from "react";
import Themes from "../../../Themes/Themes";

const NewReimbursement = ({ open, handleClose }) => {
  const inputStyle =
    "w-full rounded-md border border-gray-300 py-2 px-2 text-sm bg-mainBg focus:outline-none placeholder:text-accent";

  return (
    <Modal open={open} onClose={handleClose}>
      <Themes>
        <div className="CModal" style={{ maxWidth: 400 }}>
          <div className="flex items-center justify-between mb-6">
            <h5 className="font-semibold text-base">New Reimbursement</h5>
            <i
              onClick={handleClose}
              className="ri-close-line font-semibold text-xl cursor-pointer hover:text-neutral"
            ></i>
          </div>
          <form>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                placeholder="Requisition Date"
                className={inputStyle}
              />
              <input type="text" placeholder="Title" className={inputStyle} />

              <select name="" id="" className={inputStyle}>
                <option value="">Reimbursement Type</option>
                <option value="Reimbursement Type 1">
                  Reimbursement Type 1
                </option>
              </select>

              <textarea
                rows="2"
                placeholder="Description"
                className={inputStyle}
              />

              <input
                type="number"
                placeholder="Amount"
                className={inputStyle}
              />

              <input
                type="text"
                onFocus={(e) => (e.target.type = "file")}
                onBlur={(e) => (e.target.type = "text")}
                placeholder="Attachment"
                className={inputStyle}
              />
            </div>
            <div className="mt-7 flex items-center justify-between">
              <button className="transparentButton">
                Save And Add Another
              </button>
              <button className="button">Submit</button>
            </div>
          </form>
        </div>
      </Themes>
    </Modal>
  );
};

export default NewReimbursement;
