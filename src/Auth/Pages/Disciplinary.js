import {
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import DashboardLayout from "../../Layout/DashboardLayout";
import Themes from "../../Themes/Themes";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const employee = [
  { id: 1, name: "Godswill Omenuko" },
  { id: 2, name: "Isaac Odeh" },
  { id: 3, name: "Peter Obi" },
  { id: 4, name: "Basil Ikpe" },
  { id: 5, name: "Reuben Arinze" },
  { id: 6, name: "Godspower Eze" },
];

const Disciplinary = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <DashboardLayout>
        <div className="  mt-4">
          <div className="bg-card flex items-center justify-between px-5 rounded py-2">
            <span className="font-medium">Disciplinary</span>
            <button className="button" onClick={() => setOpenModal(true)}>
              Add new form
            </button>
          </div>

          {/* Table */}
          <table className="w-full text-left text-accent mt-5">
            <thead>
              <tr className="border-b border-accent">
                <th className="p-3">
                  <div className="flex gap-4 items-center">
                    <input type={"checkbox"} className="" />
                    <span>Name</span>
                  </div>
                </th>
                <th className="p-3">Department</th>
                <th className="p-3">Date</th>
                <th className="p-3">No of Occurrence</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {[1, 2, 3, 4].map((item) => (
                <tr key={item.id} className="border-b border-accent">
                  <td className="p-3 text-sm capitalize">
                    <div className="flex gap-4 items-center">
                      <input type={"checkbox"} />
                      <span>Francis terr</span>
                    </div>
                  </td>
                  <td className="p-3 text-sm">App dev</td>
                  <td className="p-3 text-sm">12/08/2022</td>
                  <td className="p-3 text-sm">2</td>

                  <td className="p-3 text-lg">
                    <i className="ri-pencil-fill cursor-pointer hover:text-caramel"></i>{" "}
                    <i className="ri-delete-bin-line pl-2 cursor-pointer hover:text-caramel"></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardLayout>

      {/* add new form modal */}

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Themes>
          <div
            className="CModal scrollBar overflow-auto"
            style={{ maxWidth: 500, height: "85%" }}
          >
            <div className="flex items-center justify-between w-full mb-5">
              <h5 className="text-base font-semibold">Add new fields</h5>
              <i
                className="fas fa-times cursor-pointer text-xl"
                onClick={() => setOpenModal(false)}
              ></i>
            </div>

            <form>
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={employee}
                disableCloseOnSelect
                getOptionLabel={(option) => option.name}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.name}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select employee"
                    placeholder="Employee"
                  />
                )}
              />
              <div className="grid grid-cols1 lg:grid-cols-2 gap-x-4 gap-y-6 mt-5">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Type of violation
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Type of violation"
                  >
                    <MenuItem
                      style={{ background: "var(--background)" }}
                      value="Minor"
                    >
                      Minor
                    </MenuItem>
                    <MenuItem
                      style={{ background: "var(--background)" }}
                      value="Major"
                    >
                      Major
                    </MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  type="text"
                  label="Enter Date"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "date")}
                />

                <TextField type="number" label="Number of occurrence" />
                <TextField type="text" label="Subject" />
              </div>
              <textarea
                name=""
                id=""
                className="w-full bg-transparent px-2 pt-2 border-slate-300 border mt-5 rounded-md resize-none placeholder:text-slate-600 focus:outline-none"
                rows="3"
                placeholder="Description"
              />

              <div className="flex items-center justify-around mt-5">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="transparentButton"
                >
                  Cancel
                </button>
                <button type="submit" className="button">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Themes>
      </Modal>
    </>
  );
};

export default Disciplinary;
