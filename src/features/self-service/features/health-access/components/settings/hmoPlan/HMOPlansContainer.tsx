import React from "react";
import { AddHMOPlanBtn } from "./AddHMOPlan";
import { HMOPlansTable } from "./HMOPlansTable";

const HMOPlansContainer = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <AddHMOPlanBtn />
      </div>
      <HMOPlansTable />
    </div>
  );
};

export default HMOPlansContainer;
