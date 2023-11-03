import { Collapse, Typography } from "antd";
import { AppButton } from "components/button/AppButton";
import { useState } from "react";
import { SaveLeaveCycle } from "./cycles/SaveLeaveCycle";
import { useActivateOrDeactivateLeaveCycle } from "../../hooks/leaveCycles/useActivateOrDeactivateLeaveCycle";
import { LeaveCyclesTable } from "./cycles/LeaveCyclesTable";
import AppTooltip from "components/tooltip/AppTooltip";
import { useSaveLeaveCycle } from "../../hooks/leaveCycles/useSaveLeaveCycle";
import { TLeaveCycle } from "../../types";
import { useGetLeaveCycle } from "../../hooks/leaveCycles/useGetLeaveCycle";

const { Panel } = Collapse;

type TAction = "save" | "delete" | "activate-or-deactivate";
const LeaveCyclesAccordian = () => {
  const [action, setAction] = useState<TAction>();
  const [cycle, setCycle] = useState<TLeaveCycle>();
  const onClose = () => {
    setAction(undefined);
  };
  const handleClick = (action: TAction, cycle?: TLeaveCycle) => {
    setAction(action);
    setCycle(cycle);
  };
  const {
    mutate: addCycle,
    isLoading: isAdding,
    isSuccess: isAdded,
  } = useSaveLeaveCycle();

  const { mutate: activateOrDeactivate, isLoading: isProcessing } =
    useActivateOrDeactivateLeaveCycle();
  const { data: leaveCycle, isFetching: isFetchingLeaveCycle } =
    useGetLeaveCycle();

  return (
    <>
      <SaveLeaveCycle
        open={action === "save"}
        action={cycle ? "edit" : "add"}
        handleClose={() => onClose()}
        defaultData={cycle}
        onSubmit={{
          fn: (vals) =>
            addCycle(vals, {
              onSuccess: () => {
                setCycle(undefined);
                onClose();
              },
            }),
          isLoading: isAdding,
          isSuccess: isAdded,
        }}
      />

      <Collapse expandIconPosition="end" accordion>
        <Panel
          header={
            <AppTooltip
              children={
                <Typography.Title level={5}>Leave Cycles</Typography.Title>
              }
              tooltipProps={{
                title:
                  "This section enables you to define the time frames for which leaves can be taken.Note that leave cyles cannot be modified when they are active. If you wish to modify first deactivate the ongoing leave cycle. Also a leave cycle cannot be deleted/deactivated if they are pending leave requests.",
              }}
            />
          }
          key="1"
        >
          <>
            <div className="flex flex-col gap-4">
              <div className="flex justify-end">
                {!leaveCycle && (
                  <AppButton
                    label="Create Leave Cycle"
                    handleClick={() => handleClick("save")}
                  />
                )}
              </div>
              <LeaveCyclesTable
                handleEdit={(item) => handleClick("save", item)}
                handleActivateOrDeactivate={{
                  fn: (item) => {
                    activateOrDeactivate({ isActive: !item.isActive });
                  },
                  isLoading: isProcessing,
                }}
                data={leaveCycle ? [leaveCycle] : undefined}
                isFetching={isFetchingLeaveCycle}
              />
            </div>
          </>
        </Panel>
      </Collapse>
    </>
  );
};

export default LeaveCyclesAccordian;
