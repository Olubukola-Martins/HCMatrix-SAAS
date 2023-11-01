import { PageIntro } from "components/layout/PageIntro";
import { useState } from "react";
import { AddRole } from "../components/AddRole";
import RolesViewContainer from "../components/RolesViewContainer";
import { appRoutes } from "config/router/paths";
import PageSubHeader from "components/layout/PageSubHeader";

const Roles = () => {
  const [addRoleModal, setAddRoleModal] = useState(false);
  return (
    <>
      <AddRole open={addRoleModal} handleClose={() => setAddRoleModal(false)} />
      <div className="Container">
        {
          <div className="mt-4">
            <PageIntro title="Roles" link={appRoutes.settings} />
            <PageSubHeader
              description="Manage all the roles and permissions
            in your organization."
              actions={[
                {
                  name: "Add Department",
                  handleClick: () => setAddRoleModal(true),
                },
              ]}
            />
            <RolesViewContainer />
          </div>
        }
      </div>
    </>
  );
};

export default Roles;
