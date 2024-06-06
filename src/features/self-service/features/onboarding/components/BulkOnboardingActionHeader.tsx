import React, { useState } from "react";
import { TOnboarding } from "../types";
import { MarkSelectedOnboardingAsCompleted } from "./MarkSelectedOnboardingAsCompleted";
import { AppButtonList } from "components/button/AppButtonList";

type TAction = "mark-as-completed";

const BULK_ACTIONS: TAction[] = ["mark-as-completed"];
const BulkOnboardingActionHeader: React.FC<{
  data: TOnboarding[];
  clearSelected: () => void;
}> = ({ data, clearSelected }) => {
  const [action, setAction] = useState<TAction>();
  const handleClose = () => {
    setAction(undefined);
    clearSelected();
  };
  if (data.length === 0) {
    return null;
  }

  return (
    <>
      <MarkSelectedOnboardingAsCompleted
        handleClose={handleClose}
        open={action === "mark-as-completed"}
        ids={data.map((item) => item.id)}
      />

      <div className="flex justify-end">
        <AppButtonList
          data={BULK_ACTIONS.map((item) => ({
            label: item.split("-").join(" "),
            handleClick: () => setAction(item),
            variant: "transparent",
          }))}
        />
      </div>
    </>
  );
};

export default BulkOnboardingActionHeader;
