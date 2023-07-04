import { PageIntro } from "components/layout/PageIntro";
import { HolidaysContainer } from "../components/HolidaysContainer";

const DocumentsPage = () => {
  return (
    <>
      <div className="Container ">
        <PageIntro title="Holidays" />
        <HolidaysContainer />
      </div>
    </>
  );
};

export default DocumentsPage;
