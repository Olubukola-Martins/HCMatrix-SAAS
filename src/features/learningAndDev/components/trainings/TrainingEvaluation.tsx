import { Radio, Table } from "antd";
import React from "react";

const columns = [
  {
    title: "Comment",
    dataIndex: "comment",
  },

  {
    title: "Unsatisfactory",
    dataIndex: "unsatisfactory",
    render: () => <Radio />,
  },
  {
    title: "Poor",
    dataIndex: "poor",
    render: () => <Radio />,
  },
  {
    title: "Average",
    dataIndex: "average",
    render: () => <Radio />,
  },
  {
    title: "Good",
    dataIndex: "good",
    render: () => <Radio />,
  },
  {
    title: "Excellent",
    dataIndex: "excellent",
    render: () => <Radio />,
  },
  {
    title: "Score",
    dataIndex: "score",
  },
];

const data = [
  {
    key: 1,
    comment: "The course content supports the leaning objectives",
    unsatisfactory: "",
    poor: "",
    average: "",
    good: "",
    excellent: "",
    score: "40%",
  },
  {
    key: 2,
    comment: "The course length was sufficient to deliver the content",
    unsatisfactory: "",
    poor: "",
    average: "",
    good: "",
    excellent: "",
    score: "40%",
  },
  {
    key: 3,
    comment:
      "The course design (e.g., materials and learning activities) encouraged my participation in the class",
    unsatisfactory: "",
    poor: "",
    average: "",
    good: "",
    excellent: "",
    score: "40%",
  },
  {
    key: 4,
    comment:
      "The course provided opportunities to practice and reinforce what was taught.",
    unsatisfactory: "",
    poor: "",
    average: "",
    good: "",
    excellent: "",
    score: "40%",
  },
  {
    key: 5,
    comment:
      "The course information was at an appropriate level to understand the learning objectives.",
    unsatisfactory: "",
    poor: "",
    average: "",
    good: "",
    excellent: "",
    score: "40%",
  },
];

export const TrainingEvaluation = () => {
  return (
    <div>
      <Table
        className="mt-3"
        columns={columns}
        dataSource={data}
        scroll={{ x: 600 }}
        bordered
      />
    </div>
  );
};
