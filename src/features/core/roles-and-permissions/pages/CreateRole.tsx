import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import CreateRoleForm from "../components/CreateRoleForm";

const CreateRole = () => {
  return (
    <>
      <div className="Container">
        <div className="mt-4 flex flex-col gap-4">
          <PageIntro title="Create Role" link={appRoutes.roleSettings} />

          <div className="bg-card px-4 py-4 rounded-md">
            <CreateRoleForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateRole;
