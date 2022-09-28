import {
  Switch,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Themes from "../../Themes/Themes";
import PayrollSubNav from "../Components/PayrollSubNav";

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
  "Job Role",
  "Department",
  "Pay Group",
  "Pay grade",
  "Location",
  "Bank Details",
  "Employment Date",
  "Employer Email",
  "Employer Phone",
  "Employer Location",
];

const CreatePayslipTemplate = () => {
  const [extraD, setExtraD] = useState(false);
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
  const boxStyle = "px-4 py-3 shadow rounded-md bg-mainBg";
  const boxTitle = "font-medium text-sm pb-1";
  const inputStyle =
    "w-full rounded-md border border-gray-300 py-2 px-2 text-sm bg-mainBg focus:outline-none placeholder:text-accent font-medium";

  return (
    <DashboardLayout>
      <PayrollSubNav />
      <div>
        <div className="flex gap-2 text-accent">
          <Link to="/payroll/payslip">
            <i className="ri-arrow-left-s-line text-xl cursor-pointer"></i>
          </Link>
          <div>
            <h5 className="font-black text-lg">Create Payslip Template</h5>
          </div>
        </div>

        <div className="bg-card px-5 py-7 rounded-md mt-7 text-accent">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Enter Payslip Name"
                className={inputStyle}
              />
              <textarea
                name=""
                placeholder="Enter Payslip Description "
                id=""
                rows="3"
                className={inputStyle}
              />

              <div>
                <label htmlFor="allowance" className="text-sm font-medium">
                  Allowance
                </label>
                <select name="" id="allowance" className={`${inputStyle} mt-1`}>
                  <option value="">Select</option>
                  <option value="Allowances">Allowances 1</option>
                  <option value="Allowances">Allowances 1</option>
                </select>
              </div>

              <div>
                <label htmlFor="Deductions" className="text-sm font-medium">
                  Deductions
                </label>
                <select
                  name=""
                  id="Deductions"
                  className={`${inputStyle} mt-1`}
                >
                  <option value="">Select</option>
                  <option value="Deductions">Deductions 1</option>
                  <option value="Deductions">Deductions 1</option>
                </select>
              </div>

              <div>
                {/* <label htmlFor="" className="text-sm font-medium">
                Custom Field
              </label>
              <select name="" id="allowance" className={`${inputStyle} mt-1`}>
                <option value="">Select</option>
                <option value="Allowances">Allowances 1</option>
                <option value="Allowances">Allowances 1</option>
              </select> */}

                <Themes>
                  <FormControl
                    sx={{ m: 1, width: "98%", background: "var(--background)" }}
                  >
                    <InputLabel id="demo-multiple-checkbox-label">
                      Select
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={field}
                      onChange={handleChange}
                      input={<OutlinedInput label="Select" />}
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
              </div>
            </div>

            {/* second grid */}
            <div className="flex flex-col gap-3">
              <div className={boxStyle}>
                <div className="flex items-center justify-between">
                  <h5 className={boxTitle}>Show Tax</h5> <Switch />
                </div>
              </div>
              <div className={boxStyle}>
                <div className="flex items-center justify-between">
                  <h5 className={boxTitle}>Show Extra Payments</h5> <Switch />
                </div>
              </div>
              <div className={boxStyle}>
                <div className="flex items-center justify-between">
                  <h5 className={boxTitle}>Show Extra Deductions</h5> <Switch />
                </div>
              </div>
              <div className={boxStyle}>
                <div className="flex items-center justify-between">
                  <h5 className={boxTitle}>Show Extra Deductions</h5>{" "}
                  <Switch
                    checked={extraD}
                    onChange={(e) => setExtraD(e.target.checked)}
                  />
                </div>

                {extraD && (
                  <div className="pb-2">
                    <p className="text-xs pb-4">
                      You can choose the Year to Date data to display on this
                      payslip.
                    </p>
                    <div className="flex items-center gap-5">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="Extra Deductions"
                          id="YTD-Net"
                          className="scale-150 accent-caramel cursor-pointer"
                        />
                        <label
                          htmlFor="YTD-Net"
                          className="text-sm cursor-pointer"
                        >
                          YTD Net
                        </label>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="Extra Deductions"
                          id="YTD Gross"
                          className="scale-150 accent-caramel cursor-pointer"
                        />
                        <label
                          htmlFor="YTD Gross"
                          className="text-sm cursor-pointer"
                        >
                          YTD Gross
                        </label>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="Extra Deductions"
                          id="YTD Tax"
                          className="scale-150 accent-caramel cursor-pointer"
                        />
                        <label
                          htmlFor="YTD Tax"
                          className="text-sm cursor-pointer"
                        >
                          YTD Tax
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <button className="button">Save Changes</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreatePayslipTemplate;
