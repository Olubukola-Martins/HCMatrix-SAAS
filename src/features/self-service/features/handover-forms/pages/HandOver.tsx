import { appRoutes } from "config/router/paths";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import { HandOverContainer } from "../components/HandOverContainer";
import { PageIntro } from "components/layout/PageIntro";

const HandOver = () => {
  return (
    <>
      <SelfServiceSubNav />

      <div className="Container">
        <PageIntro
          title="Exit Hand over Form"
          link={appRoutes.selfServiceHome}
        />
        <HandOverContainer />
      </div>
    </>
  );
};

export default HandOver;
