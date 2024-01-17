import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import LeaveSettingsAccordians from "../components/LeaveSettingsAccordians";
import LeaveSettingsHeader from "../components/LeaveSettingsHeader";

const LeaveSettings = () => {
  return (
    <>
      <SelfServiceSubNav />

      <div>
        <div className="Container">
          {/* header */}
          <LeaveSettingsHeader />

          {<LeaveSettingsAccordians />}
        </div>
      </div>
    </>
  );
};

export default LeaveSettings;
