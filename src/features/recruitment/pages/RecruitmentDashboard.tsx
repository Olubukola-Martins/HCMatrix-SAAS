import React from "react";
import RecruitmentSubNav from "../components/RecruitmentSubNav";
import { WelcomeIntro } from "components/layout/WelcomeIntro";
import { Tabs } from "antd";
import { JobOpeningContainer } from "../features/jobOpenings/JobOpeningContainer";

const RecruitmentDashboard = () => {
  return (
    <>
      <RecruitmentSubNav />

      <div className="Container flex flex-col gap-4">
        <WelcomeIntro
          title="Good morning Esther"
          description=" Welcome on board, here is a breakdown summary of all employee
            Learning and Development."
        />
        <DashboardWrapper />
      </div>
    </>
  );
};

export const DashboardWrapper = () => {
  const tabItems: {
    label: string;
    key: string;
    children: React.ReactNode;
  }[] = [
    {
      label: "Job Openings",
      children: <JobOpeningContainer />,
      key: "Job Openings",
    },
    {
      label: "Applications",
      children: <div />,
      key: "Applications",
    },
    {
      label: "Talent Pool",
      children: <div />,
      key: "Talent Pool",
    },
    {
      label: "Users",
      children: <div />,
      key: "Users",
    },
  ];
  return (
    <div>
      <Tabs items={tabItems} />
    </div>
  );
};

export default RecruitmentDashboard;
