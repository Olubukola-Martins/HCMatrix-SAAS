import React from "react";
import RecruitmentSubNav from "../components/RecruitmentSubNav";
import { WelcomeIntro } from "components/layout/WelcomeIntro";
import CandidateSources from "../features/candidateSourcesReport/CandidateSources";
import CandidateChart from "../features/candidateChartReport/CandidateChart";
import { DatePicker, Select, Tabs } from "antd";
import { AppButton } from "components/button/AppButton";

// recruitment report tab
export const ReportTabWrapper = () => {
  const tabItems: {
    label: string;
    key: string;
    children: React.ReactNode;
  }[] = [
    {
      label: "Candidate Sources",
      children: <CandidateSources />,
      key: "candidateSources",
    },
    {
      label: "Candidate Chart",
      children: <CandidateChart />,
      key: "candidateChart",
    },
  ];
  return (
    <div>
      <Tabs items={tabItems} />
    </div>
  );
};

const RecruitmentReport = () => {
      const { RangePicker } = DatePicker;

  return (
    <>
      <RecruitmentSubNav />
      <div className="Container flex flex-col gap-4">
        <div className="flex flex-row gap-2 justify-between">
            <WelcomeIntro
              title="Good morning Esther"
              description=" Welcome on board, here is a breakdown summary of all employee
            Learning and Development."
            />
          <div>
            <AppButton label="Export" />
          </div>
        </div>
        <div className="flex flex-row gap-4 max-sm:flex-col">
          <RangePicker className="w-72" />

          <div className="flex flex-row gap-4">
            <Select
              className="w-40"
              defaultValue="allSources"
              placeholder="Please select"
              dropdownMatchSelectWidth={false}
              // onChange={handleChange}
              options={[
                {
                  value: "allSources",
                  label: "All Sources",
                },
                {
                  value: "linkedIn",
                  label: "LinkedIn",
                },
                {
                  value: "others",
                  label: "Others",
                },
              ]}
            />
            <Select
              className="w-40"
              defaultValue="allJobOpenings"
              placeholder="Please select"
              dropdownMatchSelectWidth={false}
              // onChange={handleChange}
              options={[
                {
                  value: "allJobOpenings",
                  label: "All Job Openings",
                },
                {
                  value: "iTSecurityEngineer",
                  label: "IT Security Engineer",
                },
                {
                  value: "customerServiceAdvocate",
                  label: "Customer Service Advocate",
                },
                {
                  value: "softwareEngineer",
                  label: "Software Engineer",
                },
                {
                  value: "accountExecutive",
                  label: "Account Executive",
                },
                {
                  value: "videography",
                  label: "Videography",
                },
              ]}
            />
          </div>
        </div>
        <ReportTabWrapper />

      </div>
    </>
  );
};
export default RecruitmentReport;
