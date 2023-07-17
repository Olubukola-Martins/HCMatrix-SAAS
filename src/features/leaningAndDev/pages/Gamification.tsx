import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { LeaningNavbar } from "../components/LeaningNavbar";

export const Gamification = () => {
  return (
    <>
      <LeaningNavbar active="gamification" />
      <div className="Container">
        <PageIntro link={appRoutes.leaningHome} title="Gamification" />
      </div>
    </>
  );
};
