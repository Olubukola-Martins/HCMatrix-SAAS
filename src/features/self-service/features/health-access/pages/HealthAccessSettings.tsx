import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import { PageIntro } from "components/layout/PageIntro";
import HealthAccessSettingTabs from "../components/settings/HealthAccessSettingTabs";
import { appRoutes } from "config/router/paths";

const HealthAccessSettings = () => {
  return (
    <>
      <SelfServiceSubNav />

      <div>
        <div className="Container">
          <PageIntro
            title="Health Access Setting"
            link={appRoutes.healthAccessHome}
          />
          <HealthAccessSettingTabs />
        </div>
      </div>
    </>
  );
};

export default HealthAccessSettings;
