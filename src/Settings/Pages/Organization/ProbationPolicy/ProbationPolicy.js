import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import DashboardLayout from "../../../../Layout/DashboardLayout";
import { Link } from "react-router-dom";

const ProbationPolicy = () => {
  return (
    <DashboardLayout>
      <div className="Container mt-3 h-screen">
        <div className="bg-card flex justify-between items-center py-2 px-4 rounded-md">
          <div className="flex items-center gap-2 text-accent font-semibold mt-2 pb-1">
            <Link to="/settings/departments">
              <i className="ri-arrow-left-line text-lg cursor-pointer hover:text-caramel"></i>
            </Link>
            <h5 className="text-lg font-bold">Probation Policy</h5>
          </div>
        </div>

        <div className="bg-card mt-5 pt-4 pb-10 px-4 rounded-md">
          <h3 className="text-accent text-lg mb-4">Probation Policy:</h3>
          <div className="mt-4">
            <form className="text-accent mt-6 grid grid-cols-2 gap-x-24 gap-y-5 w-4/5">
              <div>
                <div className="input-container w-full">
                  <label className="text-sm mb-2 block">Probation period</label>
                  <input
                    type="text"
                    placeholder="eg. UI/UX Designer"
                    className="w-full bg-white rounded-md p-2 border border-gray-400 focus:outline-none "
                  />
                </div>
              </div>
              <div>
                <div className="input-container w-full flex flex-col items-start justify-between  h-full">
                  <label className="text-sm mb-2 block">
                    Probation reminder
                  </label>
                  <input
                    type="checkbox"
                    placeholder=""
                    className="mb-2 scale-150"
                  />
                </div>
              </div>
              <div>
                <div className="input-container w-full">
                  <label className="text-sm mb-2 block">Notify role</label>
                  <input
                    type="text"
                    placeholder="eg. johndoe@gmail.com"
                    className="w-full bg-white rounded-md p-2 border border-gray-400 focus:outline-none "
                  />
                </div>
              </div>
              <div>
                <div className="input-container w-full flex flex-col items-start justify-between  h-full">
                  <label className="text-sm mb-2 block">
                    Automatic probation status change
                  </label>
                  <input
                    type="checkbox"
                    placeholder=""
                    className="mb-2 scale-150"
                  />
                </div>
              </div>

              {/* ctrl btns - edit n delete */}
              <div className="form-buttons flex justify-end mt-4 col-span-2">
                <button className="py-3 px-4 bg-caramel text-white rounded text-sm hover:opacity-60  font-medium">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProbationPolicy;
