import React, { useState } from "react";
import { TVehicle } from "../hooks/useFetchVehicles";

import { AssigneeCard } from "components/cards/AssigneeCard";
import { UnassignVehicle } from "./UnassignVehicle";
import { AssignVehicle } from "./AssignVehicle";

export const CurrentVehicleAssignee: React.FC<{ vehicle: TVehicle }> = ({
  vehicle,
}) => {
  const [showD, setShowD] = useState<"unassign" | "assign">();

  return (
    <>
      <UnassignVehicle
        vehicle={vehicle}
        open={showD === "unassign"}
        handleClose={() => setShowD(undefined)}
      />
      <AssignVehicle
        vehicle={vehicle}
        open={showD === "assign"}
        handleClose={() => setShowD(undefined)}
      />
      <AssigneeCard
        data={{
          empUid: `${vehicle.assignee?.empUid}`,
          department: `N?A`,
          name: `${vehicle.assignee?.firstName} ${vehicle.assignee?.lastName}`,
        }}
        isAssigned={vehicle.status === "assigned"}
        handleAssign={{ fn: () => setShowD("assign") }}
        handleUnAssign={{ fn: () => setShowD("unassign") }}
      />
    </>
  );
};
