import { AppButton } from "components/button/AppButton";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";

interface AProps {
  title: string;
  description: string;
}

export const AttendanceSettingsIntro = ({ title, description }: AProps) => {
  return (
    <div className="Container">
      <div className="flex items-center justify-between">
        <PageIntro title={title} link={appRoutes.settings} />

        <div className="flex items-center gap-x-4">
          <span className="underline text-caramel cursor-pointer hover:text-accent">
            I will do this later
          </span>
          <AppButton label="Next" />
        </div>
      </div>
      <p className="pt-3 text-sm">{description}</p>
    </div>
  );
};
