import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { NewReimbursement } from "./NewReimbursement";
import { ReimbursmentsRequestsTableContainer } from "./ReimbursmentsRequestsTableContainer";

const ReimbursementsContainer = () => {
  const [showM, setShowM] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      <NewReimbursement open={showM} handleClose={() => setShowM(false)} />
      <PageSubHeader
        description={`You can now approve and request for reimbursements.`}
        actions={[
          { name: "New Reimbursement", handleClick: () => setShowM(true) },
        ]}
      />
      <ReimbursmentsRequestsTableContainer />
    </div>
  );
};

export default ReimbursementsContainer;
