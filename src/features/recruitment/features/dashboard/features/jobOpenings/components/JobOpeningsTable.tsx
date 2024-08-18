import { Dropdown, Menu, MenuProps, Table } from "antd";
import { MdMoreVert } from "react-icons/md";
import { jobOpeningData } from "../utils/mockData";

const JobOpeningsTable = () => {
const menu: MenuProps["items"] = [
  { key: "1", label: "Edit" },
  { key: "2", label: "View" },
  { key: "3", label: "Expired" },
  { key: "4", label: "Delete" },
  { key: "5", label: "Publish Job" },
];

const columns = [
  { title: "Job Opening", dataIndex: "jobOpening", key: "jobOpening" },
  { title: "Candidate", dataIndex: "candidate", key: "candidate" },
  { title: "Hiring Lead", dataIndex: "hiringLead", key: "hiringLead" },
  { title: "Created On", dataIndex: "createdOn", key: "createdOn" },
  { title: "Status", dataIndex: "status", key: "status" },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Dropdown overlay={<Menu items={menu} />}>
        <MdMoreVert className="cursor-pointer" />
      </Dropdown>
    ),
  },
];

return <Table columns={columns} dataSource={jobOpeningData} pagination={{ pageSize: 10 }} scroll={{ x: 600 }} />;};

export default JobOpeningsTable;
