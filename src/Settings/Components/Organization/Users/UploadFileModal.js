import { useState } from "react";
import Modal from "@mui/material/Modal";
import Themes from "../../../../Themes/Themes";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import UploadFile from "./UploadFileModalComponents/UploadFile";
import MappingDetails from "./UploadFileModalComponents/MappingDetails";
import HandleDuplicate from "./UploadFileModalComponents/HandleDuplicate";
import ConfirmMapping from "./UploadFileModalComponents/ConfirmMapping";

const steps = [
  "Upload File",
  "Mapping details",
  "Confirm mapping",
  "Handle Duplicate",
];

const UploadFileModal = ({ open, handleClose }) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="Email Verification"
      aria-describedby="Please verify your account by checking your inbox."
      BackdropProps={{ invisible: false }}
    >
      <Themes>
        <div
          className="CModal overflow-y-auto"
          style={{
            maxWidth: 600,
            top: "20%",
            transform: "translate(-50%, -20%)",
            padding: 0,
          }}
        >
          <div style={{ height: "31rem" }}>
            {/* filter heading */}
            <div className="flex justify-between text-xl items-center font-light px-6 py-4">
              <h5 className="text-accent">
                {" "}
                {activeStep === 0 && steps[0]}
                {activeStep === 1 && steps[1]}
                {activeStep === 2 && steps[2]}
                {activeStep === 3 && steps[3]}
              </h5>
              <i
                className="fa fa-times cursor-pointer"
                aria-hidden="true"
                onClick={handleClose}
              ></i>
            </div>
            {/* content */}
            <div className="mt-2 text-accent">
              {/* confirm mapping */}
              {activeStep === 2 && (
                <div className="px-6 py-3 bg-slate-200  bg-opacity-30 text-center">
                  <p>All fields are Mapped correctly</p>
                </div>
              )}
              {/* emp n lisence */}
              <div className="px-6 py-3 flex items-center justify-between">
                <h6 className="text-sm">Employee Added: 2</h6>
                <h6 className="text-sm">License count left: 5</h6>
              </div>

              {/* stepper */}
              <div className="px-6 py-3 bg-faded">
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>
                        <span className="text-accent font-semibold">
                          {label}
                        </span>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </div>
              {/* upload file*/}

              {activeStep === 0 && (
                <UploadFile handleActiveStep={setActiveStep} />
              )}
              {/* mapping details */}

              {activeStep === 1 && (
                <MappingDetails handleActiveStep={setActiveStep} />
              )}
              {/* confirm mapping */}
              {activeStep === 2 && (
                <ConfirmMapping handleActiveStep={setActiveStep} />
              )}

              {/* handle duplicate */}
              {activeStep === 3 && (
                <HandleDuplicate
                  handleActiveStep={setActiveStep}
                  handleClose={handleClose}
                />
              )}
              {activeStep === 4 && (
                <div className="text-center flex items-center justify-center py-12 text-lg">
                  <h4>Data has been successfully imported!</h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </Themes>
    </Modal>
  );
};

export default UploadFileModal;
