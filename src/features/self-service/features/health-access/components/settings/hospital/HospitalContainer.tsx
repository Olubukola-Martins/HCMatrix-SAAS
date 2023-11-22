import { useState } from "react";
import { AddHospitalBtn } from "./AddHospital";
import { HospitalTable } from "./HospitalTable";
import { SelectState } from "components/selectEntity/SelectState";

const HospitalContainer: React.FC<{
  type?: "mine";
  showAdd?: boolean;
  showDelete?: boolean;
  showEdit?: boolean;
}> = ({ type, showAdd = true, showDelete = true, showEdit = true }) => {
  const [stateId, setStateId] = useState<number>();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <SelectState
          handleSelect={setStateId}
          onClear={() => setStateId(undefined)}
        />
        {showAdd ? <AddHospitalBtn /> : null}
      </div>

      <HospitalTable
        stateId={stateId}
        type={type}
        showDelete={showDelete}
        showEdit={showEdit}
      />
    </div>
  );
};

export default HospitalContainer;
