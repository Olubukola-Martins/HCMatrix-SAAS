import { useState } from "react";
import Themes from "../../Themes/Themes";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import InviteUserDrawer from "./InviteUserDrawer";
import InviteMultipleUserDrawer from "./InviteMultipleUserDrawer";

const InviteDropdown = ({ anchorEl, handleClose, toggleExperiment }) => {
  const open = Boolean(anchorEl);
  //invite user drawer
  const [openInviteUser, setOpenInviteUser] = useState(false);
  const handleInviteUser = () => {
    handleClose();

    // setOpenInviteUser(true);
    toggleExperiment();
  };
  //invite multiple user drawer
  const [openInviteMultipleUser, setOpenInviteMultipleUser] = useState(false);
  const handleInviteMultipleUser = () => {
    handleClose();

    setOpenInviteMultipleUser(true);
  };

  return (
    <>
      <InviteUserDrawer open={openInviteUser} setOpen={setOpenInviteUser} />
      <InviteMultipleUserDrawer
        open={openInviteMultipleUser}
        setOpen={setOpenInviteMultipleUser}
      />

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
          <MenuItem onClick={handleInviteUser}>Invite User</MenuItem>
          <MenuItem onClick={handleInviteMultipleUser}>
            Invite Multiple Users
          </MenuItem>
        </Themes>
      </Menu>
    </>
  );
};

export default InviteDropdown;
