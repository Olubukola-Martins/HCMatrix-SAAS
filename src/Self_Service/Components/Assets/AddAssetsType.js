import { Modal } from "@mui/material";
import React from "react";
import Themes from "../../../Themes/Themes";

const AddAssetsType = ({ open, handleClose }) => {

  return (
    <Modal open={open} onClose={handleClose}>
      <Themes>
        <div className="CModal" style={{ maxWidth: 400 }}>
          <h5 className="font-semibold text-base pb-5">Add Asset Type</h5>

          <form>
            <input
              type="text"
              placeholder="Asset Type Name"
              className="w-full rounded-md border border-gray-300 py-2 px-2 text-sm bg-mainBg focus:outline-none placeholder:text-accent"
            />

            <div className="mt-7 flex items-center justify-between">
              <button onClick={handleClose} type="button" className="transparentButton">Cancel</button>
              <button className="button">Submit</button>
            </div>
          </form>
        </div>
      </Themes>
    </Modal>
  );
};

export default AddAssetsType;
