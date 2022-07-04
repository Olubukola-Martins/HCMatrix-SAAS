import React from "react";
import Modal from "@mui/material/Modal";
import Themes from "../../Themes/Themes";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { motion } from "framer-motion";

const steps = [
  "Upload File",
  "Mapping details",
  "Confirm mapping",
  "Handle Duplicate",
];

const UploadFileModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="Email Verification"
      aria-describedby="Please verify your account by checking your inbox."
      BackdropProps={{ invisible: false }}
    >
      <Themes>
        <motion.div
          className="CModal overflow-y-auto"
          style={{
            maxWidth: 600,
            top: "20%",
            transform: "translate(-50%, -20%)",
          }}
        >
          <div style={{ height: "31rem" }}>
            {/* filter heading */}
            <div className="flex justify-between text-xl items-center font-light p-4">
              <h5 className="text-accent">Upload File</h5>
              <i
                className="fa fa-times cursor-pointer"
                aria-hidden="true"
                onClick={handleClose}
              ></i>
            </div>
            {/* content */}
            <div className="mt-2 text-accent">
              {/* emp n lisence */}
              <div className="px-6 py-3 flex items-center justify-between">
                <h6 className="text-sm">Employee Added: 2</h6>
                <h6 className="text-sm">License count left: 5</h6>
              </div>
              {/* stepper */}
              <div className="px-6 py-3 bg-caramel flex flex-col items-center justify-between">
                <Stepper activeStep={0} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>
                        <span style={{ color: "var(--card)" }}>{label}</span>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </div>
              {/* form */}
              <div className="px-6 mt-4">
                <form className="text-accent mt-6 grid grid-cols-1 gap-5">
                  <p className="mb-3">
                    Enter multiple email ids separated by commas.
                  </p>
                  <div>
                    <div className="input-container w-full">
                      <label className="text-sm mb-2 block">
                        Import data for:
                      </label>

                      <select
                        type="text"
                        placeholder="Employee"
                        className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                      >
                        <option className="bg-card">Employee</option>
                        <option className="bg-card">line manager</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <div className="input-container w-full">
                      <label className="text-sm mb-2 block">
                        Import based on:
                      </label>

                      <select
                        type="text"
                        placeholder="Select"
                        className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                      >
                        <option className="bg-card">Select</option>
                        <option className="bg-card">Employee</option>
                        <option className="bg-card">line manager</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col align-center text-center text-xs border border-dotted border-gray-400 px-1 py-2 gap-3 pb-4">
                      <i className="ri-upload-2-line text-caramel text-2xl cursor-pointer"></i>
                      <h6 className="text-bold text-base mb-2">
                        Choose file to be Imported
                      </h6>
                      <p className="text-light">
                        [only xls,xlsx and csv formats are supported] Maximum
                        upload file size is 5 MB.
                      </p>
                      <div className="button-container mt-2">
                        <button
                          className="py-1 px-2 rounded text-sm text-caramel border font-medium"
                          style={{ borderColor: "var(--caramel)" }}
                        >
                          Upload file
                        </button>
                      </div>
                      <p className="mt-2">
                        Download Sample template for import
                      </p>
                    </div>
                  </div>

                  {/* ctrl btns */}
                  <div className="form-buttons flex justify-between mt-2 mb-4">
                    <button className="py-2 px-4  rounded text-sm  font-medium">
                      Cancel
                    </button>
                    <button className="py-2 px-4 bg-caramel rounded text-sm text-white font-medium">
                      Save next
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </Themes>
    </Modal>
  );
};

export default UploadFileModal;
