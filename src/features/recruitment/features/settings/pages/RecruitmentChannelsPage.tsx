import { RecruitmentSettingsIntro } from "features/recruitment/components/RecruitmentSettingsIntro";
import { RecruitmentSettingsSwitchForm } from "../components/RecruitmentSettingsSwitchForm";

const candidateSources = [
  {
    label: "LinkedIn (Coming Soon)",
    name: "linkedIn",
  },
];

const RecruitmentChannelsPage = () => {
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <div className="Container mt-5">
      <RecruitmentSettingsIntro
        title="Recruitment Channels"
        description="Integrate more platforms to the system."
      />

      <div>
        <div className="bg-white rounded md:p-5 p-3">
          <h2 className="p-2 font-medium text-base">Sources</h2>
          <div className="bg-mainBg py-4 px-4 rounded">
            {candidateSources.map((item) => (
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

export default RecruitmentChannelsPage;
