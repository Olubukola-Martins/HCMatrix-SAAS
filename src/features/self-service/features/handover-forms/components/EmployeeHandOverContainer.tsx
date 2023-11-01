import PageSubHeader from "components/layout/PageSubHeader";
import { appRoutes } from "config/router/paths";
import React from "react";
import { EmployeeHandOverForm } from "./EmployeeHandOverForm";
import { useNavigate } from "react-router-dom";
import { TTHandOverForm } from "../types";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";

type IProps = {
  handover?: TTHandOverForm;
  isLoading?: boolean;
};
const EmployeeHandOverContainer: React.FC<IProps> = ({
  isLoading,
  handover,
}) => {
  const navigate = useNavigate();
  const { userPermissions } = useGetUserPermissions();

  return (
    <div className="flex flex-col gap-6">
      {
        <PageSubHeader
          description={`You can now access and manage hand-overs`}
          // hideBackground
          actions={[
            {
              name: "Manage",
              handleClick: () => navigate(appRoutes.handOver),
            },
            {
              name: "Resignation Setting",
              handleClick: () => navigate(appRoutes.resignationPolicySettings),
              btnVariant: "transparent",
              hidden: !canUserAccessComponent({
                userPermissions,
                requiredPermissions: ["manage-resignation"],
              }),
            },
          ]}
        />
      }
      <EmployeeHandOverForm handover={handover} isLoading={isLoading} />
    </div>
  );
};

export default EmployeeHandOverContainer;
