import { AppButton } from "components/button/AppButton";
import { useState } from "react";
import { AddBreak } from "./AddBreak";

export const WorkBreak = () => {
  const [openBreak, setOpenBreak] = useState(false);

  return (
    <>
      <AddBreak open={openBreak} handleClose={() => setOpenBreak(false)} />
      <div className="border rounded-md p-3 md:p-5 mt-5">
        <div className="flex items-start flex-col gap-3 lg:flex-row justify-between">
          <div>
            <h3 className="font-semibold text-lg">Breaks</h3>
            <p>
              Schedule breaks by setting fixed times or durations here. If left
              empty, members can clock into breaks freely.
            </p>
          </div>
          <AppButton label="Add break" handleClick={() => setOpenBreak(true)} />
        </div>
      </div>
    </>
  );
};
