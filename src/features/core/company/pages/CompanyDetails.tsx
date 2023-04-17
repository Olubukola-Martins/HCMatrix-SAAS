import { PageIntro } from "components/layout/PageIntro";
import CompanyInfoAccordion from "../components/CompanyInfoAccordion";
import CompanyLogoForm from "../components/CompanyLogoForm";
import CompanySettingsAccordion from "../components/CompanySettingsAccordion";

const CompanyDetails = () => {
  return (
    <>
      <div className="Container">
        <PageIntro title="Company Settings" link="/settings" />
        {/* img container */}
        <div className="img-container flex justify-center mb-20">
          {/* <img src={Logo} alt= 'logo' className="h-28"/> */}
          <CompanyLogoForm />
        </div>
        <div className="accordions grid grid-cols-1 lg:grid-cols-1 gap-4">
          {/* accordian 1 */}
          <CompanyInfoAccordion />

          {/* accordian 2 */}
          <CompanySettingsAccordion />
        </div>
      </div>
    </>
  );
};

export default CompanyDetails;
