import React, { useState } from "react";
import { Input } from "antd";
import { ProjectMembersTable } from "./ProjectMembersTable";

interface IProps {
  projectId?: number;
}

export const ProjectMembersTableContainer: React.FC<IProps> = ({
  projectId,
}) => {
  const [search, setSearch] = useState<string>();

  return (
    <div className="flex flex-col gap-4">
      {/* This to contain potential filters here */}
      <div>
        <div className="flex justify-end">
          <Input.Search
            onSearch={(val) => {
              setSearch(val);
            }}
            className="capitalize w-52"
            placeholder="Search members"
            allowClear
          />
        </div>
      </div>
      <ProjectMembersTable search={search} projectId={projectId} />
    </div>
  );
};
