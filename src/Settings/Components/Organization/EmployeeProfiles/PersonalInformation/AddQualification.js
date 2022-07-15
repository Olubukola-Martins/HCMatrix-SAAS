import React from "react";
import Modal from "@mui/material/Modal";
import Themes from "../../../../../Themes/Themes";

const AddQualification = ({ open, handleClose }) => {
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Themes>
          <div className="CModal" style={{ maxWidth: 500 }}>
            <div className="flex items-center justify-between w-full mb-5">
              <h5 className="text-base font-semibold">Add Qualification</h5>
              <i
                class="fas fa-times cursor-pointer text-xl"
                onClick={handleClose}
              ></i>
            </div>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="whiteBg_form">
                  <label>Qualification</label>
                  <select name="" id="">
                    <option value="bachelor">Bachelor</option>
                    <option value="phd">PHD</option>
                  </select>
                </div>
                <div className="whiteBg_form">
                  <label>Title</label>
                  <input type="text" placeholder="Qualification Title" />
                </div>

                <div className="whiteBg_form">
                  <label>Institution</label>
                  <input type="text" placeholder="Institution" />
                </div>
                <div className="whiteBg_form">
                  <label>Year</label>
                  <input
                    type="text"
                    placeholder="03 - 05 - 2021"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                  />
                </div>
                <div className="whiteBg_form">
                  <label>Course</label>
                  <input type="text" placeholder="User experience design" />
                </div>

                <div className="whiteBg_form">
                  <label>Grade</label>
                  <select name="" id="">
                    <option value="grade_1">Grade A</option>
                    <option value="grade_2">Grade B</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-around mt-5">
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

export default AddQualification;
