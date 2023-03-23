import { appRoutes } from "AppRoutes";
import { PageIntro } from "Layout/Components/PageIntro";
import DashboardLayout from "Layout/DashboardLayout";
import { useParams } from "react-router-dom";
import { EditRoleForm } from "./EditRoleForm";

export const EditRole = () => {
  const params = useParams();
  return (
    <DashboardLayout>
      <div className="Container">
        <div className="mt-4 flex flex-col gap-4">
          <PageIntro title="Edit Role" link={appRoutes.roleSettings} />
          <div className="bg-card px-4 py-4 rounded-md">
            {params?.id && <EditRoleForm id={+params.id} />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
