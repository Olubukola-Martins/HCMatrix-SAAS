import React from "react";
import Themes from "../../Themes/Themes";
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
        <MenuItem onClick={handleClose}>
          <label>
            <input type="checkbox" /> Display all
          </label>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <label>
            <input type="checkbox" /> Name
          </label>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <label>
            <input type="checkbox" /> Staff ID
          </label>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <label>
            <input type="checkbox" /> Grade
          </label>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <label>
            <input type="checkbox" /> Gender
          </label>
        </MenuItem>
      </Themes>
    </Menu>
  );
};

export default DisplayDropdown;
