import { Modal, Switch } from "@mui/material";
import React, { useState } from "react";
import Themes from "../../../../Themes/Themes";

const AddVehicle = ({ open, handleClose }) => {
  const [moreInfo, setMoreInfo] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState(false);

  const inputStyle =
    "w-full rounded-md border border-gray-300 py-2 px-2 text-sm bg-mainBg focus:outline-none placeholder:text-accent placeholder:font-medium";
  const boxStyle = "px-4 py-3 shadow rounded-md bg-mainBg";
  const boxTitle = "font-medium text-sm pb-1";
  return (
    <Modal open={open} onClose={handleClose}>
      <Themes>
        <div
          className="CModal overflow-auto scrollBar"
          style={{ maxWidth: 500, height: 500 }}
        >
          <h5 className="text-lg font-semibold pb-5">Add Vehicle</h5>

          <form className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Vehicle Type"
              className={inputStyle}
            />

            <input
              type="text"
              placeholder="Vehicle Brand"
              className={inputStyle}
            />

            <input
              type="text"
              placeholder="Vehicle Model"
              className={inputStyle}
            />

            <input
              type="text"
              placeholder="Plate Number"
              className={inputStyle}
            />

            <div className={boxStyle}>
              <div className="flex items-center justify-between">
                <h5 className={boxTitle}>More Information (Optional)</h5>
                <Switch
                  size="small"
                  checked={moreInfo}
                  onChange={(e) => setMoreInfo(e.target.checked)}
                />
              </div>
              {moreInfo && (
                <div className="pt-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Cost (Optional)"
                      className={inputStyle}
                    />
                    <input
                      type="text"
                      placeholder="Color (Optional)"
                      className={inputStyle}
                    />
                    <input
                      type="text"
                      placeholder="Purchase Date (Optional)"
                      className={inputStyle}
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className={boxStyle}>
              <div className="flex items-center justify-between">
                <h5 className={boxTitle}>Additional Information (Optional)</h5>
                <Switch
                  size="small"
                  checked={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.checked)}
                />
              </div>

              {additionalInfo && (
                <div className="pt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select name="" id="" className={inputStyle}>
                    <option value="">Assignee</option>
                    <option value="godswill">Godswill</option>
                    <option value="ruth">Ruth</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Start Date"
                    className={inputStyle}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                  />
                </div>
              )}
            </div>

            <input
              type="text"
              placeholder="Upload Asset Document"
              className={inputStyle}
              onFocus={(e) => (e.target.type = "file")}
              onBlur={(e) => (e.target.type = "text")}
            />
            <div className="flex items-center justify-between mt-5">
              <button
                onClick={handleClose}
                type="button"
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

export default AddVehicle;
