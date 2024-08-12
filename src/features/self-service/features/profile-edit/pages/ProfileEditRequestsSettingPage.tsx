import { PageIntro } from "components/layout/PageIntro";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import { appRoutes } from "config/router/paths";
import { ProfileEditRequestSetting } from "../components/ProfileEditRequestSetting";

const ProfileEditRequestsSettingPage = () => {
  return (
    <>
      <SelfServiceSubNav />

      <div className="Container ">
        <PageIntro
          title="Profile Edit Request Settings"
          link={appRoutes.selfServiceProfileEdit}
        />
        <ProfileEditRequestSetting />
      </div>
    </>
  );
};

export default ProfileEditRequestsSettingPage;
