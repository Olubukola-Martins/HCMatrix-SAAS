import PageSubHeader from "components/layout/PageSubHeader";
import { appRoutes } from "config/router/paths";
import React from "react";
import { EmployeeHandOverForm } from "./EmployeeHandOverForm";
import { useNavigate } from "react-router-dom";
import { TTHandOverForm } from "../types";

type IProps = {
  handover?: TTHandOverForm;
  isLoading?: boolean;
};
const EmployeeHandOverContainer: React.FC<IProps> = ({
  isLoading,
  handover,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
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
          },
        ]}
      />
      <EmployeeHandOverForm handover={handover} isLoading={isLoading} />
    </div>
  );
};

export default EmployeeHandOverContainer;
