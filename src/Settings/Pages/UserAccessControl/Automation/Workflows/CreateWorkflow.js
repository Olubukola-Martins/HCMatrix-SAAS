import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import DashboardLayout from "../../../../../Layout/DashboardLayout";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const criterias = [
  {
    approver: "employee",
    options: ["Isaac Lupe", "Peter Obi", "Basius Clay", "Lupita Kinta"],
  },
  {
    approver: "group",
    options: ["Bussiness Admin", "Developers", "Hr Personnel"],
    conditions: ["At least one", "everyone", "custom"],
  },
  {
    approver: "role",
    options: ["Hr Admin", "Line Manager", "Supervisor"],
    conditions: ["anyone", "specific person(s)", "custom"],
  },
];

const Roles = () => {
  const [workflowType, setWorkflowType] = useState("basic");
  const [criteria, setCriteria] = useState(criterias[0]);
  const [condition, setCondition] = useState("");
  const [appectanceCriterias, setAppectanceCriterias] = useState([]);
  const [sentence, setSentence] = useState("");
  useEffect(() => {
    if (criteria.approver === "employee") {
      setSentence("Basius Clay has to accept");
    }
    if (criteria.approver === "group") {
      setSentence("One person in group has to accept");
    }
    if (criteria.approver === "role") {
      setSentence("One person with the role has to accept");
    }
  }, [criteria]);

  const handleCSelect = (e) => {
    setCondition(e.target.value);
  };
  const handleSelect = (e) => {
    const choosen = criterias.find((item) => item.approver === e.target.value);
    setCriteria(choosen);
    setCondition("");
  };
  return (
    <DashboardLayout>
      <div className="h-screen">
        {
          <div className="Container mt-4">
            <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center p-2 rounded text-sm">
              <h4 className="text-lg  mb-1">Create Workflow</h4>
            </div>
          </div>
        }
        {/* adjust accordingly */}

        <div className="Container content overflow-y-hidden relative">
          <div className="header flex justify-center items-center">
            <button
              onClick={() => setWorkflowType("basic")}
              className={
                workflowType === "basic"
                  ? "py-1 px-6 bg-caramel border border-caramel  text-base text-white font-medium"
                  : "py-1 px-6 border border-black-700 text-base  font-medium"
              }
            >
              Basic Workflow
            </button>
            <button
              onClick={() => setWorkflowType("advanced")}
              className={
                workflowType === "advanced"
                  ? "py-1 px-6 bg-caramel border border-caramel  text-base text-white font-medium"
                  : "py-1 px-6 border border-black-700 text-base  font-medium"
              }
            >
              Advanced Workflow
            </button>
          </div>
          <div className="content mt-6">
            <AnimatePresence exitBeforeEnter>
              {workflowType === "basic" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: "easeIn",
                  }}
                  exit={{ opacity: 0, transition: "easeOut" }}
                  className="bg-card rounded py-2"
                  key="basic"
                >
                  {/* filter heading */}
                  {/* <div className="flex justify-between text-xl items-center font-light py-2 px-4 mt-4">
                  <h5 className="text-accent">Create Workflow</h5>
                  <i
                    className="fa fa-times cursor-pointer"
                    aria-hidden="true"
                   
                  ></i>
                </div> */}
                  {/* content */}
                  <div className="mt-4 text-accent">
                    {/* form */}
                    <div className="px-6 mt-4">
                      <form className="text-accent mt-6 grid grid-cols-1 gap-8">
                        <div>
                          <div className="input-container w-full">
                            <label className="text-sm mb-2 block font-bold">
                              Workflow name
                            </label>
                            <input
                              type={"text"}
                              placeholder="workflow name"
                              className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                            ></input>
                          </div>
                        </div>
                        <div>
                          <div className="input-container w-full">
                            <label className="text-sm mb-2 block font-bold">
                              Stage Details
                            </label>
                            {/* stage form */}
                            <div>
                              {/* inputs */}
                              <div className="grid grid-cols-1 gap-4">
                                <input
                                  type={"text"}
                                  placeholder="stage name"
                                  className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                                ></input>
                                <select
                                  placeholder="stage name"
                                  className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                                >
                                  <option>Employee</option>
                                  <option>Roles</option>
                                  <option>Groups</option>
                                </select>
                                <select
                                  placeholder="stage name"
                                  className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                                >
                                  <option>James Paul</option>
                                </select>
                              </div>
                              {/* action - add new stage */}
                              <span className="cursor-pointer text-caramel text-sm underline mt-4 block">
                                Add new stage
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* ctrl btns */}
                        <div className="form-buttons flex justify-between mt-2">
                          <button className="py-2 px-4 rounded text-sm font-medium">
                            Cancel
                          </button>
                          <button className="py-2 px-4 bg-caramel rounded text-sm text-white font-medium">
                            Add
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </motion.div>
              )}
              {workflowType === "advanced" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: "easeIn",
                  }}
                  exit={{ opacity: 0, transition: "easeOut" }}
                  className="bg-card rounded py-2"
                  key="advanced"
                >
                  {/* filter heading */}

                  {/* content */}
                  <div className="mt-4 text-accent">
                    {/* form */}
                    <div className="px-6 mt-4">
                      <form className="text-accent mt-6 grid grid-cols-1 gap-2">
                        <div>
                          <div className="input-container w-full">
                            <label className="text-sm mb-2 block font-bold">
                              Workflow name
                            </label>
                            <input
                              type={"text"}
                              placeholder="workflow name"
                              className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                            ></input>
                          </div>
                        </div>
                        <div className="flex justify-end text-xl items-center font-light py-2 px-4 ">
                          <span className="cursor-pointer text-caramel text-base underline mt-4 block">
                            + Add stage
                          </span>
                        </div>
                        <div>
                          <div className="input-container w-full">
                            <label className="text-sm mb-2 block font-bold">
                              Stage Name
                            </label>
                            {/* stage form */}
                            <div>
                              {/* inputs */}
                              <div className="grid grid-cols-1 gap-4">
                                <input
                                  type={"text"}
                                  placeholder="stage name"
                                  className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                                ></input>
                                {/* criterias */}
                                <div className="bg-white px-8 py-2 rounded-md">
                                  <div className="flex justify-end text-xl items-center font-light py-2 px-4 ">
                                    <span
                                      className="cursor-pointer text-caramel text-sm underline mt-4 block"
                                      title="This allows you to add criterias that need to be met before proceeding to the next stage"
                                      onClick={() =>
                                        setAppectanceCriterias((val) => [
                                          ...val,
                                          sentence,
                                        ])
                                      }
                                    >
                                      + Add acceptance criteria
                                    </span>
                                  </div>
                                  {/* conditional criteria setting */}
                                  <div className="flex flex-col gap-2">
                                    <div className="grid grid-cols-4 gap-2">
                                      <div>
                                        <label className="text-sm">
                                          Approver
                                        </label>
                                        <select
                                          placeholder="stage name"
                                          className="w-full text-sm bg-transparent rounded-md p-1 border border-gray-400 focus:outline-none capitalize"
                                          onChange={handleSelect}
                                        >
                                          {criterias.map((item) => (
                                            <option key={item.approver}>
                                              {item.approver}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                      {criteria?.options.length > 0 && (
                                        <div>
                                          <label className="text-sm capitalize">
                                            {criteria.approver}
                                          </label>
                                          <select
                                            placeholder="stage name"
                                            className="w-full text-sm bg-transparent rounded-md p-1 border border-gray-400 focus:outline-none capitalize "
                                          >
                                            {criteria.options.map((item) => (
                                              <option>{item}</option>
                                            ))}
                                          </select>
                                        </div>
                                      )}
                                      {criteria?.conditions &&
                                        criteria?.conditions.length > 0 && (
                                          <div>
                                            <label className="text-sm capitalize">
                                              Condition
                                            </label>
                                            <select
                                              placeholder="stage name"
                                              className="w-full text-sm bg-transparent rounded-md p-1 border border-gray-400 focus:outline-none capitalize "
                                              onChange={handleCSelect}
                                            >
                                              {criteria.conditions.map(
                                                (item) => (
                                                  <option>{item}</option>
                                                )
                                              )}
                                            </select>
                                          </div>
                                        )}
                                      {condition === "custom" && (
                                        <div>
                                          <label className="text-sm ">
                                            Number of people in{" "}
                                            {criteria.approver}
                                          </label>
                                          <input
                                            type={"number"}
                                            placeholder="number of people"
                                            className="w-full text-sm bg-transparent rounded-md p-1 border border-gray-400 focus:outline-none  "
                                          />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  {/* added criterias list */}
                                  <div className="text-sm mt-6 text-slate-400 mb-4">
                                    <h6
                                      className="text-slate-700 font-semibold mb-2 block"
                                      title="At least one of this criterias has to be satisfied"
                                    >
                                      Acceptance Criterias to be met
                                    </h6>
                                    {appectanceCriterias.length > 0 ? (
                                      <ol>
                                        {appectanceCriterias.map(
                                          (item, index) => (
                                            <li className="mb-2" key={item}>
                                              {index + 1}.) {item}
                                            </li>
                                          )
                                        )}
                                      </ol>
                                    ) : (
                                      "No acceptance criteria has been set"
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* ctrl btns */}
                        <div className="form-buttons flex justify-between mt-2">
                          <button className="py-2 px-4 rounded text-sm font-medium">
                            Cancel
                          </button>
                          <button className="py-2 px-4 bg-caramel rounded text-sm text-white font-medium">
                            Add
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Roles;
