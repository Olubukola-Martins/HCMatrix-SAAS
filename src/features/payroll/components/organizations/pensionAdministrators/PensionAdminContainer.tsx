import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import AddPensionAdmin from "./AddPensionAdmin";
import PensionAdminTable from "./PensionAdminsTable";

export const PensionAdminContainer = () => {
  const [comp, setComp] = useState<"add-pension-admin">();

  return (
    <>
      <AddPensionAdmin
        open={comp === "add-pension-admin"}
        handleClose={() => setComp(undefined)}
      />{" "}
      <div className="flex flex-col gap-6">
        {/* <NewTransfer open={showM} handleClose={() => setShowM(false)} /> */}
        <PageSubHeader
          description={`You can now create/edit pension administrators`}
          actions={[
            {
              name: "Add Authority",
              handleClick: () => setComp("add-pension-admin"),
            },
          ]}
        />
        <PensionAdminTable />
      </div>
    </>
  );
};
