import { RecruitmentSettingsIntro } from "features/recruitment/components/RecruitmentSettingsIntro";
import { OtherSettingsMenu } from "../components/OtherSettings/OtherSettingsMenu";

export const RecruitementOtherSettings = () => {
  return (
    <div className="Container">
      <RecruitmentSettingsIntro title="Other Settings" description="" />
      <OtherSettingsMenu />

    </div>
  );
};
