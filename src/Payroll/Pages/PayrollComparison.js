import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import TableComparison from "../Components/TableComparison";
import GraphComparison from "../Components/GraphComparison";
import PayrollSubNav from "../Components/PayrollSubNav";

const ITEM_HEIGHT = 45;
const ITEM_PADDING_TOP = 5;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 220,
    },
  },
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const PayrollComparison = () => {
  const [personName, setPersonName] = useState([]);
  const [switchView, setSwitchView] = useState(true);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <DashboardLayout>
      <PayrollSubNav/>
      <div>
        <div className="flex items-center gap-1 mb-10">
          <Link to="/payroll/review">
            <i className="ri-arrow-left-s-line text-xl"></i>
          </Link>
          <h5 className="font-black text-lg">Payroll comparison </h5>
        </div>

        <div className="flex justify-end mb-6">
          <div className="flex items-center justify-end gap-5 font-medium">
            <i className="ri-download-2-line text-xl"></i>
            <i className="ri-logout-box-r-line text-xl"></i>

            <FormControl sx={{ width: 220}}>
              <InputLabel id="demo-multiple-checkbox-label">Month</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Month" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {months.map((month) => (
                  <MenuItem key={month} value={month} sx={{background: "white"}}>
                    <Checkbox checked={personName.indexOf(month) > -1} />
                    <ListItemText primary={month} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 lg:px-20">
          <button
            onClick={() => setSwitchView(true)}
            className={
              switchView
                ? `hover:opacity-70 transition ease-in-out duration-300 bg-caramel text-white text-sm py-1 w-full border-4 border-caramel rounded-md font-medium`
                : `bg-card text-sm text-accent py-1 w-full border-4 border-card rounded-md font-medium`
            }
          >
            Table
          </button>
          <button
            onClick={() => setSwitchView(false)}
            className={
              switchView
                ? `bg-card text-sm text-accent py-1 w-full border-4 border-card rounded-md font-medium`
                : `hover:opacity-70 transition ease-in-out duration-300 bg-caramel text-white text-sm py-1 w-full border-4 border-caramel rounded-md font-medium`
            }
          >
            Graph
          </button>
        </div>

        {switchView ? <TableComparison /> : <GraphComparison />}
      </div>
    </DashboardLayout>
  );
};

export default PayrollComparison;
