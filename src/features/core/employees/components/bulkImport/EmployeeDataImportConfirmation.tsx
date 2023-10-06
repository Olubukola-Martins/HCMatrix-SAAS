import React from "react";
import { TBulkImportEmployeeProp } from "../../types/bulk-import";
import { AppButton } from "components/button/AppButton";

import { openNotification } from "utils/notifications";
import { confirmActionSvg } from "assets/images";

import { useEmployeeBulkUpload } from "../../hooks/useEmployeeBulkUpload";
import { QUERY_KEY_FOR_LIST_OF_EMPLOYEES } from "../../hooks/useFetchEmployees";
import { useQueryClient } from "react-query";

interface IProps {
  handleClose: () => void;
  handlePrev: () => void;
  dataToBeSubmitted: TBulkImportEmployeeProp[];
}
const EmployeeDataImportConfirmation: React.FC<IProps> = ({
  handleClose,
  handlePrev,
  dataToBeSubmitted,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useEmployeeBulkUpload();
  const handleVerification = () => {
    mutate(
      {
        data: dataToBeSubmitted,
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
        onSuccess: (res: any) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });
          handleClose();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_LIST_OF_EMPLOYEES],
            // exact: true,
          });
        },
      }
    );
  };
  return (
    <div>
      <VerificationCallToAction employeeCount={dataToBeSubmitted.length} />

      <div className="flex flex-row justify-between w-full mt-4">
        <>
          <AppButton
            handleClick={() => {
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
          />
        </>
      </div>
    </div>
  );
};
const VerificationCallToAction: React.FC<{
  employeeCount: number;
}> = ({ employeeCount }) => {
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
          Are you sure you want to add/modify {employeeCount} employee records
        </h4>
      </div>
    </>
  );
};

export default EmployeeDataImportConfirmation;
