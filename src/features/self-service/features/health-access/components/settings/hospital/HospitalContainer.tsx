import { useState } from "react";
import { AddHospitalBtn } from "./AddHospital";
import { HospitalTable } from "./HospitalTable";
import { SelectState } from "components/selectEntity/SelectState";

const HospitalContainer: React.FC<{ type?: "mine" }> = ({ type }) => {
  const [stateId, setStateId] = useState<number>();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <SelectState
          handleSelect={setStateId}
          onClear={() => setStateId(undefined)}
        />
        <AddHospitalBtn />
      </div>

      <HospitalTable stateId={stateId} type={type} />
    </div>
  );
};

export default HospitalContainer;
