import React from "react";
import Modal from "@mui/material/Modal";
import Themes from "../../../../../Themes/Themes";

export const SuspendEmployee = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Themes>
        <div className="CModal" style={{ maxWidth: 400 }}>
          <div className="flex items-center justify-between w-full mb-5">
            <h5 className="text-base font-semibold">Suspend Employee</h5>
            <i
              class="fas fa-times cursor-pointer text-xl"
              onClick={handleClose}
            ></i>
          </div>
          <form>
            <div className="whiteBg_form">
              <label>Effective from</label>
              <input
                type="text"
                placeholder="03 - 05 - 2021"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </div>
            <div className="whiteBg_form my-4">
              <label>Suspension Ends</label>
              <input
                type="text"
                placeholder="03 - 05 - 2021"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </div>
            <div className="whiteBg_form">
              <label>Suspension Type</label>
              <select required>
                <option value="">Select</option>
                <option value="1_week">1 week</option>
                <option value="2_weeks">2 weeks</option>
              </select>
            </div>

            <div className="whiteBg_form mt-4">
              <label>Comment</label>
              <textarea className="resize-none" placeholder="Add Comment" />
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
  );
};

// SeparateEmployee
export const SeparateEmployee = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Themes>
        <div className="CModal" style={{ maxWidth: 400 }}>
          <div className="flex items-center justify-between w-full mb-5">
            <h5 className="text-base font-semibold">Separate Employee</h5>
            <i
              class="fas fa-times cursor-pointer text-xl"
              onClick={handleClose}
            ></i>
          </div>

          <form>
            <div className="whiteBg_form">
              <label>Date of Separation</label>
              <input
                type="text"
                placeholder="03 - 05 - 2021"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </div>
            <div className="whiteBg_form my-4">
              <label>Separation type</label>
              <select required>
                <option value="">Select</option>
                <option value="1">Final</option>
              </select>
            </div>
            <div className="whiteBg_form">
              <label>Comment</label>
              <textarea className="resize-none" placeholder="Add Comment" />
            </div>

            <div className="whiteBg_form my-4">
              <label>Exit interview form</label>
              <input type="file" />
            </div>

            <div className="whiteBg_form">
              <label>Exit Checkout form</label>
              <input type="file" />
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
  );
};
