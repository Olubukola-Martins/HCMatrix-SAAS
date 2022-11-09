import { Tooltip } from "antd";
import React from "react";

export const EmergencyContact = () => {
    const [disable, setDisable] = useState(true);
  return (
    <div className="bg-mainBg shadow-sm rounded-md p-4 mt-5">
      <div className="flex justify-between mb-3">
          <h2 className="font-medium text-lg">Personal Information</h2>
          <Tooltip title={disable ? "Enable editing" : "Disable editing"}>
            <i
              className={
                disable
                  ? `ri-pencil-line cursor-pointer hover:text-caramel text-xl`
                  : `ri-lock-line cursor-pointer hover:text-caramel text-xl`
              }
              onClick={enableEdit}
            ></i>
          </Tooltip>
        </div>
    </div>
  );
};
