import { Select } from "antd";
import React, { ComponentType, useState } from "react";
import { TTaskPriority, TTaskStatus } from "../types";
import { TASK_STATUS_OPTIONS } from "../constants";
import { PRIORITIES } from "constants/general";
import { TPriority } from "types/priorities";

export interface TTaskStatusAndPriorityContainerProps {
  status: TTaskStatus[];
  priority: TTaskPriority[];
}

export function withTaskStatusAndPriorityContainer<
  T extends TTaskStatusAndPriorityContainerProps
>(WrappedComponent: ComponentType<T>, data?: { title: string }) {
  // Define the HOC component
  const WithAdditionalProp: React.FC<
    Omit<T, keyof TTaskStatusAndPriorityContainerProps>
  > = (props) => {
    const [status, setStatus] = useState<TTaskStatus[]>([]);
    const [priority, setPriority] = useState<TTaskPriority[]>([]);

    // Add the status to the props passed to the wrapped component
    // Render the wrapped component with the modified props
    return (
      <div>
        {data?.title && <p className="text-lg mb-4">{data?.title}</p>}
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div style={{ minWidth: "150px" }}>
                <Select
                  allowClear
                  onClear={() => setPriority([])}
                  value={priority}
                  mode="multiple"
                  size="middle"
                  className="w-full"
                  placeholder="Filter by Priority"
                  onChange={(val: TPriority[]) => setPriority(val)}
                  options={PRIORITIES}
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
                  onChange={(val: TTaskStatus[]) => setStatus(val)}
                  options={TASK_STATUS_OPTIONS}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <i className="ri-download-2-line text-xl"></i>
              <i className="ri-logout-box-r-line text-xl"></i>
            </div>
          </div>
          <WrappedComponent {...{ ...(props as T), status, priority }} />
        </div>
      </div>
    );
  };

  return WithAdditionalProp;
}
