import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import LoanSettings from "../components/settings/LoanSettings";

const LoanPolicies = () => {
  return (
    <>
      <SelfServiceSubNav />
      <div className="Container">
        <PageIntro title="Loan Settings" link={appRoutes.loans} />

        <LoanSettings />
      </div>
    </>
  );
};

export default LoanPolicies;
