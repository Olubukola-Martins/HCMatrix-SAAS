import ApplicantDecription from "./JobDetails";
import { Tabs } from "antd";
import {ApplicantDocument} from "./ApplicantDocument";
import ApplicantEmail from "./ApplicantEmail";
import ApplicantRecords from "./ApplicantRecords";
import { CandidateInfo } from "./CandidateInfo";

export const ApplicantTab = () => {
  const tabItems: {
    label: string;
    key: string;
    children: React.ReactNode;
  }[] = [
    {
      label: "Candidate Info",
      children: <CandidateInfo />,
      key: "Candidate Info",
    },
    {
      label: "Document",
      children: <ApplicantDocument />,
      key: "Document",
    },
    {
      label: "Emails",
      children: <ApplicantEmail />,
      key: "Emails",
    },
    {
      label: "Records",
      children: <ApplicantRecords />,
      key: "Records",
    },
  ];
  return (
    <div>
      <Tabs items={tabItems} />
    </div>
  );
};
