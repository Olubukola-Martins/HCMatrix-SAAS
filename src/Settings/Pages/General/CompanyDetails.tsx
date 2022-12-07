import DashboardLayout from "../../../Layout/DashboardLayout";
// import Logo from '../Assets/round_company_logo.png'
import CompanyInfoAccordion from "../../Components/General/Company/CompanyInfoAccordion";
import CompanySettingsAccordion from "../../Components/General/Company/CompanySettingsAccordion";

import { Link } from "react-router-dom";
// import { Avatar } from "antd";
// import { EditOutlined } from "@ant-design/icons";
import CompanyLogoForm from "../../Components/General/Company/CompanyLogoForm";
import { PageIntro } from "../../../Layout/Components/PageIntro";

const CompanyDetails = () => {
  return (
    <DashboardLayout>
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
    </DashboardLayout>
  );
};

export default CompanyDetails;
