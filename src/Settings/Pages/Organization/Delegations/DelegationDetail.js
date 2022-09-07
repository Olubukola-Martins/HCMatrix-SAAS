import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../../Layout/DashboardLayout";

const DepartmentDetail = () => {
  return (
    <DashboardLayout>
      <div className="h-screen">
        <div className="bg-card flex justify-between items-center py-2 px-4 rounded-md">
          <div className="flex items-center gap-2 text-accent font-semibold mt-2 pb-1">
            <Link to="/settings/departments">
              <i className="ri-arrow-left-line text-lg cursor-pointer hover:text-caramel"></i>
            </Link>
            <h5 className="text-sm">Delegation</h5>
          </div>
          <div className="flex items-center gap-3">
            <i className="ri-pencil-fill cursor-pointer text-xl"></i>
            <i className="ri-question-fill text-xl text-slate-400"></i>
            <i className="ri-more-fill cursor-pointer text-xl font-semibold"></i>
          </div>
        </div>

        <div className="bg-card mt-5 pt-4 pb-10 px-4 rounded-md">
          <h3 className="text-accent font-bold text-lg mb-4">
            Department details
          </h3>
          <div className="mt-4">
            <form className="text-accent mt-6 grid grid-cols-2 gap-x-24 gap-y-5 w-4/5">
              <div>
                <div className="input-container w-full">
                  <label className="text-sm mb-2 block">Delegation Name</label>
                  <input
                    type="text"
                    placeholder="eg. UI/UX Designer"
                    className="w-full bg-white rounded-md p-2 border border-gray-400 focus:outline-none "
                  />
                </div>
              </div>
              <div>
                <div className="input-container w-full">
                  <label className="text-sm mb-2 block">Modified by</label>
                  <input
                    type="text"
                    placeholder="Josh Potter"
                    className="w-full bg-white rounded-md p-2 border border-gray-400 focus:outline-none "
                  />
                </div>
              </div>
              <div>
                <div className="input-container w-full">
                  <label className="text-sm mb-2 block">Mail Alias</label>
                  <input
                    type="text"
                    placeholder="eg. johndoe@gmail.com"
                    className="w-full bg-white rounded-md p-2 border border-gray-400 focus:outline-none "
                  />
                </div>
              </div>
              <div>
                <div className="input-container w-full">
                  <label className="text-sm mb-2 block">Time modified</label>
                  <input
                    type="text"
                    placeholder="24-07-2022"
                    className="w-full bg-white rounded-md p-2 border border-gray-400 focus:outline-none "
                  />
                </div>
              </div>
              <div>
                <div className="input-container w-full">
                  <label className="text-sm mb-2 block">Department Lead</label>
                  <select
                    placeholder="Select"
                    className="w-full bg-white text-black rounded-md p-2 border border-gray-400 focus:outline-none "
                  >
                    <option className="bg-card">Emeka</option>
                    <option className="bg-card">Chinyere</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="input-container w-full invisible">
                  <label className="text-sm mb-2 block">Time added</label>
                  <input
                    type="text"
                    placeholder="24-07-2022"
                    className="w-full bg-white rounded-md p-2 border border-gray-400 focus:outline-none "
                  />
                </div>
              </div>
              <div>
                <div className="input-container w-full">
                  <label className="text-sm mb-2 block">
                    Parent Department
                  </label>
                  <select
                    placeholder="Select"
                    className="w-full bg-white text-black rounded-md p-2 border border-gray-400 focus:outline-none "
                  >
                    <option className="bg-card">Marketing</option>
                    <option className="bg-card">Development</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="input-container w-full invisible">
                  <label className="text-sm mb-2 block">Time added</label>
                  <input
                    type="text"
                    placeholder="24-07-2022"
                    className="w-full bg-white rounded-md p-2 border border-gray-400 focus:outline-none "
                  />
                </div>
              </div>
              <div>
                <div className="input-container w-full">
                  <label className="text-sm mb-2 block">Added by</label>
                  <input
                    type="text"
                    placeholder="24-07-2022"
                    className="w-full bg-white rounded-md p-2 border border-gray-400 focus:outline-none "
                  />
                </div>
              </div>
              <div>
                <div className="input-container w-full invisible">
                  <label className="text-sm mb-2 block">Time added</label>
                  <input
                    type="text"
                    placeholder="24-07-2022"
                    className="w-full bg-white rounded-md p-2 border border-gray-400 focus:outline-none "
                  />
                </div>
              </div>
              <div>
                <div className="input-container w-full">
                  <label className="text-sm mb-2 block">Time added</label>
                  <input
                    type="text"
                    placeholder="24-07-2022"
                    className="w-full bg-white rounded-md p-2 border border-gray-400 focus:outline-none "
                  />
                </div>
              </div>
              <div>
                <div className="input-container w-full invisible">
                  <label className="text-sm mb-2 block">Time added</label>
                  <input
                    type="text"
                    placeholder="24-07-2022"
                    className="w-full bg-white rounded-md p-2 border border-gray-400 focus:outline-none "
                  />
                </div>
              </div>

              {/* ctrl btns - edit n delete */}
              <div className="form-buttons flex justify-between mt-2">
                <button className="py-2 px-4 border border-black rounded text-sm hover:opacity-60  font-medium">
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DepartmentDetail;
