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

const { Panel } = Collapse;

type TAction = "add" | "view" | "delete" | "activate-or-deactivate";
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

  return (
    <>
      <SaveLeaveType
        key="add"
        open={action === "add"}
        action={"add"}
        handleClose={onClose}
        data={type}
        onSubmit={{ fn: addtype, isLoading: isAdding, isSuccess: isAdded }}
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
              handleView={(item) => handleClick("view", item)}
              handleDelete={(item) => handleClick("delete", item)}
            />
          </div>
        </Panel>
      </Collapse>
    </>
  );
};

export default LeaveTypesAccordian;
