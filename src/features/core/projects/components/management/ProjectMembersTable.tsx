import React, { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { Button, Table } from "antd";
import moment from "moment";
import { TProjectMember } from "../../types";
import { appRoutes } from "config/router/paths";
import { Link } from "react-router-dom";
import { useGetEmployeesInProject } from "../../hooks/management/useGetEmployeesInProject";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { DeleteFilled } from "@ant-design/icons";
import { RemoveProjectMember } from "./RemoveProjectMember";

interface IProps {
  search?: string;
  projectId?: number;
}
type TAction = "delete";
export const ProjectMembersTable: React.FC<IProps> = ({
  search,
  projectId,
}) => {
  const [action, setAction] = useState<TAction>();
  const [member, setMember] = useState<TProjectMember>();
  const handleAction = (props: { action: TAction; member: TProjectMember }) => {
    const { action, member } = props;
    setAction(action);
    setMember(member);
  };
  const clearAction = () => {
    setAction(undefined);
    setMember(undefined);
  };

  const { pagination, onChange } = usePagination({
    pageSize: 4,
  });
  const { data, isFetching } = useGetEmployeesInProject({
    projectId,
    data: {
      searchParams: {
        name: search,
      },
      pagination: {
        limit: pagination.limit,
        offset: pagination.offset,
      },
    },
  });

  const columns: ColumnsType<TProjectMember> = [
    {
      title: "Name",
      dataIndex: "desc",
      key: "desc",
      render: (_, item) => (
        <Link to={appRoutes.singleProject(item.id).path}>
          <span className="capitalize">
            {getEmployeeFullName(item.employee)}
          </span>
        </Link>
      ),
    },

    {
      title: "Added at",
      dataIndex: "startD",
      key: "startD",
      render: (_, item) => (
        <span>{moment(item.createdAt).format("YYYY-MM-DD")} </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "act",
      key: "act",
      render: (_, item) => (
        <div className="flex gap-4">
          <Button
            icon={<DeleteFilled />}
            type="text"
            onClick={() => handleAction({ action: "delete", member: item })}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      {member && (
        <RemoveProjectMember
          member={member}
          handleClose={clearAction}
          open={action === "delete"}
        />
      )}
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-300 italic">
          {data?.total} participants in total
        </span>
        <Table
          size="small"
          dataSource={data?.data.map((item) => ({ ...item, key: item.id }))}
          loading={isFetching}
          columns={columns}
          pagination={{ ...pagination, total: data?.total }}
          onChange={onChange}
        />
      </div>
    </>
  );
};
