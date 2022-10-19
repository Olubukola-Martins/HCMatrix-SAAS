import React from "react";
import Themes from "../../../../Themes/Themes";

import Modal from "@mui/material/Modal";

const CModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open === "move-to-company"}
      onClose={handleClose}
      aria-labelledby="Email Verification"
      aria-describedby="Please verify your account by checking your inbox."
      BackdropProps={{ invisible: false }}
    >
      <Themes>
        <div className="CModal" style={{ maxWidth: 600 }}>
          <div className="flex flex-col items-center justify-center pb-8  text-accent">
            <div className="flex items-center justify-end w-full mb-4">
              <i
                class="fas fa-times cursor-pointer text-2xl"
                onClick={handleClose}
              ></i>
            </div>

            <h4 className="font-bold text-lg mb-4 text-center">
              Move to sister/associate company
            </h4>

            <div className="radio-inputs mt-4 w-3/4">
              <div className="input-container w-full">
                <label className="mb-2 text-sm block">
                  Select a sister/associate company
                </label>
                <select
                  type="text"
                  placeholder="eg. Dangote Conglomerate"
                  className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                >
                  {[
                    "Dangote Cement",
                    "Dangote Woodworks",
                    "Dangote Metal",
                    "Dangote Salt",
                  ].map((item) => (
                    <option key={item} id={item} className="bg-card">
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="buttons mt-6 flex items-center gap-4">
              <button className="px-3 py-1 bg-caramel rounded text-sm text-white font-medium hover:bg-opacity-70">
                Move
              </button>
              <button
                onClick={handleClose}
                className="px-3 py-1 bg-transparent rounded text-sm text-accent border border-slate-200 hover:border-slate-400 font-medium transition ease-in-out duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Themes>
    </Modal>
  );
};

export default CModal;
