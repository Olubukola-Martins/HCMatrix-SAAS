import { Checkbox } from "@mui/material";
import React from "react";

const OvertimeSetting = () => {
  return (
    <div className="flex justify-between gap-5">
      <div>
        <div className="flex items-center text-sm">
          <Checkbox id="hour-wise" />
          <label
            htmlFor="hour-wise"
            className="cursor-pointer hover:text-caramel"
          >
            Hour-wise Calculation
          </label>
        </div>
      </div>


      <div>
        <div className="flex items-center text-sm">
          <Checkbox id="day-wise" />
          <label
            htmlFor="day-wise"
            className="cursor-pointer hover:text-caramel"
          >
            Day-wise Calculation
          </label>
        </div>
      </div>
    </div>
  );
};

export default OvertimeSetting;
