import React from "react";
import Modal from "@mui/material/Modal";
import Themes from "../../../Themes/Themes";

const AddSkill = ({ open, handleClose }) => {
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Themes>
          <div className="CModal" style={{ maxWidth: 400 }}>
            <div className="flex items-center justify-between w-full mb-5">
              <h5 className="text-base font-semibold">Add New Skill</h5>
              <i
                class="fas fa-times cursor-pointer text-xl"
                onClick={handleClose}
              ></i>
            </div>

            <form>
              <div className="whiteBg_form">
                <label>Skill</label>
                <input type="tel" />
              </div>
              <div className="whiteBg_form mt-4">
                <label>Competency</label>
                <select name="" id="">
                  <option value="">Select</option>
                  <option value="great">Grade 1</option>
                </select>
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

export default AddSkill;
