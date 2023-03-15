import { useState } from "react";
import { Button, Divider, Modal, Steps } from "antd";

import Themes from "../../../../Themes/Themes";

import { UploadExcelForm } from "./UploadExcelForm";
import { IModalProps } from "../../../../AppTypes/Component";
import MappingDetails, {
  EmployeeSectionEnum,
  TMappingSection,
} from "./MappingDetails";
import ErrorBoundary from "GeneralComps/ErrorBoundary";

const bulkEmployeeUploadSections: TMappingSection[] = [
  {
    title: EmployeeSectionEnum.PERSONAL_INFORMATION,
    inputs: [
      { name: "firstName", label: "First Name" },
      { name: "lastName", label: "Last Name" },
      { name: "dob", label: "Date of Birth" },
      { name: "gender", label: "Gender" },
      { name: "eligibility", label: "Citizenship" },
      { name: "maritalStatus", label: "Marital Status" },
      { name: "nationality", label: "Nationality" },
      {
        name: "passportExpirationDate",
        label: "Passport Expiration Date",
        optional: false,
      },
      { name: "alternativeEmail", label: "Alternative Email" },
      {
        name: "alternativePhoneNumber",
        label: "Alternative Phone Number",
      },
      { name: "nin", label: "National Identity Number" },
      { name: "taxAuthority", label: "Tax Authority" },
      { name: "taxId", label: "Tax ID" },
    ],
  },
  {
    title: EmployeeSectionEnum.WALLET_INFORMATION,
    inputs: [
      {
        name: "walletAccountProvider",
        label: "Nubian Account Provider",
      },
      {
        name: "walletAccountNumber",
        label: "Nubian Account Number",
      },
    ],
  },
  {
    title: EmployeeSectionEnum.BANK_INFORMATION,
    inputs: [
      { name: "bankName", label: "Bank Name" },
      { name: "bankAccountNumber", label: "Account Number" },
      { name: "bvn", label: "Bank Verification Number" },
    ],
  },
  {
    title: EmployeeSectionEnum.PENSION_INFORMATION,
    inputs: [
      {
        name: "pensionFundAdministrator",
        label: "Pension Fund Administrator",
      },
      {
        name: "pensionAccountNumber",
        label: "Pension Account Number",
      },
      { name: "pensionType", label: "Pension Type" },
    ],
  },
  {
    title: EmployeeSectionEnum.EMERGENCY_CONTACT,
    inputs: [
      {
        name: "ecFullName",
        label: "Full Name",
      },
      { name: "ecAddress", label: "Address" },
      { name: "ecRelationship", label: "Relationship" },
      { name: "ecPhoneNumber", label: "Phone" },
    ],
  },
];

const steps = [
  "Upload File",
  "Mapping details",
  "Confirm mapping",
  "View Result",
];
const successInfo = [
  { title: "Number of records added", count: 20 },
  { title: "Number of records updated", count: 12 },
  { title: "Number of records Skipped", count: 29 },
  { title: "Number of errors", count: 0 },
];

const UploadFileModal = ({ open, handleClose }: IModalProps) => {
  const [importBasedOn, setImportBasedOn] = useState<"email | employeeId">();
  const [importDataFor, setImportDataFor] = useState<string[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [retrievedData, setRetrievedData] = useState<any[]>([]);
  const [formattedData, setFormattedData] = useState<any[]>([]);
  const [selectedSections, setSelectedSections] = useState<TMappingSection[]>(
    []
  );

  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((val) => val + 1);
  };
  const handlePrev = () => {
    setActiveStep((val) => val - 1);
  };

  const onCancel = () => {
    setActiveStep(0);
    handleClose();
  };
  return (
    <Modal
      title="Import Employees"
      open={open}
      onCancel={() => onCancel()}
      footer={null}
      style={{ top: 20 }}
      width={680}
    >
      <Themes>
        <p>{activeStep}</p>
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
                setRetrievedData={setRetrievedData}
                handleNext={handleNext}
                activeStep={activeStep}
                sections={bulkEmployeeUploadSections}
                handleSections={(val: TMappingSection[]) =>
                  setSelectedSections(val)
                }
              />
            )}
            {/* mapping details */}
            {(activeStep === 1 || activeStep === 2 || activeStep === 3) && (
              <ErrorBoundary
                message="Invalid File Type (consider using our template)"
                action={handlePrev}
              >
                <MappingDetails
                  columns={columns}
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                  activeStep={activeStep}
                  retrievedData={retrievedData}
                  setFormattedData={setFormattedData}
                  sections={selectedSections}
                />
              </ErrorBoundary>
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
                      <div key={item.title}>
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
