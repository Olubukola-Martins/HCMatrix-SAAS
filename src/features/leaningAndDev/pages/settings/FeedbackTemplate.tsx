import { AppButton } from "components/button/AppButton";
import { LeaningSettingsNav } from "features/leaningAndDev/components/settings/LeaningSettingsNav";

export const FeedbackTemplate = () => {
  return (
    <>
      <LeaningSettingsNav active="feedback" />
      <div className="Container">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-medium text-lg pb-1">Feedback Template Settings</h3>
            <p>The score range settings is use to answer these questions.</p>
          </div>
          <AppButton label="Next setting" />
        </div>
      </div>

      <div>
        <div>
          
        </div>
      </div>
    </>
  );
};
