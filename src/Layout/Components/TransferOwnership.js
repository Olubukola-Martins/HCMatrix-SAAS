import { Autocomplete, Modal, TextField } from "@mui/material";
import React from "react";
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
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Themes>
          <div className="CModal" style={{ maxWidth: 400 }}>
            <div className="flex items-center justify-between w-full mb-5">
              <h5 className="text-base font-semibold">Transfer Ownership</h5>
              <i
                class="fas fa-times cursor-pointer text-xl"
                onClick={handleClose}
              ></i>
            </div>
            <form>
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

              <button className="button mt-4">Transfer ownership</button>
            </form>
          </div>
        </Themes>
      </Modal>
    </>
  );
};

export default TransferOwnership;
