import React from "react";

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
                to={`/settings/departments/${id}`}
                className="cursor-pointer "
              >
                View
              </Link>
            </div>
          </li>
          <li className="">
            <div className=" bg-gray-200 hover:bg-caramel hover:text-white py-1 px-2 block whitespace-no-wrap">
              <Link
                to={`/settings/departments/${id}`}
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

export const DelegationsGridView = ({ delegations }) => {
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
      {delegations.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {delegations.map((item) => (
            <DelegationBox key={item.id} department={item} />
          ))}
        </div>
      ) : (
        <div className="h-72 flex items-center text-center  justify-center text-lg">
          <p>No delegations found</p>
        </div>
      )}
    </motion.div>
  );
};

const DelegationBox = ({ delegation }) => {
  return (
    <>
      {/* view */}

      <div className="border px-4 py-2 rounded-lg grid grid-cols-1 gap-4 border-caramel">
        <div className="flex justify-between">
          <h6 className="text-xl font-thin capitalize">{delegation.name}</h6>
          <CustomDropdown
            text={<i className="fa-solid fa-ellipsis"></i>}
            id={delegation.id}
          />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm">{delegation.email}</p>
          <div className="rounded-full bg-caramel h-6 w-6 flex items-center justify-center ">
            <span className="text-sm">{delegation.noOfEmployees}</span>
          </div>
        </div>
      </div>
    </>
  );
};
