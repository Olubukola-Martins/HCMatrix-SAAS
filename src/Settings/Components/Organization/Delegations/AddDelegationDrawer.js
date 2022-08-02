import React from "react";

import { motion } from "framer-motion";

const AddDelegationDrawer = ({ handleDrawer }) => {
  // Handle form
  const initialValues = {
    name: "",
    department: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Field is required!"),
    department: Yup.string().required("Field is required!"),
  });

  const onSubmit = (values, onSubmitProps) => {
    console.log("Form data", values);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };



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
        <h5 className="text-accent">Add Delegation</h5>
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
                <label className="text-sm mb-2 block font-bold">
                  Delegator
                </label>
                <select
                  placeholder="select"
                  className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                >
                  <option className="bg-card">Frank</option>
                  <option className="bg-card">Rose</option>
                </select>
              </div>
            </div>
            <div>
              <div className="input-container w-full">
                <label className="text-sm mb-2 block font-bold">
                  Delegatee
                </label>
                <select
                  placeholder="select"
                  className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                >
                  <option className="bg-card">Frank</option>
                  <option className="bg-card">Rose</option>
                </select>
              </div>
            </div>
            <div>
              <div className="input-container w-3/4 text-sm">
                <label className=" font-bold mb-2 block">Type</label>
                <div className="flex gap-6">
                  <div>
                    <label className="mb-1 block">Temporary</label>
                    <input
                      type="text"
                      placeholder="Date range"
                      className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                    />
                  </div>
                  <div>
                    <label>Permanent</label>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="input-container w-full text-sm">
                <label className=" font-bold mb-2 block">Notification</label>
                <div className="flex gap-6">
                  <div className="flex gap-2 items-center">
                    <label className="mb-1 block">Delegator</label>
                    <input
                      type="checkbox"
                      className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                    />
                  </div>
                  <div className="flex gap-2 items-center">
                    <label className="mb-1 block">Delegatee</label>
                    <input
                      type="checkbox"
                      className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="input-container w-full ">
                <label className="text-sm mb-2 block font-bold">
                  Description
                </label>
                <textarea
                  placeholder=""
                  rows={4}
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
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default AddDelegationDrawer;
