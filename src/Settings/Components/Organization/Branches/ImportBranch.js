import React from "react";
import { motion } from "framer-motion";
import { Step, StepLabel, Stepper } from "@mui/material";

const steps = [
  "Upload file",
  "Mapping details",
  "Confirm mapping",
  "Handle duplicate",
];

const ImportBranch = ({ handleDrawer }) => {
  return (
    <motion.div
      initial={{ x: 500 }}
      animate={{
        x: 0,
      }}
      transition={{ ease: "easeIn" }}
      exit={{ x: 500 }}
      className="w-4/12 scrollBar fixed overflow-y-auto bg-card mt-1 right-0 drop-shadow-lg z-50 cursor-move py-2 px-4 pb-8 "
      drag
      style={{ height: "28rem" }}
    >
      {/* filter heading */}
      <div className="flex justify-between text-xl items-center font-light">
        <h5 className="text-accent font-medium text-md">Upload File</h5>
        <i
          className="fa fa-times cursor-pointer"
          aria-hidden="true"
          onClick={handleDrawer}
        ></i>
      </div>
      <div className="my-8 w-full">
        <Stepper activeStep={1} alternativeLabel orientation="horizontal">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>
                {label}
                {/* <span className="text-xs">{label}</span> */}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      <form className="whiteBg_form">
        <div>
          <label style={{ fontSize: 17 }}>Import data for:</label>
          <select required>
            <option value="">Branch</option>
            <option value="1">Nigeria</option>
            <option value="2">Ghana</option>
          </select>
        </div>
        <div className="my-3">
          <label style={{ fontSize: 17 }}>Import based on:</label>
          <select required>
            <option value="">Branch Name</option>
            <option value="1">Nigeria</option>
            <option value="2">Ghana</option>
          </select>
        </div>

        <div className="border-2 text-center my-4 py-4 border-dotted shadow">
          <i className="ri-download-2-line text-caramel text-2xl"></i>
          <h5 className="font-semibold text-base pb-2">
            Choose file to be Imported
          </h5>
          <p className="text-sm text-gray-400">
            [only xls,xlsx and csv formats are supported]
          </p>
          <p className="text-sm text-gray-400">
            Maximum upload file size is 5 MB.
          </p>
          <div className="flex justify-center mt-3">
            <label
              htmlFor="file"
              className="border px-3 pt-1 cursor-pointer border-caramel"
              style={{ color: "var(--caramel)" }}
            >
              Upload File
            </label>
          </div>
          <input type="file" required id="file" className="hidden" />

          <p className="text-sm text-caramel pt-7 pb-12">
            Download Sample template for import
          </p>
        </div>
      </form>
      <div className="flex items-center justify-between mt-6">
        <h5
          className="font-medium cursor-pointer hover:font-semibold"
          onClick={handleDrawer}
        >
          Cancel
        </h5>
        <button className="button">Save Changes</button>
      </div>
    </motion.div>
  );
};

export default ImportBranch;
