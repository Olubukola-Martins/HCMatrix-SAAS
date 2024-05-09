import { SelectApprovalStatus } from "features/core/workflows/components/SelectApprovalStatus";
import { useState } from "react";
import { TApprovalStatus } from "types/statuses";
import { AssetRequestsTable } from "./AssetRequestsTable";
import { SelectEmployee } from "features/core/employees/components/SelectEmployee";
import { AppButton } from "components/button/AppButton";
import { NewAssetRequest } from "./NewAssetRequest";

export const AssetRequestsTableContainer = () => {
  const [status, setStatus] = useState<TApprovalStatus>();
  const [employeeId, setEmployeeId] = useState<number>();
  const [showM, setShowM] = useState(false);

  return (
    <>
      <NewAssetRequest open={showM} handleClose={() => setShowM(false)} />

      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <div className="">
              <SelectApprovalStatus
                value={status}
                onSelect={(id) => {
                  setStatus(id);
                }}
                onClear={() => {
                  setStatus(undefined);
                }}
              />
            </div>
            <div>
              <SelectEmployee
                handleSelect={(val) => setEmployeeId(val)}
                handleClear={() => setEmployeeId(undefined)}
              />
            </div>
          </div>
          <AppButton
            {...{
              label: "New Asset Request",
              handleClick: () => setShowM(true),
            }}
          />
        </div>
        <AssetRequestsTable status={status} employeeId={employeeId} />
      </div>
    </>
  );
};
