import React from "react";
import Themes from "../../Themes/Themes";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const ImportDropdown = ({ anchorEl, handleClose }) => {
  const open = Boolean(anchorEl);

  return (
    <Menu
      id="invite-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "invite-button",
      }}
    >
      <Themes>
        <MenuItem onClick={handleClose}>Import User</MenuItem>
      </Themes>
    </Menu>
  );
};

export default ImportDropdown;
