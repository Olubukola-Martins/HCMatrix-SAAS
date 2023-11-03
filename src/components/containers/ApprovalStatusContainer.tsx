import { Select } from "antd";
import { APPROVAL_STATUS_OPTIONS } from "constants/statustes";
import { SelectEmployee } from "features/core/employees/components/SelectEmployee";
import { SelectApprovalStatus } from "features/core/workflows/components/SelectApprovalStatus";
import React, { ComponentType, useState } from "react";
import { TApprovalStatus } from "types/statuses";

export interface TApprovalStatusContainerProps {
  status: TApprovalStatus;
  employeeId: number;
}
type TFilterToDisplay = "employee" | "status";
export function withApprovalStatusContainer<
  T extends TApprovalStatusContainerProps
>(
  WrappedComponent: ComponentType<T>,
  data?: { title?: string; filtersToDisplay?: TFilterToDisplay[] }
) {
  // Define the HOC component
  const WithAdditionalProp: React.FC<
    Omit<T, keyof TApprovalStatusContainerProps>
  > = (props) => {
    const [status, setStatus] = useState<TApprovalStatus>();
    const [employeeId, setEmployeeId] = useState<number>();
    const _filtersToDisplay: TFilterToDisplay[] = data?.filtersToDisplay
      ? data.filtersToDisplay
      : ["status"];

    // Add the status to the props passed to the wrapped component
    // Render the wrapped component with the modified props
    return (
      <div>
        {data?.title && <p className="text-lg mb-4">{data?.title}</p>}
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              {_filtersToDisplay.includes("status") && (
                <SelectApprovalStatus
                  value={status}
                  onSelect={(id) => {
                    setStatus(id);
                  }}
                  onClear={() => {
                    setStatus(undefined);
                  }}
                />
              )}
              {_filtersToDisplay.includes("employee") && (
                <SelectEmployee
                  handleSelect={(val) => setEmployeeId(val)}
                  handleClear={() => setEmployeeId(undefined)}
                />
              )}
            </div>
            <div className="flex items-center gap-4">
              <i className="ri-download-2-line text-xl"></i>
              <i className="ri-logout-box-r-line text-xl"></i>
            </div>
          </div>
          <WrappedComponent {...{ ...(props as T), status, employeeId }} />
        </div>
      </div>
    );
  };

  return WithAdditionalProp;
}
