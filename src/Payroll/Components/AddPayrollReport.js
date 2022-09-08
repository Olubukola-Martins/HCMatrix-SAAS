import React, { useState } from "react";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
} from "@mui/material";

import Themes from "../../Themes/Themes";
import PayrollSubNav from "./PayrollSubNav";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 25,
    },
  },
};

const reportFields = [
  "Cost Center",
  "Pay Group",
  "Branch",
  "Employment date",
  "Account Number",
  "Bank Name",
  "NHF Number",
  "NHF Number",
  "Tax Number",
  "Date of Birth",
  "Date of Birth",
  "Marital Status",
];

const AddPayrollReport = ({ close }) => {
  const reportInput =
    "bg-mainBg shadow-sm w-full text-sm font-medium placeholder:font-medium focus:outline-none placeholder:text-accent py-3 rounded px-3 my-2";
  const boxStyle = "px-4 py-3 shadow rounded-md bg-mainBg";
  const boxTitle = "font-medium text-sm pb-1";

  const [field, setField] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setField(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <PayrollSubNav />
      <div className="flex gap-2 text-accent">
        <i
          onClick={close}
          className="ri-arrow-left-s-line text-xl cursor-pointer"
        ></i>
        <div>
          <h5 className="font-black text-lg">Add Report</h5>
          <span className="text-xs">
            Control the information that should appear in your payroll reports.
          </span>
        </div>
      </div>

      <div className="bg-card p-6 rounded-md mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <input
              type="text"
              className={reportInput}
              placeholder="Report Name"
            />

            <textarea
              name=""
              id=""
              rows="2"
              className={`${reportInput} resize-x-none`}
              placeholder="Report Description "
            />

            <select name="" id="" className={reportInput}>
              <option value="">Employee Deductions</option>
              <option value="group-1">Group 1</option>
              <option value="group-2">Group 2</option>
              <option value="group-3">Group 3</option>
            </select>

            <select name="" id="" className={reportInput}>
              <option value="">Employee Deductions</option>
              <option value="group-1">Group 1</option>
              <option value="group-2">Group 2</option>
              <option value="group-3">Group 3</option>
            </select>

            <select name="" id="" className={reportInput}>
              <option value="">Select Allowance</option>
              <option value="group-1">Group 1</option>
              <option value="group-2">Group 2</option>
              <option value="group-3">Group 3</option>
            </select>
          </div>

          {/* second grid */}
          <div>
            <select name="" id="" className={reportInput}>
              <option value="">Select Report Group</option>
              <option value="group-1">Group 1</option>
              <option value="group-2">Group 2</option>
              <option value="group-3">Group 3</option>
            </select>
            {/* <select name="" id="" className={reportInput}>
              <option value="">Report fields for payroll</option>
              <option value="group-1">Group 1</option>
              <option value="group-2">Group 2</option>
              <option value="group-3">Group 3</option>
            </select> */}

            <Themes>
              <FormControl
                sx={{ m: 1, width: "98%", background: "var(--background)" }}
              >
                <InputLabel id="demo-multiple-checkbox-label">
                  Report fields dropdown
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={field}
                  onChange={handleChange}
                  input={<OutlinedInput label="Report fields dropdown" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                  sx={{ background: "var(--background)" }}
                >
                  {reportFields.map((reportField) => (
                    <MenuItem
                      sx={{ background: "var(--background)" }}
                      key={reportField}
                      value={reportField}
                    >
                      <Checkbox checked={field.indexOf(reportField) > -1} />
                      <ListItemText primary={reportField} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Themes>

            <div className={`${boxStyle} my-2`}>
              <div className="flex items-center justify-between">
                <h5 className={boxTitle}>Show Additional Deductions</h5>
                <Switch />
              </div>
            </div>
            <div className={`${boxStyle} my-3`}>
              <div className="flex items-center justify-between">
                <h5 className={boxTitle}>Add taxes</h5>
                <Switch />
              </div>
            </div>
            <div className={`${boxStyle} my-3`}>
              <div className="flex items-center justify-between">
                <h5 className={boxTitle}>Add Bonus Pay</h5>
                <Switch />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-around mt-3">
          <button className="transparentButton">Cancel</button>
          <button className="button">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default AddPayrollReport;
