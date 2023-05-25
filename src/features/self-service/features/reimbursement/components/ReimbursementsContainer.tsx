import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { NewReimbursement } from "./NewReimbursement";

const ReimbursementsContainer = () => {
  const [showM, setShowM] = useState(false);
  return (
    <div>
      <NewReimbursement open={showM} handleClose={() => setShowM(false)} />
      <PageSubHeader
        description={`You can now approve and request for reimbursements.`}
        actions={[
          { name: "New Reimbursement", handleClick: () => setShowM(true) },
        ]}
      />
    </div>
  );
};

export default ReimbursementsContainer;
