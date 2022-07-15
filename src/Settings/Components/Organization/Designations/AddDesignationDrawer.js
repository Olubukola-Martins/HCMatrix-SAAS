import React from "react";

import { motion } from "framer-motion";

const AddDesignationDrawer = ({ handleDrawer }) => {
  return (
    <motion.div
      initial={{ x: 500 }}
      animate={{
        x: 0,
      }}
      transition={{ ease: "easeIn" }}
      exit={{ x: 500 }}
      className="w-96 fixed overflow-y-auto mode_color right-0 drop-shadow-lg z-50 cursor-move pb-8"
      drag
      style={{ height: "28rem" }}
    >
      {/* filter heading */}
      <div className="flex justify-between text-xl items-center font-light py-2 px-4 mt-4">
        <h5 className="text-accent">Add Designation</h5>
        <i
          className="fa fa-times cursor-pointer"
          aria-hidden="true"
          onClick={() => handleDrawer("")}
        ></i>
      </div>
      {/* content */}
      <div className="mt-4 text-accent">
        {/* form */}
        <div className="px-6 mt-4">
          <form className="text-accent mt-6 grid grid-cols-1 gap-8">
            <div>
              <div className="input-container w-full">
                <label className="text-sm mb-2 block">Designation Name</label>
                <input
                  type="text"
                  placeholder="eg. UI/UX Designer"
                  className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                />
              </div>
            </div>
            <div>
              <div className="input-container w-full">
                <label className="text-sm mb-2 block">Mail Alias</label>
                <input
                  type="text"
                  placeholder="eg. johndoe@gmail.com"
                  className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                />
              </div>
            </div>

            {/* ctrl btns */}
            <div className="form-buttons flex justify-between mt-2">
              <button className="py-2 px-4 rounded text-sm font-medium">
                Cancel
              </button>
              <button className="py-2 px-4 bg-caramel rounded text-sm text-white font-medium">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default AddDesignationDrawer;
