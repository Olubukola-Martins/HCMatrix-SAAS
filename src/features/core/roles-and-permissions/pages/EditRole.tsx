import { useParams } from "react-router-dom";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { EditRoleForm } from "../components/EditRoleForm";

export const EditRole = () => {
  const params = useParams();
  return (
    <>
      <div className="Container">
        <div className="mt-4 flex flex-col gap-4">
          <PageIntro title="Edit Role" link={appRoutes.roleSettings} />
          <div className="bg-card px-4 py-4 rounded-md">
            {params?.id && <EditRoleForm id={+params.id} />}
          </div>
        </div>
      </div>
    </>
  );
};
