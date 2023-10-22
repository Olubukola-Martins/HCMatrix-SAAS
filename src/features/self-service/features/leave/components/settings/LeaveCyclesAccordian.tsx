import { Collapse, Typography } from "antd";
import { AppButton } from "components/button/AppButton";
import { useState } from "react";
import { SaveLeaveCycle } from "./cycles/SaveLeaveCycle";
import { useAddLeaveCycle } from "../../hooks/leaveCycles/useAddLeaveCycle";
import { useEditLeaveCycle } from "../../hooks/leaveCycles/useEditLeavCycle";
import { DeleteLeaveCycle } from "./cycles/DeleteLeaveCycle";
import { useActivateOrDeactivateLeaveCycle } from "../../hooks/leaveCycles/useActivateOrDeactivateLeaveCycle";
import { LeaveCyclesTable } from "./cycles/LeaveCyclesTable";
import AppTooltip from "components/tooltip/AppTooltip";

const { Panel } = Collapse;

export type TLeaveCycle = {
  id: number;
  createdAt: string;
  updatedAt: string;
  startDate: string;
  endDate: string;
  name: string;
  status: "active" | "inactive" | "ended";
};
type TAction = "add" | "edit" | "delete" | "activate-or-deactivate";
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
  } = useAddLeaveCycle();
  const {
    mutate: editCycle,
    isLoading: isEditing,
    isSuccess: isEdited,
  } = useEditLeaveCycle();
  const { mutate: activateOrDeactivate, isLoading: isProcessing } =
    useActivateOrDeactivateLeaveCycle();

  return (
    <>
      <SaveLeaveCycle
        key="add"
        open={action === "add"}
        action={"add"}
        handleClose={onClose}
        defaultData={cycle}
        onSubmit={{ fn: addCycle, isLoading: isAdding, isSuccess: isAdded }}
      />
      <SaveLeaveCycle
        key="edit"
        open={action === "edit"}
        action={"edit"}
        handleClose={onClose}
        onSubmit={{
          fn: (data) => cycle && editCycle({ id: cycle?.id, body: data }),
          isLoading: isEditing,
          isSuccess: isEdited,
        }}
        defaultData={cycle}
      />
      <DeleteLeaveCycle
        open={action === "delete"}
        cycle={cycle}
        handleClose={onClose}
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
                <AppButton
                  label="Add Leave Cycle"
                  handleClick={() => handleClick("add")}
                />
              </div>
              <LeaveCyclesTable
                handleDelete={(item) => handleClick("delete", item)}
                handleEdit={(item) => handleClick("edit", item)}
                handleActivateOrDeactivate={{
                  fn: (item) => {
                    activateOrDeactivate({ id: item.id });
                  },
                  isLoading: isProcessing,
                }}
              />
            </div>
          </>
        </Panel>
      </Collapse>
    </>
  );
};

export default LeaveCyclesAccordian;
