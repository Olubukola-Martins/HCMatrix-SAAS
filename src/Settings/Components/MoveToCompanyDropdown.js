import { useState } from "react";
import Themes from "../../Themes/Themes";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoveToCompanyModal from "./MoveToCompanyModal";
import MoveToExtCompanyModal from "./MoveToExtCompanyModal";

const Dropdown = ({ anchorEl, handleClose }) => {
  const open = Boolean(anchorEl);
  const [openId, setOpenId] = useState("");
  const handleModalClose = () => {
    setOpenId("");
  };

  return (
    <>
      <MoveToCompanyModal open={openId} handleClose={handleModalClose} />
      <MoveToExtCompanyModal open={openId} handleClose={handleModalClose} />
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
          <MenuItem
            onClick={() => {
              setOpenId("move-to-company");
              handleClose();
            }}
          >
            Associate company
          </MenuItem>

          <MenuItem
            onClick={() => {
              setOpenId("move-to-external-company");
              handleClose();
            }}
          >
            External company
          </MenuItem>
        </Themes>
      </Menu>
    </>
  );
};

export default Dropdown;
