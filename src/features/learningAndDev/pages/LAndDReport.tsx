import { LeaningNavbar } from "../components/LeaningNavbar";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { Tabs } from "antd";
import { UserReport } from "../components/Report/UserReport";
import { TestReport } from "../components/Report/TestReport";
import { AssignmentReport } from "../components/Report/AssignmentReport";

export const LAndDReport = () => {
  return (
    <>
      <LeaningNavbar active="reports" />
      <div className="Container">
        <PageIntro link={appRoutes.learningHome} title="Report" />
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: "Overview",
              children: <h4>Overview</h4>,
            },
            {
              key: "2",
              label: "User Report",
              children: <UserReport/>,
            },
            {
              key: "3",
              label: "Test Report",
              children: <TestReport/>,
            },
            {
              key: "4",
              label: "Assignment Report",
              children: <AssignmentReport/>,
            },
            {
              key: "5",
              label: "Customer Report",
              children: <h4>Customer Report</h4>,
            },
          ]}
        />
      </div>
    </>
  );
};
