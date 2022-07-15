import { useState } from "react";
import Themes from "../../Themes/Themes";
import { motion } from "framer-motion";

import Modal from "@mui/material/Modal";

const departments = [
  {
    name: "Marketing",
    designations: ["Market researcher", "Field agent", "Market planner"],
  },
  {
    name: "Design",
    designations: ["Graphic Designer", "Animator", "UI/UX designer"],
  },
  {
    name: "App Development",
    designations: [
      "Front End Engineer",
      "backend engineeer",
      "devops engineer",
    ],
  },
];

const CModal = ({ open, handleClose }) => {
  const [designations, setDesignations] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <Modal
      open={open === "assign-department"}
      onClose={handleClose}
      aria-labelledby="Email Verification"
      aria-describedby="Please verify your account by checking your inbox."
      BackdropProps={{ invisible: false }}
    >
      <Themes>
        <div className="CModal" style={{ maxWidth: 600 }}>
          <div className="flex flex-col items-center justify-center pb-8  text-accent">
            <div className="flex items-center justify-end w-full mb-4">
              <i
                class="fas fa-times cursor-pointer text-2xl"
                onClick={handleClose}
              ></i>
            </div>
            <h4 className="font-bold text-lg mb-4 text-center">
              Assign to Department
            </h4>

            <div className="radio-inputs mt-4 w-3/4 flex flex-col gap-4">
              <div className="input-container w-full">
                <label className="text-sm mb-2">Pick a department</label>
                <select
                  type="text"
                  placeholder="eg. UI/UX Designer"
                  className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                  onChange={(e) => {
                    setDesignations(
                      () =>
                        departments.find((item) => item.name === e.target.value)
                          .designations
                    );
                  }}
                >
                  <option key={"sept"} disabled selected>
                    Select department
                  </option>
                  {departments.map((item) => (
                    <option key={item.name} id={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {designations.length > 0 && (
                <motion.div
                  className="input-container w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ease: "easeIn", delay: 0.3 }}
                >
                  <label className="text-sm mb-2">
                    What is the role/designation in department?
                  </label>
                  <select
                    type="text"
                    placeholder="eg. UI/UX Designer"
                    className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                  >
                    {designations.map((item) => (
                      <option key={item} id={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </motion.div>
              )}
            </div>

            <div className="buttons mt-6 flex items-center gap-4">
              <button
                className="px-3 py-1 bg-caramel rounded text-sm text-white font-medium hover:bg-opacity-70"
                onClick={() => {
                  setCurrentStep(2);
                }}
              >
                Assign
              </button>
              <button
                onClick={handleClose}
                className="px-3 py-1 bg-transparent rounded text-sm text-accent border border-slate-200 hover:border-slate-400 font-medium transition ease-in-out duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Themes>
    </Modal>
  );
};

export default CModal;
