import { LeaningNavbar } from "../components/LeaningNavbar";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";

export const Udemy = () => {
  return (
    <>
      <LeaningNavbar active="none-active" />
      <div className="Container">
        <PageIntro link={appRoutes.leaningHome} title="Udemy" />
      </div>
    </>
  );
};
