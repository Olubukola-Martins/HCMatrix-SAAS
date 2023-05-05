import { Checkbox } from "@mui/material";
import React from "react";

const OvertimeSetting = ({ inputStyle, close }) => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center text-sm">
            <Checkbox id="hour-wise" />
            <label
              htmlFor="hour-wise"
              className="cursor-pointer hover:text-caramel"
            >
              Hour-wise Calculation
            </label>
          </div>

          <div>
            <label className="text-xs">
              Minimum (daily) Hours Eligible for OT
            </label>
            <input
              type="number"
              placeholder="0"
              className={`${inputStyle} mt-1`}
            />
          </div>
          <div>
            <label className="text-xs">Minimum OT Hours Required</label>
            <input
              type="number"
              placeholder="0"
              className={`${inputStyle} mt-1`}
            />
          </div>

          <div>
            <label className="text-xs">Apply Extra OT</label>
            <select className={`${inputStyle} mt-1`}>
              <option value="">select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label className="text-xs">OT Paid On </label>
            <select className={`${inputStyle} mt-1`}>
              <option value="">select</option>
              <option value="yes">Gross Salary</option>
              <option value="no">Net Pay</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center text-sm">
            <Checkbox id="day-wise" />
            <label
              htmlFor="day-wise"
              className="cursor-pointer hover:text-caramel"
            >
              Day-wise Calculation
            </label>
          </div>

          <div>
            <label className="text-xs">
              Minimum (daily) Hours Eligible for OT
            </label>
            <input
              type="number"
              placeholder="0"
              className={`${inputStyle} mt-1`}
            />
          </div>
          <div>
            <label className="text-xs">Maximum OT Hours Payable</label>
            <input
              type="number"
              placeholder="0"
              className={`${inputStyle} mt-1`}
            />
          </div>
          <div>
            <label className="text-xs">Payment Percent</label>
            <input
              type="number"
              placeholder="0%"
              className={`${inputStyle} mt-1`}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mb-3 mt-5">
        <button onClick={close} type="button" className="transparentButton">
          cancel
        </button>
        <button type="submit" className="button">
          save
        </button>
      </div>
    </div>
  );
};

export default OvertimeSetting;
