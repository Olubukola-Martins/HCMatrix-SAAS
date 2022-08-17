import { Modal } from "@mui/material";
import React from "react";
import Themes from "../../Themes/Themes";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const SendTo = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Themes>
        <div className="CModal" style={{ maxWidth: 400 }}>
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

            <div className="flex items-center justify-around mt-5">
              <button
                type="button"
                //   onClick={() => setOpenModal(false)}
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
  );
};

export default SendTo;
