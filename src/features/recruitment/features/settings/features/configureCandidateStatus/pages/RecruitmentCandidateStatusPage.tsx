import { RecruitmentSettingsIntro } from "features/recruitment/components/RecruitmentSettingsIntro";
import { RECRUITMENT_CANDIDATE_STATUSES } from "../constants";
import { RecruitmentSettingsSwitchForm } from "../../../components/RecruitmentSettingsSwitchForm";

const RecruitmentCandidateStatusPage = () => {
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <>
      <RecruitmentSettingsIntro
        title="Configure Candidate Status"
        description="Set up your candidate status, by toggling on/off the status your organization want to work with."
      />
      <div className="Container mt-5">
        <div>
          <div className="bg-white rounded md:p-5 p-3">
            <h2 className="p-2 font-medium text-base">Status</h2>
            <div className="bg-mainBg py-4 px-4 rounded">
              {RECRUITMENT_CANDIDATE_STATUSES.map((item) => (
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
    </>
  );
};

export default RecruitmentCandidateStatusPage;
