import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Themes from "../../../../Themes/Themes";
import "../../../style/settingsStyle.css";
import {SuspendEmployee, SeparateEmployee} from "../EmployeeProfiles/PersonalInformation/SuspendAndSeparateEmployee"

const ChangeEmployeeStatus = ({ open, handleClose }) => {
    const [separateModal, setSeparateModal] = useState(false);
    const [suspendModal, setSuspendModal] = useState(false);
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Themes>
          <div className="CModal" style={{ maxWidth: 400 }}>
            <div className="flex items-center justify-between w-full mb-7">
              <h5 className="text-base font-semibold">
                Change Employee Status
              </h5>
              <i
                className="fas fa-times cursor-pointer text-xl"
                onClick={handleClose}
              ></i>
            </div>

            <form>
              <div className="radioBtn">
                <input type="radio" id="confirm" name="employeeStatus" value="huey" />
                <label htmlFor="confirm">Confirm</label>
              </div>

              <div className="radioBtn" onClick={() => setSuspendModal(true)}>
                <input type="radio" id="suspend" name="employeeStatus" value="dewey" />
                <label htmlFor="suspend">Suspend</label>
              </div>

              <div className="radioBtn" onClick={() => setSeparateModal(true)}>
                <input type="radio" id="separate" name="employeeStatus" value="louie" />
                <label htmlFor="separate">Separate</label>
              </div>
              <SuspendEmployee
                open={suspendModal}
                handleClose={() => setSuspendModal(false)}
              />

              <SeparateEmployee open={separateModal}
                handleClose={() => setSeparateModal(false)}/>

              <div className="flex items-center justify-around mt-8">
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

export default ChangeEmployeeStatus;
