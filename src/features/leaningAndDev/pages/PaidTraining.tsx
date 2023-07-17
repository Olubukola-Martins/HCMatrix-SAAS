import React from "react";
import { LeaningNavbar } from "../components/LeaningNavbar";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { Link } from "react-router-dom";
import Table, { ColumnsType } from "antd/lib/table";

type TPaidTraining = {
  key: React.Key;
  name: string;
  costPerHead: number;
  classSize: number;
  groundTotal: number;
  startDate: string;
  endDate: string;
  status: string;
};

const data: TPaidTraining[] = [
  {
    key: 1,
    name: "Angular js",
    costPerHead: 100,
    classSize: 4,
    groundTotal: 10,
    endDate: "----",
    startDate: "----",
    status: "Pending",
  },
];

export const PaidTraining = () => {
  const columns: ColumnsType<TPaidTraining> = [
    {
      title: "Name",
      dataIndex: "name",
    },

    {
      title: "Cost per head",
      dataIndex: "costPerHead",
    },
    {
      title: "Class size",
      dataIndex: "classSize",
    },
    {
      title: "Ground Total",
      dataIndex: "groundTotal",
    },
    {
      title: "State Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      render: (_, val) => <span className="text-sm text-caramel underline">View</span>,
    },
  ];
  return (
    <>
      <LeaningNavbar active="training" />
      <div className="Container">
        <div className="flex justify-between items-center">
          <PageIntro link={appRoutes.leaningHome} title="Paid Training" />

          <Link to={appRoutes.budgets} className="button">
            Budget
          </Link>
        </div>

        <Table
          className="mt-3"
          columns={columns}
          dataSource={data}
          scroll={{ x: 600 }}
        />
      </div>
    </>
  );
};
