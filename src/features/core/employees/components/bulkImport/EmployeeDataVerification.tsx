import React, { useState } from "react";
import {
  TBulkEmployeeImportMappingSection,
  TBulkImportEmployeeProp,
} from "../../types/bulk-import";
import { AppButton } from "components/button/AppButton";
import {
  TBulkEmployeeImportError,
  useValidateBulkEmployeeImportData,
} from "../../hooks/bulkImport/useValidateBulkEmployeeImportData";
import { openNotification } from "utils/notifications";
import { confirmActionSvg } from "assets/images";
import { Skeleton } from "antd";
import FramerAccordian from "components/accordian/FramerAccordian";

interface IProps {
  handleNext: () => void;
  handlePrev: () => void;
  dataToBeSubmitted: TBulkImportEmployeeProp[];
  handleDataToBeSubmitted: (data: TBulkImportEmployeeProp[]) => void;
  sections: TBulkEmployeeImportMappingSection[];
}
const EmployeeDataVerification: React.FC<IProps> = ({
  handleNext,
  handlePrev,
  handleDataToBeSubmitted,
  dataToBeSubmitted,
  sections,
}) => {
  const [errors, setErrors] = useState<TBulkEmployeeImportError[]>([]);
  const { mutate, isLoading } = useValidateBulkEmployeeImportData();
  const handleVerification = () => {
    mutate(
      {
        dataToBeSubmitted,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res) => {
          handleDataToBeSubmitted(res.employees);
          setErrors(res.errors);
          openNotification({
            state: res.isDataValid === false ? "error" : "success",
            title:
              res.isDataValid === false
                ? "Error Occured"
                : "Successful Data Import",
            description: res.message,
            duration: 2,
          });
          if (res.isDataValid) {
            handleNext();
          }
        },
      }
    );
  };
  return (
    <div>
      {errors.length === 0 && isLoading === false ? (
        <VerificationCallToAction handleVerification={handleVerification} />
      ) : (
        <ErrorLister errors={errors} sections={sections} loading={isLoading} />
      )}
      <div className="flex flex-row justify-between w-full mt-4">
        <>
          <AppButton
            handleClick={() => {
              setErrors([]);
              handlePrev();
            }}
            label="previous"
          />
        </>

        <>
          <AppButton
            label="Verify"
            handleClick={handleVerification}
            isLoading={isLoading}
            disabled={errors.length > 0}
          />
        </>
      </div>
    </div>
  );
};
const VerificationCallToAction: React.FC<{
  handleVerification: () => void;
}> = ({ handleVerification }) => {
  return (
    <>
      <div className="flex flex-col gap-4 items-center">
        <div className="flex justify-center h-[30vh] items-center">
          <img
            src={confirmActionSvg}
            alt="delete"
            className="object-contain h-4/5"
          />
        </div>
        <h4 className="text-center text-base mb-4 ">
          Please click{" "}
          <span
            onClick={handleVerification}
            className="text-caramel underline underline-offset-2 font-bold cursor-pointer"
          >
            {" "}
            verify
          </span>{" "}
          to validate the data imported!
        </h4>
      </div>
    </>
  );
};
const ErrorLister: React.FC<{
  errors: TBulkEmployeeImportError[];
  loading?: boolean;
  sections: TBulkEmployeeImportMappingSection[];
}> = ({ errors, loading = false, sections }) => {
  return (
    <>
      <Skeleton loading={loading} active paragraph={{ rows: 12 }}>
        <div className="flex flex-col gap-4">
          {sections.map((section) => (
            <FramerAccordian
              key={section.key}
              heading={
                <h5 className="text-red-500  text-sm   font-semibold">
                  {section.title} (
                  {
                    errors.filter((item) => item.category === section.key)
                      .length
                  }{" "}
                  errors )
                </h5>
              }
            >
              {errors
                .filter((item) => item.category === section.key)
                .map((item, i) => (
                  <div
                    key={i}
                    className="border rounded mt-4 px-3 py-3 cursor-pointer hover:bg-card flex md:justify-between gap-x-5"
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <h5 className="text-xs md:text-sm text-red-400">
                          {item.content}
                        </h5>
                      </div>
                    </div>
                  </div>
                ))}
            </FramerAccordian>
          ))}
        </div>
      </Skeleton>
    </>
  );
};

export default EmployeeDataVerification;
