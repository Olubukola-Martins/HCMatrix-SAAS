import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";

import AddTaxAuth from "./AddTaxAuth";
import TaxAuthTable from "./TaxAuthTable";

export const TaxAuthContainer = () => {
  const [comp, setComp] = useState<"add-tax-auth">();

  return (
    <>
      <AddTaxAuth
        open={comp === "add-tax-auth"}
        handleClose={() => setComp(undefined)}
      />{" "}
      <div className="flex flex-col gap-6">
        {/* <NewTransfer open={showM} handleClose={() => setShowM(false)} /> */}
        <PageSubHeader
          description={`You can now create/edit tax authorities`}
          actions={[
            {
              name: "Add Authority",
              handleClick: () => setComp("add-tax-auth"),
            },
          ]}
        />
        <TaxAuthTable />
      </div>
    </>
  );
};
