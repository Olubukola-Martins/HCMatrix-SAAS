import React from "react";
import Themes from "../../../../Themes/Themes";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const DisplayDropdown = ({ anchorEl, handleClose }) => {
  const open = Boolean(anchorEl);

  return (
    <Menu
      id="display-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "invite-button",
      }}
    >
      <Themes>
        {[
          "Display all",
          "Name",
          "Staff ID",
          "grade",
          "Gender",
          "status",
          "department",
          "email",
          "role",
        ].map((item) => (
          <MenuItem key="item">
            <label className="capitalize">
              <input type="checkbox" /> {item}
            </label>
          </MenuItem>
        ))}
      </Themes>
    </Menu>
  );
};

export default DisplayDropdown;
