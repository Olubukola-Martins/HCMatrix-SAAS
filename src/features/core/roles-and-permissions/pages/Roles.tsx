import { PageIntro } from "components/layout/PageIntro";
import { useState } from "react";
import { AddRole } from "../components/AddRole";
import RolesViewContainer from "../components/RolesViewContainer";

const Roles = () => {
  const [addRoleModal, setAddRoleModal] = useState(false);
  return (
    <>
      <div className="Container">
        <AddRole
          open={addRoleModal}
          handleClose={() => setAddRoleModal(false)}
        />
        {
          <div className="mt-4">
            <PageIntro title="Roles" link="/settings" />
            <div className="flex justify-end">
              <button className="button" onClick={() => setAddRoleModal(true)}>
                Add Role
              </button>
            </div>
            <RolesViewContainer />
          </div>
        }
      </div>
    </>
  );
};

export default Roles;
