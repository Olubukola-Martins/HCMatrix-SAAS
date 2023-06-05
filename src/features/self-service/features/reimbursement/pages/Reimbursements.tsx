import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import ReimbursementsContainer from "../components/ReimbursementsContainer";

const Reimbursements = () => {
  return (
    <>
      <SelfServiceSubNav />

      <div className="Container ">
        <PageIntro title="Reimbursements" link={appRoutes.selfServiceHome} />
        <ReimbursementsContainer />
      </div>
    </>
  );
};

export default Reimbursements;
