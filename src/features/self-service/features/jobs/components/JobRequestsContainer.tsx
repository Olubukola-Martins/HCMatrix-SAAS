import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";

import { JobRequestsTableContainer } from "./JobRequestsTableContainer";
import { NewJobRequest } from "./NewJobRequest";

const JobRequestsContainer = () => {
  const [showM, setShowM] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      <NewJobRequest open={showM} handleClose={() => setShowM(false)} />
      <PageSubHeader
        description={`You can now approve and request for job requests.`}
        actions={[
          { name: "New Job Request", handleClick: () => setShowM(true) },
        ]}
      />
      <JobRequestsTableContainer />
    </div>
  );
};

export default JobRequestsContainer;
