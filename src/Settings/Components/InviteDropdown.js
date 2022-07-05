import Themes from "../../Themes/Themes";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const InviteDropdown = ({ anchorEl, handleClose, handleDrawer }) => {
  const open = Boolean(anchorEl);
  //invite user drawer

  const handleSingleDrawer = (val) => {
    handleDrawer(val);
    handleClose();
  };

  return (
    <>
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
          <MenuItem onClick={() => handleSingleDrawer("single-invite")}>
            Invite User
          </MenuItem>
          <MenuItem onClick={() => handleSingleDrawer("multiple-invite")}>
            Invite Multiple Users
          </MenuItem>
        </Themes>
      </Menu>
    </>
  );
};

export default InviteDropdown;
