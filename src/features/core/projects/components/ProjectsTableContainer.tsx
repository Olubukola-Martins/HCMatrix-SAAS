import React, { useState } from "react";
import { ProjectsTable } from "./ProjectsTable";
import { TProjectStatus } from "../types";
import { Select } from "antd";
import { PROJECT_STATUS_OPTIONS } from "../constants";

export const ProjectsTableContainer = () => {
  const [status, setStatus] = useState<TProjectStatus>();
  return (
    <div className="flex flex-col gap-4">
      {/* This to contain potential filters here */}
      <div>
        <div>
          <Select
            value={status}
            onSelect={(val: TProjectStatus) => setStatus(val)}
            options={PROJECT_STATUS_OPTIONS}
            className="capitalize w-52"
            placeholder="Select Status"
            allowClear
            onClear={() => setStatus(undefined)}
          />
        </div>
      </div>
      <ProjectsTable status={status} />
    </div>
  );
};
