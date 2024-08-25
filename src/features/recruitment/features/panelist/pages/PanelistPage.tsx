import { PageIntro } from "components/layout/PageIntro";
import { mockEvents, PanelistInfoMockData } from "../utils/data";
import PanelistInfoCard from "../components/panelist/PanelistInfoCard";
import RecruitmentDBCards from "../../dashboard/components/RecruitmentDBCards";
import InviteTimer from "../components/panelist/InviteTimer";
import useCountdownTimer from "../hooks/useCountdownTimer";
import InterviewCalendar from "../components/panelist/InterviewCalendar";
import RejectInviteModal from "../components/panelist/modal/RejectInviteModal";
import { useState } from "react";
import { appRoutes } from "config/router/paths";
import { useNavigate } from "react-router-dom";

const PanelistPage = () => {
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const navigate = useNavigate();
  const { name, department, designation, panelistImg, numberOfCandidates, endDateToAcceptInvite, fullJobDescription } = PanelistInfoMockData;

  const timeLeft = useCountdownTimer(endDateToAcceptInvite);
  return (
    <div className="Container m-2">
      <RejectInviteModal
        visible={rejectModalVisible}
        onCancel={() => {
          setRejectModalVisible(false);
        }}
        onSubmit={() => {
          setRejectModalVisible(false);
        }}
      />
      <PageIntro title="Welcome Ruth" />
      <div className="w-full mt-7 flex flex-col gap-y-6">
        {/* Heading */}
        <div className="flex flex-col-reverse xl:flex-row  gap-5 items-center w-full">
          <PanelistInfoCard name={name} department={department} designation={designation} panelistImg={panelistImg} />
          <div className="flex justify-between flex-col-reverse sm:flex-row gap-3 flex-grow">
            <RecruitmentDBCards count={numberOfCandidates} title="All candidates" link={appRoutes.recruitmentPanelistAllCandidates} />
            <InviteTimer days={timeLeft.days} hours={timeLeft.hours} minutes={timeLeft.minutes} handleAcceptInvite={() => {}} handleRejectInvite={() => setRejectModalVisible(true)} />
          </div>
        </div>
        {/* JD area */}
        <div className="h-[39vh] sm:h-[30vh] overflow-hidden relative">
          <h2 className="font-bold text-lg">Preview the Job Description</h2>
          <div className="text-lg mt-1">
            <p>We are seeking a talented and experienced Lead UI/UX Designer to join our growing fintech startup. As the lead designer, you will be responsible for the overall look, feel, and usability of our auto loan marketplace platform.</p>
            <p className="font-bold text-lg mt-5">Key Responsibilities:</p>
            <ul className="list-disc ml-5">
              <li>Develop and maintain a consistent design language across the platform</li>
              <li>Work closely with our product and engineering teams to ensure that the platform meets the needs and expectations of our users</li>
              <li>Conduct user research and testing to gather insights and iterate on the design of the platform</li>
            </ul>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        </div>
        <p className="text-xs text-caramel decoration-caramel hover:decoration-transparent underline underline-offset-1 cursor-pointer" onClick={() => navigate(appRoutes.recruitmentPanelistFullJobDescription(1).path)}>
          <span>View full job description</span>
          <i className="ri-arrow-right-s-fill text-base mb-1 absolute "></i>
        </p>

        {/* interview calendar */}
        <div className="mt-3">
          <p>Interview calendar for the week</p>

          <div className="mt-5 px-2 py-4 border border-accent/70 rounded-lg">
            <InterviewCalendar events={mockEvents} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelistPage;
