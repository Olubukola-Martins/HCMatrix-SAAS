import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import React from "react";
import NotFoundContainer from "../components/NotFoundContainer";

const NotFoundPage = () => {
  return (
    <div className="Container">
      <div className="mt-4 flex-col gap-6">
        <PageIntro title="Back" link={appRoutes.home} />
        <NotFoundContainer />
      </div>
    </div>
  );
};

export default NotFoundPage;
