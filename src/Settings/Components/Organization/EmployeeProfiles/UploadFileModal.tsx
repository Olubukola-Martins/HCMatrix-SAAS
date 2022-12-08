import { useState } from "react";
import { Button, Divider, Modal, Steps } from "antd";

import Themes from "../../../../Themes/Themes";

import FramerAccordian from "../../custom/FramerAccordian";
import { UploadExcelForm } from "./UploadExcelForm";
import { IModalProps } from "../../../../AppTypes/Component";
import MappingDetails from "./MappingDetails";

const steps = [
  "Upload File",
  "Mapping details",
  "Confirm mapping",
  "Handle Duplicate",
];
const successInfo = [
  { title: "Number of records added", count: 20 },
  { title: "Number of records updated", count: 12 },
  { title: "Number of records Skipped", count: 29 },
  { title: "Number of errors", count: 0 },
];

const UploadFileModal = ({ open, handleClose }: IModalProps) => {
  const [columns, setColumns] = useState<string[]>([]);

  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((val) => val + 1);
  };
  const handlePrev = () => {
    setActiveStep((val) => val - 1);
  };
  return (
    <Modal
      title="Import Employees"
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      style={{ top: 20 }}
      width={680}
    >
      <Themes>
        <div className="text-accent flex flex-col items-center gap-12">
          <div className="w-full flex flex-col gap-8">
            {/* liscence */}
            <div className="px-4 py-2 flex justify-between  bg-faded rounded-md">
              <h6 className="text-xs">Employee Added: 2</h6>
              <h6 className="text-xs">License count left: 5</h6>
            </div>

            {/* stepper */}
            <div>
              <Steps progressDot current={activeStep}>
                {steps.map((item) => (
                  <Steps.Step
                    key={item}
                    title={<span className="text-sm">{item}</span>}
                  />
                ))}
              </Steps>
            </div>
          </div>

          {/* content */}
          <div className="w-full">
            {" "}
            {/* upload file*/}
            {activeStep === 0 && (
              <UploadExcelForm
                setColumns={setColumns}
                handleNext={handleNext}
                activeStep={activeStep}
              />
            )}
            {/* mapping details */}
            {(activeStep === 1 || activeStep === 2) && (
              <MappingDetails
                columns={columns}
                handleNext={handleNext}
                handlePrev={handlePrev}
                activeStep={activeStep}
              />
            )}
            {/* handle duplicate */}
            {activeStep === 3 && (
              <div className="mt-4 pb-6">
                <div className="px-6 py-3 flex flex-col gap-6">
                  {/* view record box */}
                  <div className="flex flex-col align-center text-center text-xs border border-dotted border-gray-400 px-1 py-2 gap-3 pb-4">
                    <i className="ri-download-2-line text-caramel text-2xl cursor-pointer"></i>
                    <h6 className="text-bold text-base mb-2">
                      The selected file has been imported Successfully.
                    </h6>

                    <div className="button-container mt-2">
                      <button
                        className="py-1 px-2 rounded text-sm text-caramel border font-medium"
                        style={{ borderColor: "var(--caramel)" }}
                      >
                        View Records
                      </button>
                    </div>
                  </div>
                  {/* info section */}
                  <div className="grid grid-cols-2 gap-4">
                    {successInfo.map((item) => (
                      <div>
                        <div
                          key={item.title}
                          className="info-container py-2 px-3 flex items-center justify-between rounded-md bg-white"
                        >
                          <p className="text-slate-400 text-sm">{item.title}</p>
                          <span className="block border-caramel border py-0.5 px-1 rounded-sm text-xs">
                            {item.count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* ctrl btns */}
                  <div className="form-buttons flex justify-between mt-2 mb-4">
                    <button
                      className="py-2 px-4  rounded text-sm  font-medium border border-black"
                      onClick={() => handleClose}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Themes>
    </Modal>
  );
};

export default UploadFileModal;
