import { Collapse, Typography } from "antd";
import { AppButton } from "components/button/AppButton";
import { useState } from "react";

import { TLeaveType } from "../../types";
import { useCreateLeaveType } from "../../hooks/leaveTypes/useCreateLeaveType";
import { SaveLeaveType } from "./types/SaveLeaveType";
import { LeaveTypesTable } from "./types/LeaveTypesTable";
import { ViewLeaveType } from "./types/ViewLeaveType";
import { DeleteLeaveType } from "./types/DeleteLeaveType";
import AppTooltip from "components/tooltip/AppTooltip";
import { useActivateOrDeactivateLeaveType } from "../../hooks/leaveTypes/useActivateOrDeactivateLeaveType";
import { useUpdateLeaveType } from "../../hooks/leaveTypes/useUpdateLeaveType";

const { Panel } = Collapse;

type TAction = "add" | "edit" | "view" | "delete" | "activate-or-deactivate";
const LeaveTypesAccordian = () => {
  const [action, setAction] = useState<TAction>();
  const [type, setType] = useState<TLeaveType>();
  const onClose = () => {
    setAction(undefined);
  };
  const handleClick = (action: TAction, type?: TLeaveType) => {
    setAction(action);
    setType(type);
  };
  const {
    mutate: addtype,
    isLoading: isAdding,
    isSuccess: isAdded,
  } = useCreateLeaveType();
  const {
    mutate: edittype,
    isLoading: isUpdating,
    isSuccess: isUpdated,
  } = useUpdateLeaveType();
  const { mutate: activateOrDeactivate, isLoading: isProcessing } =
    useActivateOrDeactivateLeaveType();

  return (
    <>
      <SaveLeaveType
        key="add"
        open={action === "add"}
        action={"add"}
        handleClose={onClose}
        onSubmit={{
          fn: (vals) =>
            addtype(vals, {
              onSuccess: () => {
                onClose();
                setType(undefined);
              },
            }),
          isLoading: isAdding,
          isSuccess: isAdded,
        }}
      />
      <SaveLeaveType
        key="edit"
        open={action === "edit"}
        action={"edit"}
        handleClose={onClose}
        data={type}
        onSubmit={{
          fn: (vals) =>
            type &&
            edittype(
              { id: type.id, body: vals },
              {
                onSuccess: () => {
                  onClose();
                },
              }
            ),
          isLoading: isUpdating,
          isSuccess: isUpdated,
        }}
      />
      <ViewLeaveType
        key="view"
        open={action === "view"}
        handleClose={onClose}
        data={type}
      />
      <DeleteLeaveType
        open={action === "delete"}
        type={type}
        handleClose={onClose}
      />

      <Collapse expandIconPosition="end" accordion>
        <Panel
          header={
            <AppTooltip
              children={
                <Typography.Title level={5}>Leave Types</Typography.Title>
              }
              tooltipProps={{
                title:
                  "This section enables you to manage leave types. Note that leave policy cannot be modified when a leave cycle is active. If you wish to modify this section then first deactivate the ongoing leave cycle.",
              }}
            />
          }
          key="1"
        >
          <div className="flex flex-col gap-4">
            <div className="flex justify-end">
              <AppButton
                label="Add Leave type"
                handleClick={() => handleClick("add")}
              />
            </div>
            <LeaveTypesTable
              handleEdit={(item) => handleClick("edit", item)}
              handleView={(item) => handleClick("view", item)}
              handleDelete={(item) => handleClick("delete", item)}
              handleActivateOrDeactivate={{
                fn: (item) => {
                  activateOrDeactivate({
                    isActive: !item.isActive,
                    leaveTypeId: item.id,
                  });
                },
                isLoading: isProcessing,
              }}
            />
          </div>
        </Panel>
      </Collapse>
    </>
  );
};

export default LeaveTypesAccordian;
