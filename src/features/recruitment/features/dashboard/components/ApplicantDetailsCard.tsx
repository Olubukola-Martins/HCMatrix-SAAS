import { Table } from "antd";
import { getStatusTag, mockData } from "../utils/applicantDetailsHelpers";
import CardWrapper from "./CardWrapper";
import { useState } from "react";

const ApplicantDetailsCard = () => {
  const [viewAll, setviewAll] = useState<boolean>(false);
  const columns = [
    {
      title: "Applicant Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Applicant Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
    },
    {
      title: "Applicant Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string) => getStatusTag(text),
    },
  ];
  return (
    // <CardWrapper>
    //   <div className="flex flex-col justify-between gap-4 ">
    //     <div className="flex flex-col gap-2 md:flex-row justify-between  ">
    //       <p className="font-bold">Applicant Details</p>
    //       <p>Recent Application</p>
    //     </div>

        // {/* table */}
        <Table columns={columns} dataSource={viewAll ? mockData : mockData.slice(0, 5)} pagination={viewAll ? { pageSize: 10 } : false}  scroll={{ x: 700 }} />
    //     <p className={`text-center text-[var(--caramel)] cursor-pointer underline-offset-2 ${viewAll ? "decoration-[var(--caramel)] underline" : ""}`} onClick={() => setviewAll(!viewAll)}>
    //       View {viewAll ? "Less" : "All"}
    //     </p>
    //   </div>
    // </CardWrapper>
  );
};

export default ApplicantDetailsCard;
