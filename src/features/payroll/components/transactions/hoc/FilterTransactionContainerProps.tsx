import { Form, Select } from "antd";
import React, { ComponentType, useState } from "react";
import { TTransactionStatus, TTransactionType } from "features/payroll/types";
import {
  TRANSACTION_STATUS_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from "features/payroll/constants";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";

export interface TFilterTransactionContainerProps {
  status: TTransactionStatus[];
  transactionType: TTransactionType[];
  employeeId: number;
}

export function withFilterTransactionContainer<
  T extends TFilterTransactionContainerProps
>(
  WrappedComponent: ComponentType<T>,
  data?: {
    title?: string;
    displayEmployeeFilter?: boolean;
    displayStatusFilter?: boolean;
    displayTransactionTypeFilter?: boolean;
  }
) {
  // Define the HOC component
  const WithAdditionalProp: React.FC<
    Omit<T, keyof TFilterTransactionContainerProps>
  > = (props) => {
    const [status, setStatus] = useState<TTransactionStatus[]>([]);
    const [transactionType, setTransactionType] = useState<TTransactionType[]>(
      []
    );
    const [employeeId, setEmployeeId] = useState<number>();

    // Add the status to the props passed to the wrapped component
    // Render the wrapped component with the modified props
    return (
      <div>
        {data?.title && <p className="text-lg mb-4">{data?.title}</p>}
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              {data?.displayEmployeeFilter && (
                <div style={{ minWidth: "150px" }}>
                  <FormEmployeeInput
                    Form={Form}
                    handleSelect={(val) => setEmployeeId(val)}
                    control={{ label: "", name: "_" }}
                    noStyle
                    handleClear={() => setEmployeeId(undefined)}
                  />
                </div>
              )}
              {data?.displayStatusFilter && (
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
                    options={TRANSACTION_STATUS_OPTIONS.map((item) => ({
                      ...item,
                      label: <span className="capitalize">{item.label}</span>,
                    }))}
                  />
                </div>
              )}
              {data?.displayTransactionTypeFilter && (
                <div style={{ minWidth: "150px" }}>
                  <Select
                    allowClear
                    onClear={() => setTransactionType([])}
                    value={transactionType}
                    mode="multiple"
                    size="middle"
                    className="w-full"
                    placeholder="Filter by Type"
                    onChange={(val: TTransactionType[]) =>
                      setTransactionType(val)
                    }
                    options={TRANSACTION_TYPE_OPTIONS.map((item) => ({
                      ...item,
                      label: <span className="capitalize">{item.label}</span>,
                    }))}
                  />
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <i className="ri-download-2-line text-xl"></i>
              <i className="ri-logout-box-r-line text-xl"></i>
            </div>
          </div>
          <WrappedComponent
            {...{ ...(props as T), status, employeeId, transactionType }}
          />
        </div>
      </div>
    );
  };

  return WithAdditionalProp;
}
