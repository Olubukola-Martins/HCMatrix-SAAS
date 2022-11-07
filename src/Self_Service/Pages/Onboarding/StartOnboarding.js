import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../Layout/DashboardLayout";
import { NewTask } from "../../Components/Onboarding/NewTask";
import SelfServiceSubNav from "../../Components/SelfServiceSubNav";

const StartOnboarding = () => {
  const [newTaskDrawer, setNewTaskDrawer] = useState(false);
  const inputStyle =
    "w-full rounded-md border border-gray-300 py-2 px-2 text-sm bg-mainBg focus:outline-none placeholder:text-accent shadow-sm";
  return (
    <DashboardLayout>
      <SelfServiceSubNav />
      <NewTask
        open={newTaskDrawer}
        handleClose={() => setNewTaskDrawer(false)}
      />

      <div className="Container">
        <div className="flex items-center gap-3 font-extrabold ">
          <Link to="/self-service/onboarding">
            <i className="ri-arrow-left-s-line text-lg cursor-pointer hover:text-caramel"></i>
          </Link>
          <h2 className="text-xl text-accent">Start Onboarding</h2>
        </div>

        <div className="bg-card px-5 py-7 rounded-md mt-7 text-accent">
          <div className="bg-mainBg rounded-md px-2 md:px-4 py-4 shadow-sm">
            <h3 className="font-semibold text-lg pb-2">Issac Temi</h3>
            <h6 className="text-sm font-medium">Customer Support</h6>
          </div>

          <div className="bg-mainBg rounded-md px-2 md:px-4 pt-4 pb-6 shadow-sm mt-5">
            <h6 className="text-sm font-medium pb-3">Resumption Information</h6>
            <form
              className="bg-card px-3 py-4 rounded-md"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <input
                    type="text"
                    placeholder="Resumption Date"
                    className={inputStyle}
                  />
                </div>
                <div>
                  <select name="" id="" className={inputStyle}>
                    <option value="">Office Branch</option>
                    <option value="office 1">Office 1</option>
                  </select>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Upload Document"
                    className={inputStyle}
                    onFocus={(e) => (e.target.type = "file")}
                    onBlur={(e) => (e.target.type = "text")}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Resumption Time"
                    className={inputStyle}
                  />
                </div>
                <div>
                  <select name="" id="" className={inputStyle}>
                    <option value="">Who to Call</option>
                    <option value="office 1">Hr manager</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <Link
                  to="/self-service/onboarding"
                  className="transparentButton"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="button"
                  onClick={() => setNewTaskDrawer(true)}
                >
                  Save & Set Tasks
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StartOnboarding;
