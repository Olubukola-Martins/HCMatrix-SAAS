import React, { useState } from "react";
import { IModalProps } from "types";
import Themes from "components/Themes";
import { Modal, Steps } from "antd";
import { EMPLOYEE_BULK_IMPORT_STEPS } from "../../constants";
import { UploadEmployeeBulkImport } from "./UploadEmployeeBulkImport";
import {
  TBulkEmployeeImportMappingSection,
  TBulkImportEmployeeProp,
} from "../../types/bulk-import";
import EmployeeImportDataMapping from "./EmployeeImportDataMapping";
import EmployeeDataVerification from "./EmployeeDataVerification";
import EmployeeDataImportConfirmation from "./EmployeeDataImportConfirmation";

interface IProps extends IModalProps {}

const ImportEmployees: React.FC<IProps> = ({ open, handleClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [columns, setColumns] = useState<string[]>([]);
  const [selectedSections, setSelectedSections] = useState<
    TBulkEmployeeImportMappingSection[]
  >([]);
  const [retrievedData, setRetrievedData] = useState<(string | number)[][]>([]);
  const [dataToBeSubmitted, setDataToBeSubmitted] = useState<
    TBulkImportEmployeeProp[]
  >([]);
  const [confirmationMessages, setConfirmationMessages] = useState<string[]>(
    []
  );

  return (
    <Modal
      title="Import Employees"
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      style={{ top: 20 }}
      width={680}
      closable={false}
    >
      <Themes>
        {/* header */}
        <ImportEmpHeader
          {...{
            employeeCount: dataToBeSubmitted.length,
            maxEmployeesAllowed: 100, //Confirm wether there is a limit to maxEmpAllowed
            activeStep,
            steps: EMPLOYEE_BULK_IMPORT_STEPS,
          }}
        />

        {/* components */}
        <div className="w-full mt-6">
          <div className={activeStep === 0 ? "block" : "hidden"}>
            <UploadEmployeeBulkImport
              {...{
                handleColumns: (cols) => setColumns(cols),
                handleNext: () => setActiveStep(1),
                handleRetrievedData: (data) => setRetrievedData(data),
                handleSections: (sections) => setSelectedSections(sections),
                onError: () => {
                  setActiveStep(0);
                  setRetrievedData([]);
                  setSelectedSections([]);
                  setColumns([]);
                  setDataToBeSubmitted([]);
                },
              }}
            />
          </div>

          <div className={activeStep === 1 ? "block" : "hidden"}>
            <EmployeeImportDataMapping
              {...{
                columns,
                handleDataToBeSubmitted: (data) => setDataToBeSubmitted(data),
                handleNext: () => setActiveStep(2),
                handlePrev: () => setActiveStep(0),
                retrievedData,
                sections: selectedSections,
              }}
            />
          </div>
          <div className={activeStep === 2 ? "block" : "hidden"}>
            <EmployeeDataVerification
              {...{
                dataToBeSubmitted,
                handleNext: () => setActiveStep(3),
                handlePrev: () => setActiveStep(1),
                handleDataToBeSubmitted: (data) => setDataToBeSubmitted(data),
                sections: selectedSections,
                handleConfirmationMessages: (messages) =>
                  setConfirmationMessages(messages),
              }}
            />
          </div>
          <div className={activeStep === 3 ? "block" : "hidden"}>
            <EmployeeDataImportConfirmation
              {...{
                confirmationMessages,
                dataToBeSubmitted,
                handleClose: () => {
                  setActiveStep(0);
                  setDataToBeSubmitted([]);
                  setSelectedSections([]);
                  setRetrievedData([]);
                  handleClose();
                },
                handlePrev: () => setActiveStep(2),
              }}
            />
          </div>
        </div>
      </Themes>
    </Modal>
  );
};

const ImportEmpHeader: React.FC<{
  employeeCount: number;
  maxEmployeesAllowed: number;
  steps: string[];
  activeStep: number;
}> = ({ employeeCount, maxEmployeesAllowed, steps, activeStep }) => {
  return (
    <div className="w-full flex flex-col gap-8">
      {/* liscence */}
      <div className="px-4 py-2 flex justify-between  bg-faded rounded-md">
        <h6 className="text-xs">Employee Added: {employeeCount}</h6>
        <h6 className="text-xs">
          License count left: {maxEmployeesAllowed - employeeCount}
        </h6>
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
  );
};

export default ImportEmployees;
