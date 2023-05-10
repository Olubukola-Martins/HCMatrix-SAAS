import CRBHeader from "../components/CRBHeader";
import CRBSettingsAccordian from "../components/CRBSettingsAccordian";

export const CRBHomeSettings = () => {
  return (
    <>
      {/* <SelfServiceSubNav /> */}

      <div>
        <div className="Container">
          <CRBHeader title="Meeting Room Settings" />
          <CRBSettingsAccordian />
          <div className="mt-12 flex flex-col gap-4"></div>
        </div>
      </div>
    </>
  );
};
