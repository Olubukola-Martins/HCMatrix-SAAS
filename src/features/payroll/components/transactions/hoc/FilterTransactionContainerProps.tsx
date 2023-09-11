import { Form, Select } from "antd";
import React, { ComponentType, useState } from "react";
import { PRIORITIES } from "constants/general";
import { TPriority } from "types/priorities";
import { TTransactionStatus } from "features/payroll/types";
import { TRANSACTION_STATUS_OPTIONS } from "features/payroll/constants";
import { setPriority } from "os";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";

export interface TFilterTransactionContainerProps {
  status: TTransactionStatus[];
  employeeId: number;
}

export function withFilterTransactionContainer<
  T extends TFilterTransactionContainerProps
>(WrappedComponent: ComponentType<T>, data?: { title: string }) {
  // Define the HOC component
  const WithAdditionalProp: React.FC<
    Omit<T, keyof TFilterTransactionContainerProps>
  > = (props) => {
    const [status, setStatus] = useState<TTransactionStatus[]>([]);
    const [employeeId, setEmployeeId] = useState<number>();

    // Add the status to the props passed to the wrapped component
    // Render the wrapped component with the modified props
    return (
      <div>
        {data?.title && <p className="text-lg mb-4">{data?.title}</p>}
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div style={{ minWidth: "150px" }}>
                <FormEmployeeInput
                  Form={Form}
                  handleSelect={(val) => setEmployeeId(val)}
                  control={{ label: "", name: "_" }}
                  noStyle
                />
              </div>
              <div style={{ minWidth: "150px" }}>
                <Select
                  allowClear
                  onClear={() => setStatus([])}
                  value={status}
                  mode="multiple"
                  size="middle"
                  className="w-full"
                  placeholder="Filter by Status"
                  onChange={(val: TTransactionStatus[]) => setStatus(val)}
                  options={TRANSACTION_STATUS_OPTIONS}
                />
              </div>
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
