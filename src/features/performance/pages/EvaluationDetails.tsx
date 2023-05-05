import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { Dropdown, Menu, Table } from "antd";


interface DataType {
  name: string;
  employeeId: number | string;
  department: string;
  jobRole: string;
  score: number;
  evaluatedBy: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Employee ID",
    dataIndex: "employeeId",
  },
  {
    title: "Department",
    dataIndex: "department",
  },
  {
    title: "Job Role",
    dataIndex: "jobRole",
  },
  {
    title: "Score",
    dataIndex: "score",
    render: (_, val) => <span>{val.score}%</span>,
  },
  {
    title: "Evaluated By",
    dataIndex: "evaluatedBy",
  },
  {
    title: "Action",
    render: () => (
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key="1">Download</Menu.Item>
            <Menu.Item key="2"><Link to={appRoutes.evaluationReport(1).path}>View Details</Link></Menu.Item>
          </Menu>
        }
        trigger={["click"]}
      >
        <i className="ri-more-2-fill text-xl cursor-pointer"></i>
      </Dropdown>
    ),
  },
];

const data: DataType[] = [
  {
    name: "James Brown",
    department: "Dev",
    employeeId: 1111,
    evaluatedBy: "Esther",
    jobRole: "Frontend",
    score: 20,
  },
];

export const EvaluationDetails = () => {
  return (
    <div className="Container">
      <div className="flex justify-between items-center">
        <PageIntro title="Q1 Template" link={appRoutes.balanceScorecard} />
        <Link className="button" to={appRoutes.performanceReport}>
          View Overall Report
        </Link>
      </div>
      <p className="text-base pt-3">
        Click on the eye icon to view individual evaluation report, or view
        overall report.
      </p>
      <div className="flex items-center gap-2 mt-6">
        <h4 className="font-medium text-lg">October 2022 - December 2022</h4>
        <select name="" id="" className="border rounded p-2">
          <option value="">December</option>
        </select>
      </div>

      {/* table */}
      <Table columns={columns} dataSource={data} className="mt-5" />
    </div>
  );
};
