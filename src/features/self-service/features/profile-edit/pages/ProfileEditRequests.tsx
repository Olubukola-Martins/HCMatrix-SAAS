import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import ProfileEditRequestsContainer from "../components/ProfileEditRequestsContainer";

const ProfileEditRequests = () => {
  return (
    <>
      <SelfServiceSubNav />

      <div className="Container ">
        <PageIntro
          title="Profile Edit Requests"
          link={appRoutes.selfServiceHome}
        />
        <ProfileEditRequestsContainer />
      </div>
    </>
  );
};

export default ProfileEditRequests;
