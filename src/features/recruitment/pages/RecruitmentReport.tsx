import React from "react";
import RecruitmentSubNav from "../components/RecruitmentSubNav";
import { WelcomeIntro } from "components/layout/WelcomeIntro";
import CandidateSources from "../features/candidateSourcesReport/CandidateSources";
import CandidateChart from "../features/candidateChartReport/CandidateChart";
import { DatePicker, Form, Select, Tabs } from "antd";
import { AppButton } from "components/button/AppButton";
import form from "antd/lib/form";

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
  const handleSubmit = (value: any) => {
    console.log("Values:", value)
  }

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
        <Form
          className="w-fit "
          onFinish={handleSubmit}
          name="candidatesReportFilter"
        >
          <div className="flex flex-row gap-4 max-sm:gap-0  max-sm:flex-col">
            <Form.Item name="dateRange">
              <RangePicker className="w-fit"/>
            </Form.Item>

            <div className="flex flex-row gap-4  max-sm:gap-2">
              <Form.Item name="sources">
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
              </Form.Item>
              <Form.Item  name="jobOpening">
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
              </Form.Item>
            </div>

          </div>
            <AppButton type="submit" label="Apply Filter" />
        </Form>


        <ReportTabWrapper />
      </div>
    </>
  );
};
export default RecruitmentReport;
