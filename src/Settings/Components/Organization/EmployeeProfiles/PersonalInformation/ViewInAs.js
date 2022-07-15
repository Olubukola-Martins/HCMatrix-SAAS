import { Autocomplete, Modal, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Themes from "../../../../../Themes/Themes";

const ViewInAs = ({ open, handleClose }) => {
  const [nextUser, setNextUser] = useState(0);

  const users = [
    { name: "Godswill Omenuko", id: 1994 },
    { name: "Isaac Odeh", id: 1972 },
    { name: "Basil Ikpe", id: 1974 },
    { name: "Emmanuel John", id: 2008 },
    { name: "Peter Obi", id: 1993 },
    { name: "Atiku Abubakar", id: 1994 },
    { name: "Bola Tinubu", id: 1957 },
  ];

  function changeUserId(userId) {
    setNextUser(userId);
  }

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Themes>
          <div className="CModal" style={{ maxWidth: 400 }}>
            <div className="flex items-center justify-between w-full mb-8">
              {nextUser === 0 ? (
                <button disabled className="button">
                  View user details
                </button>
              ) : (
                <Link
                  className="button"
                  to={`/settings/employee-profile/${nextUser}`}
                >
                  View user details
                </Link>
              )}

              <i
                class="fas fa-times cursor-pointer text-xl"
                onClick={handleClose}
              ></i>
            </div>

            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={users}
              getOptionLabel={(option) => option.name + " (" + option.id + ")"}
              onChange={(event, value) => changeUserId(value?.id)}
              renderInput={(params) => (
                <TextField {...params} label="Search Users" />
              )}
            />
          </div>
        </Themes>
      </Modal>
    </>
  );
};

export default ViewInAs;
