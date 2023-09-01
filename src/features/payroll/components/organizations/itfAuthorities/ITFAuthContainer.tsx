import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";

import AddITFAuth from "./AddITFAuth";
import ITFAuthTable from "./ITFAuthTable";

export const ITFAuthContainer = () => {
  const [comp, setComp] = useState<"add-auth">();

  return (
    <>
      <AddITFAuth
        open={comp === "add-auth"}
        handleClose={() => setComp(undefined)}
      />{" "}
      <div className="flex flex-col gap-6">
        {/* <NewTransfer open={showM} handleClose={() => setShowM(false)} /> */}
        <PageSubHeader
          description={`You can now create/edit ITF authorities`}
          actions={[
            {
              name: "Add Authority",
              handleClick: () => setComp("add-auth"),
            },
          ]}
        />
        <ITFAuthTable />
      </div>
    </>
  );
};
