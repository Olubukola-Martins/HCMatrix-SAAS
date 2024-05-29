import React from "react";
import { TBulkImportEmployeeProp } from "../../types/bulk-import";
import { AppButton } from "components/button/AppButton";

import { openNotification } from "utils/notifications";
import { confirmActionSvg } from "assets/images";

import { useEmployeeBulkUpload } from "../../hooks/useEmployeeBulkUpload";
import { QUERY_KEY_FOR_LIST_OF_EMPLOYEES } from "../../hooks/useFetchEmployees";
import { useQueryClient } from "react-query";
import { errorFormatter } from "utils/errorHelpers";

interface IProps {
  handleClose: () => void;
  handlePrev: () => void;
  dataToBeSubmitted: TBulkImportEmployeeProp[];
  confirmationMessages: string[];
}
const EmployeeDataImportConfirmation: React.FC<IProps> = ({
  handleClose,
  handlePrev,
  dataToBeSubmitted,
  confirmationMessages,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useEmployeeBulkUpload();
  const handleVerification = () => {
    mutate(
      {
        data: dataToBeSubmitted,
      },
      {
        onError: (_err) => {
          const formattedErr = errorFormatter(_err);
          openNotification({
            state: "error",
            title: formattedErr.message,
            description: formattedErr.errors
              ?.map((err) => `${err.path}: ${err.message}`)
              .join(","),
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
      <VerificationCallToAction
        employeeCount={dataToBeSubmitted.length}
        confirmationMessages={confirmationMessages}
      />

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
            label="Confirm"
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
  confirmationMessages: string[];
}> = ({ employeeCount, confirmationMessages }) => {
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
          Are you sure you want to add {employeeCount} employee records
        </h4>
        {confirmationMessages.map((item, i) => (
          <div
            key={i}
            className="border rounded mt-4 px-3 py-3 cursor-pointer hover:bg-card flex md:justify-between gap-x-5"
          >
            <div className="flex items-center gap-3">
              <div>
                <h5 className="text-xs md:text-sm text-green-400">{item}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EmployeeDataImportConfirmation;
