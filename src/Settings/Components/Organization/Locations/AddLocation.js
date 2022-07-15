import React from "react";
import { motion } from "framer-motion";

const AddLocation = ({ handleDrawer }) => {
  return (
    <motion.div
      initial={{ x: 500 }}
      animate={{
        x: 0,
      }}
      transition={{ ease: "easeIn" }}
      exit={{ x: 500 }}
      className="w-96 scrollBar fixed overflow-y-auto bg-card mt-1 right-0 drop-shadow-lg z-50 cursor-move py-2 px-6 pb-8 "
      drag
      style={{ height: "28rem" }}
    >
      {/* filter heading */}
      <div className="flex justify-between text-xl items-center font-light">
        <h5 className="text-accent font-medium text-md">Add Location</h5>
        <i
          className="fa fa-times cursor-pointer"
          aria-hidden="true"
          onClick={handleDrawer}
        ></i>
      </div>

      <form className="whiteBg_form mt-4">
        <div>
          <label>Location Name</label>
          <input type="text" required />
        </div>
        <div className="my-3">
          <label>Location Name</label>
          <input type="text" required />
        </div>
        <div>
          <label>Country</label>
          <select required>
            <option value="">Select</option>
            <option value="1">Nigeria</option>
            <option value="2">Ghana</option>
          </select>
        </div>
        <div className="my-3">
          <label>Location Description</label>
          <textarea
            required
            className="w-full resize-none rounded p-2 focus:outline-none"
          />
        </div>
        <div>
          <label>State</label>
          <select required>
            <option value="">Select</option>
            <option value="1">Lagos</option>
            <option value="2">Ebony</option>
          </select>
        </div>
        <div className="mt-3">
          <label>Time zone</label>
          <select required>
            <option value="">Select</option>
            <option value="1">Nigeria</option>
            <option value="2">Ghana</option>
          </select>
        </div>
        <div className="flex items-center justify-between mt-6">
          <h5
            className="font-medium cursor-pointer hover:font-semibold"
            onClick={handleDrawer}
          >
            Cancel
          </h5>
          <button className="button">Save Changes</button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddLocation;
