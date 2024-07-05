import { RecruitmentSettingsIntro } from "features/recruitment/components/RecruitmentSettingsIntro";
import { RecruitmentSettingsSwitchForm } from "../components/RecruitmentSettingsSwitchForm";

const candidateStatus = [
  {
    label: "Applied",
    name: "applied",
  },
  {
    label: "Interview",
    name: "interview",
  },
  {
    label: "Hired",
    name: "hired",
  },
  {
    label: "Not Hired",
    name: "notHired",
  },
  {
    label: "Offer Sent",
    name: "offerSent",
  },
  {
    label: "Offer Rejected",
    name: "offerRejected",
  },
  {
    label: "Offer Accepted",
    name: "offerAccepted",
  },
];

const RecruitmentCandidateStatusPage = () => {
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <div className="Container mt-5">
      <RecruitmentSettingsIntro
        title="Configure Candidate Status"
        description="Set up your candidate status, by toggling on/off the status your organization want to work with."
      />

      <div>
        <div className="bg-white rounded md:p-5 p-3">
          <h2 className="p-2 font-medium text-base">Status</h2>
          <div className="bg-mainBg py-4 px-4 rounded">
            {candidateStatus.map((item) => (
              <RecruitmentSettingsSwitchForm
                label={item.label}
                name={item.name}
                onChange={onChange}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentCandidateStatusPage;
