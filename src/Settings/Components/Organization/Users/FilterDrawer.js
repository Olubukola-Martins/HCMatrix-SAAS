import React from "react";
import { motion } from "framer-motion";

const FilterDrawer = ({ handleDrawer }) => {
  return (
    <motion.div
      initial={{ x: 500 }}
      animate={{
        x: 0,
      }}
      transition={{ ease: "easeIn" }}
      exit={{ x: 500 }}
      className="w-96 scrollBar fixed overflow-y-auto mode_color right-0 drop-shadow-lg z-50 cursor-move py-2 px-4 pb-8 "
      drag
      style={{ height: "28rem" }}
    >
      {/* filter heading */}
      <div className="flex justify-between text-xl items-center font-light">
        <h5 className="text-accent">Filter</h5>
        <i
          className="fa fa-times cursor-pointer"
          aria-hidden="true"
          onClick={() => handleDrawer("")}
        ></i>
      </div>
      {/* filters n search */}
      <div className="mt-6">
        {/* search */}
        <div className="flex justify-between items-center border rounded-lg text-accent py-3 text-sm px-4 border-gray-200">
          <input
            className="border-none flex-1 outline-0 outline-none bg-transparent"
            placeholder="Search departments, roles, ..."
          ></input>
          <i class="fas fa-search text-gray-400"></i>
        </div>
        {/* form */}
        <form className="text-accent mt-6 grid grid-cols-1 gap-8">
          {/* department */}
          <div className="input-field flex flex-col">
            <label className="font-semibold mb-2">Department</label>
            <select
              placeholder="All departments"
              className="border-none flex-1 outline-0 outline-none bg-transparent"
            >
              <option className="bg-card">All departments</option>
              <option className="bg-card">Marketing</option>
            </select>
          </div>
          {/* roles*/}
          <div className="input-field flex flex-col">
            <label className="font-semibold mb-2">Roles</label>
            <select
              placeholder="All Roles"
              className="border-none flex-1 outline-0 outline-none bg-transparent"
            >
              <option className="bg-card">All Roles</option>
              <option className="bg-card">Employee</option>
            </select>
          </div>
          {/* company*/}
          <div className="input-field flex flex-col">
            <label className="font-semibold mb-2">Company</label>
            <select
              placeholder="All Companies"
              className="border-none flex-1 outline-0 outline-none bg-transparent"
            >
              <option className="bg-card">All Companies</option>
              <option className="bg-card">Boston</option>
            </select>
          </div>
          {/* user gorup*/}
          <div className="input-field flex flex-col">
            <label className="font-semibold mb-2">User Group</label>
            <select
              placeholder="All user groups"
              className="border-none flex-1 outline-0 outline-none bg-transparent"
            >
              <option className="bg-card">All user groups</option>
              <option className="bg-card">Marketing Team</option>
            </select>
          </div>
          {/* branch*/}
          <div className="input-field flex flex-col">
            <label className="font-semibold mb-2">Branch</label>
            <select
              placeholder="All branches"
              className="border-none flex-1 outline-0 outline-none bg-transparent"
            >
              <option className="bg-card">All branches</option>
              <option className="bg-card">Marketing</option>
            </select>
          </div>
          {/* ctrl btns */}
          <div className="form-buttons flex gap-4">
            <button className="py-1 px-2 bg-caramel rounded text-sm text-white font-medium">
              Filter
            </button>
            <button className="py-1 px-2 bg-transparent rounded text-sm text-accent border border-slate-200 hover:border-slate-400 font-medium transition ease-in-out duration-300">
              Reset
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default FilterDrawer;
