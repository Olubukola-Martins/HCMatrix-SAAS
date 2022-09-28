import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import Themes from "../../../../Themes/Themes";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CustomDropdown = ({ text, id }) => {
  return (
    <div className="">
      <div className="custom-dropdown inline-block relative">
        <div className="cursor-pointer flex">{text}</div>

        <ul className="dropdown-menu absolute hidden  text-gray-700 pt-0.5 bg-gray-200 text-sm drop-shadow-md text">
          <li className="">
            <div className=" bg-gray-200 hover:bg-caramel hover:text-white py-1 px-2 block whitespace-no-wrap">
              <Link
                to={`/settings/designations/${id}`}
                className="cursor-pointer "
              >
                View
              </Link>
            </div>
          </li>
          <li className="">
            <div className=" bg-gray-200 hover:bg-caramel hover:text-white py-1 px-2 block whitespace-no-wrap">
              <Link
                to={`/settings/designations/${id}`}
                className="cursor-pointer "
              >
                Edit
              </Link>
            </div>
          </li>
          <li className="">
            <div className=" bg-gray-200 hover:bg-caramel hover:text-white py-1 px-2 block whitespace-no-wrap">
              <span className="cursor-pointer ">Delete</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export const DesignationsGridView = ({ designations }) => {
  return (
    <motion.div
      className="  mt-4"
      initial={{ opacity: 0, y: 400 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      key={0}
      transition={{ ease: "easeIn" }}
      exit={{ opacity: 0, y: 400 }}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {designations.map((item) => (
          <DesignationBox key={item.id} designation={item} />
        ))}
      </div>
    </motion.div>
  );
};

const DesignationBox = ({ designation }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <>
      {/* view */}
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <Themes>
          <div className="px-6 py-4 rounded-md bg-card">
            <Link
              to={`/settings/designations/${designation.id}`}
              className="cursor-pointer font-medium hover:text-caramel"
            >
              View
            </Link>
          </div>
        </Themes>
      </Menu>
      <div className="border px-4 py-2 rounded-lg grid grid-cols-1 gap-4 border-caramel">
        <div className="flex justify-between">
          <h6 className="text-xl font-thin capitalize">{designation.name}</h6>
          <CustomDropdown
            text={<i className="fa-solid fa-ellipsis"></i>}
            id={designation.id}
          />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm">{designation.email}</p>
          <div className="rounded-full bg-caramel h-6 w-6 flex items-center justify-center ">
            <span className="text-sm">{designation.count}</span>
          </div>
        </div>
      </div>
    </>
  );
};
