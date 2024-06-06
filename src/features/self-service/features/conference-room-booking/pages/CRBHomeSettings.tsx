import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import CRBSettingsAccordian from "../components/CRBSettingsAccordian";
import { appRoutes } from "config/router/paths";
import { PageIntro } from "components/layout/PageIntro";

export const CRBHomeSettings = () => {
  return (
    <>
      <SelfServiceSubNav />

      <div>
        <div className="Container">
          <PageIntro
            title="Conference Room Settings"
            link={appRoutes.conferenceRoomBooking}
          />
          <CRBSettingsAccordian />
        </div>
      </div>
    </>
  );
};
