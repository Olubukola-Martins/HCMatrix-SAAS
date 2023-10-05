import React from "react";
import { TBulkImportEmployeeProp } from "../../types/bulk-import";
import { AppButton } from "components/button/AppButton";

interface IProps {
  handleNext: () => void;
  handlePrev: () => void;
  dataToBeSubmitted: TBulkImportEmployeeProp[];
}
const EmployeeDataVerification: React.FC<IProps> = ({
  handleNext,
  handlePrev,
}) => {
  return (
    <div>
      EmployeeDataVerification
      <div className="flex flex-row justify-between w-full mt-4">
        <>
          <AppButton handleClick={handlePrev} label="previous" />
        </>

        <>
          <AppButton label="Verify" handleClick={handleNext} />
        </>
      </div>
    </div>
  );
};

export default EmployeeDataVerification;
