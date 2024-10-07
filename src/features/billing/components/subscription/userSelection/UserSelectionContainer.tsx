import React, { useState } from "react";
import { boxStyle } from "styles/reused";
import SelectUserHeader from "./SelectUserHeader";
import SelectUserContent from "./SelectUserContent";
import { useAddLicensesToEmployees } from "features/billing/hooks/company/employeeLicense/useAddLicensesToEmployees";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_EMPLOYEE_LICENSE_COUNT_LEFT } from "features/billing/hooks/company/employeeLicense/count/useGetEmployeeLicenseCountLeft";
import { QUERY_KEY_FOR_ALL_EMPLOYEES_WITH_LICENSES } from "features/billing/hooks/company/employeeLicense/useGetAllEmployeesWithLicense";

const UserSelectionContainer = () => {
  const queryClient = useQueryClient();

  const [details, setDetails] = useState<{
    licenseType: "licensed" | "unlicensed";
    departmentId?: number;
    employeeName?: string;
  }>({
    licenseType: "licensed",
  });
  const { mutate, isLoading } = useAddLicensesToEmployees();

  const handleSubmit = (data: number[]) => {
    mutate(
      {
        data: data.map((item) => ({
          employeeId: item,
          licenseType: details.licenseType,
        })),
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

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_ALL_EMPLOYEES_WITH_LICENSES],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_EMPLOYEE_LICENSE_COUNT_LEFT],
            // exact: true,
          });
        },
      }
    );
  };
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-light">
        N:B The users not selected for either license or unlicensed will
        automatically be deactivated from the system. Only deactivated employees
        can become either licensed or unlicensed
      </p>
      <div className={`${boxStyle} text-sm bg-card flex flex-col gap-6`}>
        <SelectUserHeader
          onSelectLicenseType={(licenseType) =>
            setDetails((prev) => ({ ...prev, licenseType }))
          }
          licenseType={details.licenseType}
          onSearchEmployee={(employeeName) =>
            setDetails((prev) => ({ ...prev, employeeName }))
          }
          onSelectDepartment={(departmentId) =>
            setDetails((prev) => ({ ...prev, departmentId }))
          }
          onClearDepartment={() =>
            setDetails((prev) => ({ ...prev, departmentId: undefined }))
          }
        />
        <SelectUserContent
          departmentId={details.departmentId}
          employeeName={details.employeeName}
          onHandleLisence={{ fn: handleSubmit, isLoading }}
          licenseType={details.licenseType}
        />
      </div>
    </div>
  );
};

export default UserSelectionContainer;
