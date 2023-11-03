import { useState } from "react";
import { AddDelegation } from "../components/AddDelegation";
import PageSubHeader from "components/layout/PageSubHeader";
import DelegationsTabs from "../components/DelegationsTabs";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";

const Delegations = () => {
  const [addDelegationModal, setAddDelegationModal] = useState(false);
  const { userPermissions } = useGetUserPermissions();
  return (
    <>
      <AddDelegation
        open={addDelegationModal}
        handleClose={() => setAddDelegationModal(false)}
      />
      <div className="Container">
        <div className="mt-4">
          <PageIntro title="Delegations" link={appRoutes.settings} />

          <PageSubHeader
            description="Manage your delegations"
            actions={[
              {
                name: "Add Delegation",
                handleClick: () => setAddDelegationModal(true),
                hidden: !canUserAccessComponent({
                  userPermissions,

                  requiredPermissions: ["create-delegations"],
                }),
              },
            ]}
          />

          <DelegationsTabs userPermissions={userPermissions} />
        </div>
      </div>
    </>
  );
};

export default Delegations;
