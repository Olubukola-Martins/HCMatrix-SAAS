import { Progress, TableColumnsType } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import React from "react";

interface DataType {
  key: React.Key;
  reviewer: string;
  financial: number;
  customer: number;
  business: number;
  learning: number;
}

interface ExpandedDataType {
  comment: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Reviewer",
    dataIndex: "reviewer",
  },
  {
    title: "Financial (20%)",
    dataIndex: "financial",
    render: (_, val) => <span>{val.financial}%</span>,
  },
  {
    title: "Customer Service (30%)",
    dataIndex: "customer",
    render: (_, val) => <span>{val.customer}%</span>,
  },
  {
    title: "Business Process (10%)",
    dataIndex: "business",
    render: (_, val) => <span>{val.business}%</span>,
  },
  {
    title: "Leaning (10%)",
    dataIndex: "learning",
    render: (_, val) => <span>{val.learning}%</span>,
  },
];

const data: DataType[] = [
  {
    key: 1,
    reviewer: "Line Manager",
    financial: 5,
    customer: 3,
    business: 10,
    learning: 20,
  },
  {
    key: 2,
    reviewer: "Staff",
    financial: 2,
    customer: 10,
    business: 15,
    learning: 20,
  },
];

export const EvaluationReport = () => {
  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      {
        title: "Comment",
        dataIndex: "comment",
      },
    ];

    const data: ExpandedDataType[] = [
      {
        comment:
          "In publishing and graphic design, Lorem ipsum is a placeholder text.",
      },
    ];

    return <Table columns={columns} dataSource={data} />;
  };
  return (
    <div className="Container">
      <PageIntro
        title="Evaluation Report"
        link={appRoutes.evaluationDetails(1).path}
      />

      <div className="bg-card flex md:items-center flex-col md:flex-row justify-between px-2 md:px-6 rounded font-medium my-4 py-2 text-base">
        <h4>Ruth Godwin - 001</h4>
        <div className="flex items-center gap-3">
          <h4>Weight of Perspective</h4>
          <button className="text-yellow-500 rounded-3xl p-2 bg-yellow-100 font-bold">
            100%
          </button>
        </div>
      </div>
      <div className="flex gap-2 font-bold text-base">
        <div className="rounded-3xl p-2 bg-card">On Track</div>
        <div className="rounded-3xl py-2 px-3 bg-card text-green-700">Q1</div>
      </div>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-center">
        <div className="border-r">
          <Progress
            type="circle"
            percent={30}
            width={200}
            strokeColor="var(--caramel)"
          />
          <p className="text-xl font-medium pt-4">FINANCIAL (20%)</p>
        </div>
        <div className="border-r">
          <Progress
            type="circle"
            percent={5}
            width={200}
            strokeColor="var(--caramel)"
          />
          <p className="text-xl font-medium pt-4">CUSTOMER SERVICE (20%)</p>
        </div>
        <div className="border-r">
          <Progress
            type="circle"
            percent={50}
            width={200}
            strokeColor="var(--caramel)"
          />
          <p className="text-xl font-medium pt-4">
            BUSINESS <br /> PROCESS (15%)
          </p>
        </div>
        <div>
          <Progress
            type="circle"
            percent={10}
            width={200}
            strokeColor="var(--caramel)"
          />
          <p className="text-xl font-medium pt-4">LEARNING (45%)</p>
        </div>
      </div>

      {/* table */}
      <div className="flex items-center justify-between font-medium text-base mt-16 mb-4">
        <h3>Entire Cycle</h3>
        <p>Click on + icon to view comment</p>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
      />
    </div>
  );
};
