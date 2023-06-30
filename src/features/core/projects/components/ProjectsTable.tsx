import React, { useState } from "react";
import { MoreOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { Button, Dropdown, Menu, Table } from "antd";
import { useApiAuth } from "hooks/useApiAuth";
import moment from "moment";

import { TProject } from "../types";
import { ProjectDetails } from "./ProjectDetails";

export const ProjectsTable: React.FC = () => {
  const [requestId, setRequestId] = useState<number>();
  const { companyId, token } = useApiAuth();
  const { pagination, onChange } = usePagination({
    pageSize: 4,
  });
  //   const { data, isFetching } = useGeTJobRequisitions({
  //     companyId,
  //     token,
  //     status,
  //     pagination: {
  //       limit: pagination.limit,
  //       offset: pagination.offset,
  //     },
  //   });

  const columns: ColumnsType<TProject> = [
    {
      title: "Name",
      dataIndex: "desc",
      key: "desc",
      render: (_, item) => <span className="capitalize">{"02/05/2020"} </span>,
    },

    {
      title: "Participant Count",
      dataIndex: "emptype",
      key: "emptype",
      render: (_, item) => <span>{item.participantCount} </span>,
    },
    {
      title: "Project Status",
      dataIndex: "emptype",
      key: "emptype",
      render: (_, item) => <span>{item.status} </span>,
    },

    {
      title: "Action",
      key: "action",
      render: (_, item) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="3"
                onClick={() => {
                  setRequestId(item.id);
                }}
              >
                View Details
              </Menu.Item>
              <Menu.Item
                key="4"
                onClick={() => {
                  setRequestId(item.id);
                }}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                key="40"
                onClick={() => {
                  setRequestId(item.id);
                }}
              >
                Close Project
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button
            title="Actions"
            icon={<MoreOutlined />}
            type="text"
            // onClick={() => handleEdit(item._id)}
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      {requestId && (
        <ProjectDetails
          open={!!requestId}
          handleClose={() => setRequestId(undefined)}
          id={requestId}
        />
      )}
      <Table
        size="small"
        dataSource={[
          {
            closed: true,
            status: "active",
            description: "",
            id: 1,
            name: "Hc Matrix v3",
            participantCount: 30,
          },
        ]}
        // loading={isFetching}
        columns={columns}
        // pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};
