import React from "react";
import Modal from "@mui/material/Modal";
import Themes from "../../../Themes/Themes";

const AddDependant = ({ open, handleClose }) => {
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Themes>
          <div className="CModal" style={{ maxWidth: 500 }}>
            <div className="flex items-center justify-between w-full mb-5">
              <h5 className="text-base font-semibold">Add dependant</h5>
              <i
                class="fas fa-times cursor-pointer text-xl"
                onClick={handleClose}
              ></i>
            </div>

            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="whiteBg_form">
                  <label>Name</label>
                  <input type="text" placeholder="Godswill smile" />
                </div>
                <div className="whiteBg_form">
                  <label>Date of Birth</label>
                  <input
                    type="text"
                    placeholder="03 - 05 - 2021"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                  />
                </div>
                <div className="whiteBg_form">
                  <label>Email</label>
                  <input type="text" placeholder="johndoe@email.com" />
                </div>
                <div className="whiteBg_form">
                  <label>Phone</label>
                  <input type="tel" placeholder="+234 | 8047463822" />
                </div>
                <div className="whiteBg_form">
                  <label>Relationship</label>
                  <select name="" id="">
                    <option value="father">Father</option>
                    <option value="mother">Mother</option>
                  </select>
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
              </div>
             
            </form>
          </div>
        </Themes>
      </Modal>
    </>
  );
};

export default AddDependant;
