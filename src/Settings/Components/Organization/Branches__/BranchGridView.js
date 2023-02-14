import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import Themes from "../../../../Themes/Themes";
import { Link } from "react-router-dom";

export const BranchGridView = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {[
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ].map((index) => (
        <BranchBox key={index} />
      ))}
    </div>
  );
};

const BranchBox = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <>
      {/* view */}
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <Themes>
          <div className="px-6 py-4 rounded-md bg-card">
            <Link
              to="/settings/branchs/id"
              className="cursor-pointer font-medium hover:text-caramel"
            >
              View
            </Link>
          </div>
        </Themes>
      </Menu>
      <div className="border border-caramel rounded-2xl flex justify-between py-2 px-3">
        <div className="flex flex-col gap-y-7">
          <h5 className="font-bold text-base text-accent">Lagos</h5>

          <span className="text-sm text-gray-400">Nigeria</span>
        </div>
        <div className="flex flex-col gap-y-8">
          <i
            className="ri-more-fill text-lg cursor-pointer hover:text-caramel"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          ></i>
          <span className="bg-caramel h-5 w-5 flex justify-center text-white items-center rounded-full text-sm">
            0
          </span>
        </div>
      </div>
    </>
  );
};
