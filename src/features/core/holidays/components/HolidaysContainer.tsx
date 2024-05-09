import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { AddHoliday } from "./AddHoliday";
import { HolidaysTable } from "./HolidaysTable";

export const HolidaysContainer = () => {
  const [showM, setShowM] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <AddHoliday open={showM} handleClose={() => setShowM(false)} />
      <PageSubHeader
        description={`You can now create/update holidays recognized by your organization`}
        actions={[{ name: "Add Holiday", handleClick: () => setShowM(true) }]}
      />
      <HolidaysTable />
    </div>
  );
};
