import RecruitmentSubNav from "features/recruitment/components/RecruitmentSubNav";
import { ApplicantSettingsIntro } from "../../components/ApplicantSettingsIntro";
import CandidateImg from "../../assets/candidate.jpeg";
import { Select } from "antd";
import "../../assets/style.css";
import { ApplicantTab } from "../../components/ApplicantTab";

const ApplicantInfo = () => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <RecruitmentSubNav />
      <ApplicantSettingsIntro
        title="Back to Candidate"
        description=""
        nextLink=""
      />
      <div className="Container mt-5">
        <div className=" bg-card lg:grid lg:grid-cols-2 gap-4 items-center justify-center md:p-5 p-3 ">
          <div className="bg-mainBg mb-4 md:mb-3 lg:mb-0  flex flex-col p-4 rounded md:flex-row gap-4 items-center">
            <img src={CandidateImg} className="h-20 rounded-full w-20" />
            <div>
              <p className="pb-2">Candidate Name --:-- Adeshina Samuel</p>
              <p className="pb-2">Email --:-- Samuel@gmail.com</p>
              <p className="pb-2">Phone Number --:-- +234705243521</p>
            </div>
          </div>
          <div className="bg-mainBg p-4 rounded">
            <p className="pb-2">Address --:-- Chales okorocha street</p>
            <p className="pb-2">City --:-- Lagos</p>
            <p className="pb-2">State/Country --:-- Lagos/Nigeria</p>
          </div>
        </div>
        <div className="flex justify-end items-center gap-4 my-5">
          <Select
            defaultValue="Settings"
            className="w-44 border rounded-md hover:border-none important-hover text-accent"
            onChange={handleChange}
            options={[
              {
                value: "new",
                label: "New",
              },
              {
                value: "reviewed",
                label: "Reviewed",
              },
              {
                value: "schedulePhoneScreen",
                label: "Schedule Phone Screen",
              },
              {
                value: "phoneScreened",
                label: "Phone Screened",
              },
              {
                value: "scheduledInterview",
                label: "Scheduled Interview",
              },
              {
                value: "interviewed",
                label: "Interviewed",
              },
              {
                value: "putOnHold",
                label: "Put on Hold",
              },
              {
                value: "checkingReferences",
                label: "Checking References",
              },
              {
                value: "notAFit",
                label: "Not a Fit",
              },
              {
                value: "declinedOffer",
                label: "Declined Offer",
              },
              {
                value: "notQualified",
                label: "Not Qualified",
              },
              {
                value: "overQualified",
                label: "Over Qualified",
              },
              {
                value: "hiredElsewhere",
                label: "Hired Elsewhere",
              },
              {
                value: "createJobOffer",
                label: "Create Job Offer",
              },
              {
                value: "hire",
                label: "Hire",
              },
            ]}
          />
          <button className="flex items-center justify-center gap-2 border rounded bg-none border-[#686868] py-[4px] px-[8px] h-[32px] md:w-28">
            Comment
            <i className="ri-chat-3-line hidden md:block"></i>
          </button>
          <Select
            defaultValue="reviewed"
            className="w-44 border rounded-md hover:border-none important-hover text-accent"
            onChange={handleChange}
            options={[
              {
                value: "editCandidateInfo",
                label: "Edit Candidate Info",
              },
              {
                value: "editTalentPool",
                label: "Edit Talent Pool",
              },
              {
                value: "moveCandidate",
                label: "Move Candidate",
              },
              {
                value: "deleteCandidate",
                label: "Delete Candidate",
              },
            ]}
          />
        </div>
        <ApplicantTab />
      </div>
    </>
  );
};

export default ApplicantInfo;
