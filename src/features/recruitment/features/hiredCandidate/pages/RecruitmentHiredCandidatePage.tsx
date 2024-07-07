import { Dropdown, Input, Menu, Select, Table } from "antd";
import { MdMoreVert } from "react-icons/md";
import { mockData } from "../utils/mockData";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { TbFileExport } from "react-icons/tb";
import RecruitmentSubNav from "features/recruitment/components/RecruitmentSubNav";
import React from "react";
import { Candidate } from "../types";
import ViewCandidateModal from "../components/ViewCandidateModal";

const RecruitmentHiredCandidatePage = () => {
  const [viewModalIsOpen, setViewModalIsOpen] = React.useState<boolean>(false);
  const [selectedCandidate, setSelectedCandidate] = React.useState<Candidate>(mockData[0]);
  const { Search } = Input;
  const columns = [
    {
      title: "Candidate Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Job Position",
      dataIndex: "jobPosition",
      key: "jobPosition",
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "Hired Date",
      dataIndex: "hiredDate",
      key: "hiredDate",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Candidate) => (
        <>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  key="1"
                  onClick={() => {
                    setSelectedCandidate((prev) => record);
                    setViewModalIsOpen(true);
                  }}>
                  View
                </Menu.Item>
              </Menu>
            }>
            <MdMoreVert className="cursor-pointer" />
          </Dropdown>
        </>
      ),
    },
  ];

  // const ViewModal = React.useCallback(() => {
  //  return <ViewCandidateModal
  //     candidate={selectedCandidate}
  //     onCancel={() => {
  //       setViewModalIsOpen(false);
  //     }}
  //     visible={viewModalIsOpen}
  //   />;
  // }, [selectedCandidate, viewModalIsOpen]);
  
React.useEffect(() => {
}, [selectedCandidate])

  return (
    <>
      <ViewCandidateModal
        candidate={selectedCandidate}
        onCancel={() => {
          setViewModalIsOpen(false);
        }}
        visible={viewModalIsOpen}
      />
      <RecruitmentSubNav />
      <div className="Container flex flex-col gap-7 md:gap-10">
        <PageIntro title="Hired Candidates" link={appRoutes.recruitmentDashboard} />

        <div className="flex flex-col-reverse gap-2 md:flex-row justify-between items-center">
          <div className="flex flex-row gap-2 md:gap-4">
            <Search placeholder="Search" loading={false} className="w-fit max-w-48" />
            <Select placeholder="Focus Type" options={[{ value: "type1", label: "Type 1" }]} />
            <Select placeholder="Filter Search" options={[{ value: "category1", label: "Category 1" }]} />
          </div>
          <TbFileExport size={32} className="cursor-pointer hover:backdrop-grayscale-0 ml-auto" />
        </div>

        <Table rowSelection={{ type: "checkbox" }} columns={columns} dataSource={mockData} pagination={{ pageSize: 10 }} scroll={{ x: 600 }} />
      </div>
    </>
  );
};

export default RecruitmentHiredCandidatePage;
