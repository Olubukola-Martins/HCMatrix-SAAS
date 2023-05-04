import { appRoutes } from "AppRoutes";
import { PageIntro } from "Layout/Components/PageIntro";
import DashboardLayout from "Layout/DashboardLayout";
import CreateRoleForm from "Settings/Components/UserAccessControl/Roles/CreateRoleForm";

const CreateRole = () => {
  return (
    <DashboardLayout>
      <div className="Container">
        <div className="mt-4 flex flex-col gap-4">
          <PageIntro title="Create Role" link={appRoutes.roleSettings} />

          <div className="bg-card px-4 py-4 rounded-md">
            <CreateRoleForm />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateRole;
