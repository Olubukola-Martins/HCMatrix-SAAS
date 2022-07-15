import React from "react";
import Modal from "@mui/material/Modal";
import Themes from "../../../../../Themes/Themes";

const AddSalaryForm = ({ open, handleClose }) => {
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Themes>
          <div className="CModal" style={{ maxWidth: 400 }}>
            <div className="flex items-center justify-between w-full mb-5">
              <h5 className="text-base font-semibold">Add New Salary</h5>
              <i
                class="fas fa-times cursor-pointer text-xl"
                onClick={handleClose}
              ></i>
            </div>

            <form>
              <div className="whiteBg_form">
                <label>Salary</label>
                <input type="number" />
              </div>
              <div className="whiteBg_form mt-4">
                <label>Effective date</label>
                <input
                  type="text"
                  placeholder="03 - 05 - 2021"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                />
              </div>
              <div className="flex items-center justify-between mt-5">
                <button
                  type="button"
                  onClick={handleClose}
                  className="transparentButton"
                >
                  Cancel
                </button>
                <button type="submit" className="button">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Themes>
      </Modal>
    </>
  );
};

export default AddSalaryForm;
