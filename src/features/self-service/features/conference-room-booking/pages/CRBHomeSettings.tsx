import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import CRBHeader from "../components/CRBHeader";
import CRBSettingsAccordian from "../components/CRBSettingsAccordian";
import { appRoutes } from "config/router/paths";

export const CRBHomeSettings = () => {
  return (
    <>
      <SelfServiceSubNav />

      <div>
        <div className="Container">
          <CRBHeader
            title="Conference Room Settings"
            backLink={appRoutes.conferenceRoomBooking}
          />
          <CRBSettingsAccordian />
        </div>
      </div>
    </>
  );
};
