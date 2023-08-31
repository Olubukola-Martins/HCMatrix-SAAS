import React from 'react'
import RecruitmentSubNav from '../components/RecruitmentSubNav'
import { WelcomeIntro } from 'components/layout/WelcomeIntro';
import { DashboardWrapper } from './RecruitmentDashboard';
import CandidateSources from '../features/candidateSourcesReport/CandidateSources';
import CandidateChart from '../features/candidateChartReport/CandidateChart';

const RecruitmentReport = () => {
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
        }
      ];
  }
    return (
      <>
        <RecruitmentSubNav />
        <div className="Container flex flex-col gap-4">
          <WelcomeIntro
            title="Good morning Esther"
            description=" Welcome on board, here is a breakdown summary of all employee
            Learning and Development."
          />
          {/* <ReportTabWrapper /> */}
        </div>
      </>
    );
  }
export default RecruitmentReport;