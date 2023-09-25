import { DatePicker, Select } from "antd";
import React, { ComponentType, useState } from "react";

import { TLoanRequestStatus } from "../../types";
import { LOAN_STATUS_OPTIONS } from "../../constants";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";

export interface TLoanDateAndStatusContainerProps {
  status: TLoanRequestStatus[];
  date: string;
}

export function withDateAndStatusContainer<
  T extends TLoanDateAndStatusContainerProps
>(WrappedComponent: ComponentType<T>, data?: { title: string }) {
  // Define the HOC component
  const WithAdditionalProp: React.FC<
    Omit<T, keyof TLoanDateAndStatusContainerProps>
  > = (props) => {
    const [status, setStatus] = useState<TLoanRequestStatus[]>([]);
    const [date, setDate] = useState<string>();

    // Add the status to the props passed to the wrapped component
    // Render the wrapped component with the modified props
    return (
      <div>
        {data?.title && <p className="text-lg mb-4">{data?.title}</p>}
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div style={{ minWidth: "150px" }}>
                <DatePicker
                  placeholder="Select Date"
                  allowClear
                  onChange={(val) => setDate(val?.format(DEFAULT_DATE_FORMAT))}
                  format={DEFAULT_DATE_FORMAT}
                />
              </div>
              <div style={{ minWidth: "150px" }}>
                <Select
                  allowClear
                  onClear={() => setStatus([])}
                  value={status}
                  mode="multiple"
                  size="middle"
                  className="w-full capitalize"
                  placeholder="Filter by Status"
                  onChange={(val: TLoanRequestStatus[]) => setStatus(val)}
                  options={LOAN_STATUS_OPTIONS.map((item) => ({
                    ...item,
                    label: <span className="capitalize">{item.label}</span>,
                  }))}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <i className="ri-download-2-line text-xl"></i>
              <i className="ri-logout-box-r-line text-xl"></i>
            </div>
          </div>
          <WrappedComponent {...{ ...(props as T), status, date }} />
        </div>
      </div>
    );
  };

  return WithAdditionalProp;
}
