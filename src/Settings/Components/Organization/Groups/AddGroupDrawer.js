import React from "react";

import { motion } from "framer-motion";

const AddGroupDrawer = ({ handleDrawer }) => {
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
        <h5 className="text-accent">Add Group</h5>
        <i
          className="fa fa-times cursor-pointer"
          aria-hidden="true"
          onClick={() => handleDrawer("")}
        ></i>
      </div>
      {/* content */}
      <form>
        <div className="mt-4 text-accent">
          {/* form */}
          <div className="px-6 mt-4">
            <div className="text-accent mt-6 grid grid-cols-1 gap-8">
              <div>
                <div className="input-container w-full">
                  <label className="text-sm mb-2 block">Group Name</label>
                  <input
                    type="text"
                    placeholder="eg. UI/UX Designer"
                    className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                  />
                </div>
              </div>
              <div>
                <div className="input-container w-full">
                  <label className="text-sm mb-2 block">Description</label>
                  <textarea
                    type="text"
                    rows={4}
                    placeholder="eg. johndoe@gmail.com"
                    className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                  />
                </div>
              </div>
              <div>
                <div className="input-container w-full">
                  <label className="text-sm mb-2 block">Group Email ID</label>
                  <input
                    type="text"
                    placeholder="eg. UI/UX Designer"
                    className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {users-form} */}
        <div className="mt-12">
          <h5 className="px-6 text-base font-semibold mb-2">Add Users</h5>
          <div className="px-6 py-3 bg-caramel flex gap-4 justify-between items-center">
            <div className="input-container w-full">
              <select
                type="text"
                placeholder="Add employee"
                className="w-full bg-white text-caramel rounded-full p-1  focus:outline-none "
              >
                <option className="bg-card">Employee</option>
                <option className="bg-card">line manager</option>
              </select>
            </div>
            <div className="input-container w-full">
              <select
                type="text"
                placeholder="Select"
                className="w-full bg-white text-caramel rounded-full p-1  focus:outline-none "
              >
                <option className="bg-card">Employee</option>
                <option className="bg-card">line manager</option>
              </select>
            </div>
            <div>
              <i className="fas fa-plus-circle"></i>
            </div>
          </div>
        </div>
        <div className="px-6 text-xs flex items-start mt-6">
          <input type={"checkbox"} className="mr-2" />
          <div> Notify users by Mail when they are added to this group.</div>
        </div>
        {/* ctrl btns */}
        <div className="px-6 form-buttons flex justify-between mt-6">
          <button className="py-2 px-4 rounded text-sm font-medium">
            Cancel
          </button>
          <button className="py-2 px-4 bg-caramel rounded text-sm text-white font-medium">
            Save
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddGroupDrawer;
