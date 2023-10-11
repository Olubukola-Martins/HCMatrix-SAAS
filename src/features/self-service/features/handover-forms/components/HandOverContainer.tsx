import React from "react";
import PageSubHeader from "components/layout/PageSubHeader";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import HandOverTableContainer from "./HandOverTableContainer";
import { EntityDetailModal } from "components/entity/EntityDetailModal";

export const HandOverContainer = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* EXAMPLE OF USING REUSABLE entity detail modal */}
      {/* <EntityDetailModal
        open={true}
        handleClose={() => {}}
        title="Entity"
        formFields={[
          {
            label: "Name",
            name: "name",
            render: { value: "James", component: "text" },
          },
          {
            label: "Can User Edit ?",
            name: "allowEdit",
            render: { value: true, component: "switch" },
          },
          {
            label: "Date",
            name: "date",
            render: { value: "9/10/11", component: "text" },
          },
          {
            label: "Duration",
            name: "Duration",
            render: {
              value: ["9/10/2011", "9/10/2013"],
              component: "date-range-picker",
            },
          },
          {
            label: "Documents",
            name: "Documents",
            render: {
              value: [
                { name: "Car Insurance", url: "/" },
                { name: "Car Insurance", url: "/" },
              ],
              component: "url",
            },
          },
        ]}
      /> */}
      <div className="flex flex-col gap-6">
        <PageSubHeader
          description={`You can now manage hand-overs`}
          actions={[
            {
              name: "Hand Over",
              handleClick: () => navigate(appRoutes.newHandOverForm),
            },
          ]}
        />
        <HandOverTableContainer />
      </div>
    </>
  );
};
