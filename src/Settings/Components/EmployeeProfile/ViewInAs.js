import { Autocomplete, Modal, TextField } from "@mui/material";
import React from "react";
import Themes from "../../../Themes/Themes";

const ViewInAs = ({ open, handleClose }) => {
  const users = [
    { label: "Godswill Omenuko", id: 1994 },
    { label: "Isaac Odeh", id: 1972 },
    { label: "Basil Ikpe", id: 1974 },
    { label: "Emmanuel John", id: 2008 },
    { label: "Peter Obi", year: 1993 },
    { label: "Atiku Abubakar", year: 1994 },
    { label: "Bola Tinubu", year: 1957 },
  ];

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Themes>
          <div className="CModal" style={{ maxWidth: 400 }}>
            <div className="flex items-center justify-between w-full mb-8">
           <button className="transparentButton">View user details</button>
              <i
                class="fas fa-times cursor-pointer text-xl"
                onClick={handleClose}
              ></i>
            </div>

            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={users}
              renderInput={(params) => <TextField {...params} label="Users" />}
            />
          </div>
        </Themes>
      </Modal>
    </>
  );
};

export default ViewInAs;
