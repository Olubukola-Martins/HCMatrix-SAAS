import React from "react";
import Drawer from "@mui/material/Drawer";
import Themes from "../../Themes/Themes";

const InviteUserDrawer = ({ open, setOpen }) => {
  const toggleDrawer = (anchor) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen((val) => !val);
  };

  return (
    <Drawer anchor={"left"} open={open} onClose={toggleDrawer("left")}>
      <Themes>
        <div className="h-screen  pb-8">
          {/* filter heading */}
          <div className="flex justify-between text-xl items-center font-light p-4">
            <h5 className="text-accent">Invite Multiple Users</h5>
            <i
              className="fa fa-times cursor-pointer"
              aria-hidden="true"
              onClick={toggleDrawer("left")}
            ></i>
          </div>
          {/* content */}
          <div className="mt-6 text-accent">
            {/* band */}
            <div className="px-6 py-3 bg-caramel flex items-center justify-between">
              <h6 className="text-sm">Employee Added: 2</h6>
              <h6 className="text-sm">License count left: 5</h6>
            </div>
            {/* form */}
            <div className="px-6 mt-4">
              <form className="text-accent mt-6 grid grid-cols-1 gap-4">
                <p className="mb-3">
                  Enter multiple email ids separated by commas.
                </p>
                <div>
                  <div className="input-container w-full">
                    <label className="text-sm mb-2 block">
                      Employee emails/IDs
                    </label>
                    <textarea
                      rows={5}
                      type="text"
                      placeholder="isaac@gmail.com, emma@yahoo.com, ..................."
                      className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none text-sm"
                    />
                  </div>
                </div>

                {/* ctrl btns */}
                <div className="form-buttons flex gap-4 mt-2">
                  <button className="py-2 px-4 bg-caramel rounded text-sm text-white font-medium">
                    Invite
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Themes>
    </Drawer>
  );
};

export default InviteUserDrawer;
