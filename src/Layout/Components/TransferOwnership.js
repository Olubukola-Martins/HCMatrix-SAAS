import { Autocomplete, Modal, TextField } from "@mui/material";
import React, { useState } from "react";
import Themes from "../../Themes/Themes";

const emailList = [
  "godswill@snapnetsolution.com",
  "godswill@snapnetsolution.com",
  "godswill@snapnetsolution.com",
  "godswill@snapnetsolution.com",
  "godswill@snapnetsolution.com",
  "godswill@snapnetsolution.com",
  "godswill@snapnetsolution.com",
];
const TransferOwnership = ({ open, handleClose }) => {
  const [showSubmit, setShowSubmit] = useState(false);

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Themes>
          <div className="CModal" style={{ maxWidth: 400 }}>
            <div className="flex items-center justify-between w-full mb-7 border-b">
              <h5 className="text-base font-semibold">Transfer Ownership</h5>
              <i
                className="fas fa-times cursor-pointer text-xl"
                onClick={handleClose}
              ></i>
            </div>
            <div className="flex justify-center">
              <form>
                {/* first phase */}
                <div className={showSubmit ? `hidden` : `""`}>
                  <h4 className="font-semibold mb-3">imiekhaudu@gmail.com</h4>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={emailList}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Search email.." />
                    )}
                  />
                  <button
                    onClick={() => setShowSubmit(true)}
                    type="button"
                    className="button mt-4"
                  >
                    Transfer ownership
                  </button>
                </div>

                {/* second phase */}
                <div className={showSubmit ? `""` : `hidden`}>
                  <h4 className="font-extrabold mb-3 text-center text-lg">
                    Do you want to Assign <br />
                    total ownership to Isaac
                  </h4>
                  <div className="flex items-center gap-x-10 mt-10">
                    <button type="submit" className="button">
                      Yes, Continue
                    </button>
                    <button
                      type="button"
                      className="transparentButton"
                      onClick={() => setShowSubmit(false)}
                    >
                      No, Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Themes>
      </Modal>
    </>
  );
};

export default TransferOwnership;
