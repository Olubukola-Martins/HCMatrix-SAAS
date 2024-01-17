import { PageIntro } from "components/layout/PageIntro";
import { HolidaysContainer } from "../components/HolidaysContainer";
import { appRoutes } from "config/router/paths";

const DocumentsPage = () => {
  return (
    <>
      <div className="Container ">
        <PageIntro title="Holidays" link={appRoutes.settings} />
        <HolidaysContainer />
      </div>
    </>
  );
};

export default DocumentsPage;
