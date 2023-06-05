import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { TransferRequestsTable } from "./TransferRequestsTable";
import { NewTransfer } from "./NewTransfer";
import { TransferRequestsTableContainer } from "./TransferRequestsTableContainer";

export const TransfersContainer = () => {
  const [showM, setShowM] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      <NewTransfer open={showM} handleClose={() => setShowM(false)} />
      <PageSubHeader
        description={`You can now approve and request for tranfers.`}
        actions={[{ name: "New Transfer", handleClick: () => setShowM(true) }]}
      />
      <TransferRequestsTableContainer />
    </div>
  );
};
