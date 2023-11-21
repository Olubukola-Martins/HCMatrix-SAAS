import { PageIntro } from "components/layout/PageIntro";
import PageSubHeader from "components/layout/PageSubHeader";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";
import { appRoutes } from "config/router/paths";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AddHospital } from "../components/settings/hospital/AddHospital";
import HealthAccessHomeTabs from "../components/home/HealthAccessHomeTabs";

type TAction = "add-hospital";
const HealthAccessHome = () => {
  const { userPermissions } = useGetUserPermissions();
  const [action, setAction] = React.useState<TAction>();
  const navigate = useNavigate();
  return (
    <>
      <SelfServiceSubNav />
      <AddHospital
        handleClose={() => setAction(undefined)}
        open={action === "add-hospital"}
      />

      <div className="Container">
        <div className="flex flex-col gap-6">
          <div>
            <PageIntro title="Health Access" link={appRoutes.selfServiceHome} />
            <PageSubHeader
              hideBackground
              description={``}
              actions={[
                {
                  name: "Add Hospital",
                  handleClick: () => setAction("add-hospital"),
                  btnVariant: "default",
                },

                {
                  name: "Settings",
                  handleClick: () => navigate(appRoutes.healthAccessSettings),
                  btnVariant: "transparent",
                  hidden: !canUserAccessComponent({
                    userPermissions,
                    requiredPermissions: ["manage-loan-settings"],
                  }),
                },
              ]}
            />
            <HealthAccessHomeTabs />
          </div>
        </div>
      </div>
    </>
  );
};

export default HealthAccessHome;
