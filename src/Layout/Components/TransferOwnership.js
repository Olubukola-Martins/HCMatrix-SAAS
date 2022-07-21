import { Modal } from "@mui/material";
import React from "react";
import Themes from "../../Themes/Themes";

const TransferOwnership = ({ open, handleClose }) => {
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
            hello
          </div>
        </Themes>
      </Modal>
    </>
  );
};

export default TransferOwnership;
