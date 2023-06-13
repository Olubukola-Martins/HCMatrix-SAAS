import { Select } from "antd";
import { APPROVAL_STATUS_OPTIONS } from "constants/statustes";
import React, { ComponentType, useState } from "react";
import { TApprovalStatus } from "types/statuses";

export interface TApprovalStatusContainerProps {
  status: TApprovalStatus;
}

export function withApprovalStatusContainer<
  T extends TApprovalStatusContainerProps
>(WrappedComponent: ComponentType<T>, data?: { title: string }) {
  // Define the HOC component
  const WithAdditionalProp: React.FC<
    Omit<T, keyof TApprovalStatusContainerProps>
  > = (props) => {
    const [status, setStatus] = useState<TApprovalStatus>();

    // Add the status to the props passed to the wrapped component
    // Render the wrapped component with the modified props
    return (
      <div>
        {data?.title && <p className="text-lg mb-4">{data?.title}</p>}
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <Select
              allowClear
              onClear={() => setStatus(undefined)}
              value={status}
              size="middle"
              className="w-32"
              placeholder="Filter"
              onSelect={(val: TApprovalStatus) => setStatus(val)}
              options={APPROVAL_STATUS_OPTIONS}
            />
            <div className="flex items-center gap-4">
              <i className="ri-download-2-line text-xl"></i>
              <i className="ri-logout-box-r-line text-xl"></i>
            </div>
          </div>
          <WrappedComponent {...{ ...(props as T), status }} />
        </div>
      </div>
    );
  };

  return WithAdditionalProp;
}
