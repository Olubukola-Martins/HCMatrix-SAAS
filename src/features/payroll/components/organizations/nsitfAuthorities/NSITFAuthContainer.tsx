import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";

import AddNSITFAuth from "./AddNSITFAuth";
import NSITFAuthTable from "./NSITFAuthTable";

export const NSITFAuthContainer = () => {
  const [comp, setComp] = useState<"add-auth">();

  return (
    <>
      <AddNSITFAuth
        open={comp === "add-auth"}
        handleClose={() => setComp(undefined)}
      />{" "}
      <div className="flex flex-col gap-6">
        {/* <NewTransfer open={showM} handleClose={() => setShowM(false)} /> */}
        <PageSubHeader
          description={`You can now create/edit NSITF authorities`}
          actions={[
            {
              name: "Add Authority",
              handleClick: () => setComp("add-auth"),
            },
          ]}
        />
        <NSITFAuthTable />
      </div>
    </>
  );
};
