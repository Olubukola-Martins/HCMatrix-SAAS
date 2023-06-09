import React from "react";
import PageSubHeader from "components/layout/PageSubHeader";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import HandOverTableContainer from "./HandOverTableContainer";

export const HandOverContainer = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-6">
      <PageSubHeader
        description={`You can now request for time-off to travel for work puposes`}
        actions={[
          {
            name: "Hand Over",
            handleClick: () => navigate(appRoutes.newHandOverForm),
          },
        ]}
      />
      <HandOverTableContainer />
    </div>
  );
};
