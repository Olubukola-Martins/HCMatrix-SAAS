import React, { useState } from "react";

import { AssigneeCard } from "components/cards/AssigneeCard";
import { TAsset } from "../types";

import { UnassignAsset } from "./UnassignAsset";
import { AssignAsset } from "./AssignAsset";

export const CurrentAssetAssignee: React.FC<{ asset: TAsset }> = ({
  asset,
}) => {
  const [showD, setShowD] = useState<"unassign" | "assign">();
  return (
    <>
      <UnassignAsset
        asset={asset}
        open={showD === "unassign"}
        handleClose={() => setShowD(undefined)}
      />
      <AssignAsset
        asset={asset}
        open={showD === "assign"}
        handleClose={() => setShowD(undefined)}
      />
      <AssigneeCard
        data={{
          empUid: `${asset.assignee?.empUid}`,
          department: `N?A`,
          name: `${asset.assignee?.firstName} ${asset.assignee?.lastName}`,
        }}
        isAssigned={asset.status === "assigned"}
        handleAssign={{ fn: () => setShowD("assign") }}
        handleUnAssign={{ fn: () => setShowD("unassign") }}
      />
    </>
  );
};
