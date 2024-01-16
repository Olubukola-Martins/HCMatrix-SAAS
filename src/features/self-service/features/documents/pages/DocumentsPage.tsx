import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import DocumentsContainer from "../components/DocumentsContainer";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";

const DocumentsPage = () => {
  return (
    <>
      <SelfServiceSubNav />
      <div className="Container ">
        <PageIntro title="Files" link={appRoutes.settings} />
        <DocumentsContainer />
      </div>
    </>
  );
};

export default DocumentsPage;
