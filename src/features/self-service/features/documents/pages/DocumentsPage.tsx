import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import DocumentsContainer from "../components/DocumentsContainer";
import { PageIntro } from "components/layout/PageIntro";

const DocumentsPage = () => {
  return (
    <>
      <SelfServiceSubNav />
      <div className="Container ">
        <PageIntro title="Files" />
        <DocumentsContainer />
      </div>
    </>
  );
};

export default DocumentsPage;
