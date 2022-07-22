import { useState } from "react";
import Modal from "@mui/material/Modal";
import Themes from "../../Themes/Themes";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import FramerAccordian from "./custom/FramerAccordian";

const steps = [
  "Upload File",
  "Mapping details",
  "Confirm mapping",
  "Handle Duplicate",
];
const successInfo = [
  { title: "Number of records added", count: 20 },
  { title: "Number of records updated", count: 12 },
  { title: "Number of records Skipped", count: 29 },
  { title: "Number of errors", count: 0 },
];

const UploadFileModal = ({ open, handleClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    setActiveStep((val) => val + 1);
    console.log(activeStep);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="Email Verification"
      aria-describedby="Please verify your account by checking your inbox."
      BackdropProps={{ invisible: false }}
    >
      <Themes>
        <div
          className="CModal overflow-y-auto"
          style={{
            maxWidth: 600,
            top: "20%",
            transform: "translate(-50%, -20%)",
            padding: 0,
          }}
        >
          <div style={{ height: "31rem" }}>
            {/* filter heading */}
            <div className="flex justify-between text-xl items-center font-light px-6 py-4">
              <h5 className="text-accent">
                {" "}
                {activeStep === 0 && steps[0]}
                {activeStep === 1 && steps[1]}
                {activeStep === 2 && steps[2]}
                {activeStep === 3 && steps[3]}
              </h5>
              <i
                className="fa fa-times cursor-pointer"
                aria-hidden="true"
                onClick={handleClose}
              ></i>
            </div>
            {/* content */}
            <div className="mt-2 text-accent">
              {/* confirm mapping */}
              {activeStep === 2 && (
                <div className="px-6 py-3 bg-slate-200  bg-opacity-30 text-center">
                  <p>All fields are Mapped correctly</p>
                </div>
              )}
              {/* emp n lisence */}
              <div className="px-6 py-3 flex items-center justify-between">
                <h6 className="text-sm">Employee Added: 2</h6>
                <h6 className="text-sm">License count left: 5</h6>
              </div>

              {/* stepper */}
              <div className="px-6 py-3 bg-faded">
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>
                        <span className="text-accent">{label}</span>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </div>
              {/* upload file*/}

              {activeStep === 0 && (
                <div className="px-6 mt-4">
                  <form className="text-accent mt-6 grid grid-cols-1 gap-5">
                    <div>
                      <div className="input-container w-full">
                        <label className="text-sm mb-2 block">
                          Import data for:
                        </label>

                        <select
                          type="text"
                          placeholder="Employee"
                          className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                        >
                          <option className="bg-card">Employee</option>
                          <option className="bg-card">line manager</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <div className="input-container w-full">
                        <label className="text-sm mb-2 block">
                          Import based on:
                        </label>

                        <select
                          type="text"
                          placeholder="Select"
                          className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                        >
                          <option className="bg-card">Select</option>
                          <option className="bg-card">Employee</option>
                          <option className="bg-card">line manager</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col align-center text-center text-xs border border-dotted border-gray-400 px-1 py-2 gap-3 pb-4">
                        <i className="ri-upload-2-line text-caramel text-2xl cursor-pointer"></i>
                        <h6 className="text-bold text-base mb-2">
                          Choose file to be Imported
                        </h6>
                        <p className="text-light">
                          [only xls,xlsx and csv formats are supported] Maximum
                          upload file size is 5 MB.
                        </p>
                        <div className="button-container mt-2">
                          <button
                            className="py-1 px-2 rounded text-sm text-caramel border font-medium"
                            style={{ borderColor: "var(--caramel)" }}
                          >
                            Upload file
                          </button>
                        </div>
                        <p className="mt-2">
                          Download Sample template for import
                        </p>
                      </div>
                    </div>

                    {/* ctrl btns */}
                    <div className="form-buttons flex justify-between mt-2 mb-4">
                      <button className="py-2 px-4  rounded text-sm  font-medium">
                        Cancel
                      </button>
                      <button
                        className="py-2 px-4 bg-caramel rounded text-sm text-white font-medium"
                        onClick={handleSubmit}
                      >
                        Save next
                      </button>
                    </div>
                  </form>
                </div>
              )}
              {/* mapping details */}

              {(activeStep === 1 || activeStep === 2) && (
                <div className="mt-4 pb-6">
                  <form className="flex flex-col gap-4 px-2">
                    <FramerAccordian heading={"Basic Information"}>
                      <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                        {/* employee id */}
                        <div>
                          <div className="input-container w-full">
                            <label className="text-sm mb-1 block">
                              Employee ID
                            </label>

                            <select
                              type="text"
                              placeholder="e.g LSETF-4309"
                              className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                            >
                              <option className="bg-card">Staff ID</option>
                              <option className="bg-card">Emp Id</option>
                            </select>
                          </div>
                        </div>
                        {/* email address */}
                        <div>
                          <div className="input-container w-full">
                            <label className="text-sm mb-1 block capitalize">
                              email address
                            </label>

                            <select
                              type="text"
                              placeholder="e.g LSETF-4309"
                              className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                            >
                              <option className="bg-card">Staff ID</option>
                              <option className="bg-card">Emp Id</option>
                              <option className="bg-card">email</option>
                            </select>
                          </div>
                        </div>
                        {/* first name */}
                        <div>
                          <div className="input-container w-full">
                            <label className="text-sm mb-1 block">
                              First name
                            </label>

                            <select
                              type="text"
                              placeholder="e.g LSETF-4309"
                              className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                            >
                              <option className="bg-card">firstName</option>
                              <option className="bg-card">Staff ID</option>
                              <option className="bg-card">Emp Id</option>
                              <option className="bg-card">email</option>
                            </select>
                          </div>
                        </div>
                        {/* last name */}
                        <div>
                          <div className="input-container w-full">
                            <label className="text-sm mb-1 block">
                              Last name
                            </label>

                            <select
                              type="text"
                              placeholder="e.g LSETF-4309"
                              className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                            >
                              <option className="bg-card">Staff ID</option>
                              <option className="bg-card">Emp Id</option>
                              <option className="bg-card">email</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </FramerAccordian>
                    <FramerAccordian heading={"Work Information"}>
                      <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                        {/* department */}
                        <div>
                          <div className="input-container w-full">
                            <label className="text-sm mb-1 block capitalize">
                              department
                            </label>

                            <select
                              type="text"
                              placeholder="Department"
                              className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                            >
                              <option className="bg-card">Department</option>
                              <option className="bg-card">Staff ID</option>
                              <option className="bg-card">Emp Id</option>
                              <option className="bg-card">email</option>
                            </select>
                          </div>
                        </div>
                        {/* employment type */}
                        <div>
                          <div className="input-container w-full">
                            <label className="text-sm mb-1 block capitalize">
                              employment type
                            </label>

                            <select
                              type="text"
                              placeholder="employment type"
                              className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                            >
                              <option className="bg-card">Staff ID</option>
                              <option className="bg-card">Emp Id</option>
                              <option className="bg-card">email</option>
                            </select>
                          </div>
                        </div>
                        {/* location */}
                        <div>
                          <div className="input-container w-full">
                            <label className="text-sm mb-1 block capitalize">
                              location
                            </label>

                            <select
                              type="text"
                              placeholder="e.g LSETF-4309"
                              className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                            >
                              <option className="bg-card">Staff ID</option>
                              <option className="bg-card">Emp Id</option>
                              <option className="bg-card">email</option>
                            </select>
                          </div>
                        </div>
                        {/* employment status */}
                        <div>
                          <div className="input-container w-full">
                            <label className="text-sm mb-1 block capitalize">
                              employment status
                            </label>

                            <select
                              type="text"
                              placeholder="employment status"
                              className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                            >
                              <option className="bg-card">Staff ID</option>
                              <option className="bg-card">Emp Id</option>
                              <option className="bg-card">email</option>
                            </select>
                          </div>
                        </div>
                        {/* designation */}
                        <div>
                          <div className="input-container w-full">
                            <label className="text-sm mb-1 block capitalize">
                              designation
                            </label>

                            <select
                              type="text"
                              placeholder="designation"
                              className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                            >
                              <option className="bg-card">designation</option>
                              <option className="bg-card">Staff ID</option>
                              <option className="bg-card">Emp Id</option>
                              <option className="bg-card">email</option>
                            </select>
                          </div>
                        </div>
                        {/* source of hire */}
                        <div>
                          <div className="input-container w-full">
                            <label className="text-sm mb-1 block capitalize">
                              source of hire
                            </label>

                            <select
                              type="text"
                              placeholder="designation"
                              className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                            >
                              <option className="bg-card">
                                source of hire
                              </option>
                              <option className="bg-card">Staff ID</option>
                              <option className="bg-card">Emp Id</option>
                              <option className="bg-card">email</option>
                            </select>
                          </div>
                        </div>
                        {/* role */}
                        <div>
                          <div className="input-container w-full">
                            <label className="text-sm mb-1 block capitalize">
                              role
                            </label>

                            <select
                              type="text"
                              placeholder="role"
                              className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                            >
                              <option className="bg-card">role</option>
                              <option className="bg-card">Staff ID</option>
                              <option className="bg-card">Emp Id</option>
                              <option className="bg-card">email</option>
                            </select>
                          </div>
                        </div>
                        {/* date of joining */}
                        <div>
                          <div className="input-container w-full">
                            <label className="text-sm mb-1 block capitalize">
                              date of joining
                            </label>

                            <select
                              type="text"
                              placeholder="date of joining"
                              className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                            >
                              <option className="bg-card">
                                date of joining
                              </option>
                              <option className="bg-card">Staff ID</option>
                              <option className="bg-card">Emp Id</option>
                              <option className="bg-card">email</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </FramerAccordian>
                    <FramerAccordian heading={"Personal Details"}>
                      <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                        {/* employee id */}
                        <div>
                          <div className="input-container w-full">
                            <label className="text-sm mb-1 block">
                              Date of birth
                            </label>

                            <select
                              type="text"
                              placeholder="e.g LSETF-4309"
                              className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                            >
                              <option className="bg-card">Staff ID</option>
                              <option className="bg-card">Emp Id</option>
                              <option className="bg-card">email</option>
                            </select>
                          </div>
                        </div>
                        {/* email address */}
                        <div>
                          <div className="input-container w-full">
                            <label className="text-sm mb-1 block capitalize">
                              Marital status
                            </label>

                            <select
                              type="text"
                              placeholder="e.g LSETF-4309"
                              className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                            >
                              <option className="bg-card">
                                marital status
                              </option>
                              <option className="bg-card">Staff ID</option>
                              <option className="bg-card">Emp Id</option>
                              <option className="bg-card">email</option>
                            </select>
                          </div>
                        </div>
                        {/* gender */}
                        <div>
                          <div className="input-container w-full">
                            <label className="text-sm mb-1 block">Gender</label>

                            <select
                              type="text"
                              placeholder="e.g LSETF-4309"
                              className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                            >
                              <option className="bg-card">gender</option>
                              <option className="bg-card">Staff ID</option>
                              <option className="bg-card">Emp Id</option>
                              <option className="bg-card">email</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </FramerAccordian>
                    <FramerAccordian heading={"Hierarchy Information"}>
                      <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                        {/* employee id */}
                        <div>
                          <div className="input-container w-full">
                            <label className="text-sm mb-1 block">
                              Reporting manager
                            </label>

                            <select
                              type="text"
                              placeholder="Reporting manager"
                              className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                            >
                              <option className="bg-card">Staff ID</option>
                              <option className="bg-card">Emp Id</option>
                              <option className="bg-card">email</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </FramerAccordian>
                    <FramerAccordian heading={"Contact Details"}>
                      <>
                        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                          {/* employee id */}
                          <div>
                            <div className="input-container w-full">
                              <label className="text-sm mb-1 block">
                                Work phone
                              </label>

                              <select
                                type="text"
                                placeholder="e.g LSETF-4309"
                                className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                              >
                                <option className="bg-card">Staff ID</option>
                                <option className="bg-card">Emp Id</option>
                                <option className="bg-card">phone</option>
                              </select>
                            </div>
                          </div>
                          {/* email address */}
                          <div>
                            <div className="input-container w-full">
                              <label className="text-sm mb-1 block capitalize">
                                Personal phone
                              </label>

                              <select
                                type="text"
                                placeholder="e.g LSETF-4309"
                                className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                              >
                                <option className="bg-card">Staff ID</option>
                                <option className="bg-card">Emp Id</option>
                                <option className="bg-card">email</option>
                              </select>
                            </div>
                          </div>
                          {/* gender */}
                          <div>
                            <div className="input-container w-full">
                              <label className="text-sm mb-1 block">
                                Personal email address
                              </label>

                              <select
                                type="text"
                                placeholder="e.g LSETF-4309"
                                className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                              >
                                <option className="bg-card">
                                  kim@west.com
                                </option>
                                <option className="bg-card">LSETF-4339</option>
                              </select>
                            </div>
                          </div>
                          {/* office location */}
                          <div>
                            <div className="input-container w-full">
                              <label className="text-sm mb-1 block">
                                Office location
                              </label>

                              <select
                                type="text"
                                placeholder="enter address"
                                className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                              >
                                <option className="bg-card">
                                  enter address
                                </option>
                                <option className="bg-card">Jam</option>
                              </select>
                            </div>
                          </div>
                          {/* current address */}
                          <div className="col-span-2">
                            <div className="input-container w-full">
                              <label className="text-sm mb-2 block">
                                Current Address
                              </label>

                              <div className="w-full bg-white rounded-md px-4 py-4 border border-gray-400">
                                <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                                  {/* employee id */}
                                  <div>
                                    <div className="input-container w-full">
                                      <select
                                        type="text"
                                        placeholder="address"
                                        className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                                      >
                                        <option className="bg-card">
                                          address
                                        </option>
                                        <option className="bg-card">
                                          LSETF-4339
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                  {/* email address */}
                                  <div>
                                    <div className="input-container w-full">
                                      <select
                                        type="text"
                                        placeholder="city"
                                        className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                                      >
                                        <option className="bg-card">
                                          city
                                        </option>
                                        <option className="bg-card">
                                          LSETF-4339
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                  {/* gender */}
                                  <div>
                                    <div className="input-container w-full">
                                      <select
                                        type="text"
                                        placeholder="state"
                                        className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                                      >
                                        <option className="bg-card">
                                          state
                                        </option>
                                        <option className="bg-card">
                                          LSETF-4339
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                  {/* country */}
                                  <div>
                                    <div className="input-container w-full">
                                      <select
                                        type="text"
                                        placeholder="country"
                                        className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                                      >
                                        <option className="bg-card">
                                          country
                                        </option>
                                        <option className="bg-card">
                                          LSETF-4339
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                  {/* postal code */}
                                  <div>
                                    <div className="input-container w-full">
                                      <select
                                        type="text"
                                        placeholder="country"
                                        className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                                      >
                                        <option className="bg-card">
                                          postal code
                                        </option>
                                        <option className="bg-card">
                                          LSETF-4339
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* permanent address */}
                          <div className="col-span-2">
                            <div className="input-container w-full">
                              <label className="text-sm mb-2 block">
                                Permanent Address
                              </label>

                              <div className="w-full bg-white rounded-md px-4 py-4 border border-gray-400">
                                <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                                  {/* employee id */}
                                  <div>
                                    <div className="input-container w-full">
                                      <select
                                        type="text"
                                        placeholder="address"
                                        className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                                      >
                                        <option className="bg-card">
                                          address
                                        </option>
                                        <option className="bg-card">
                                          LSETF-4339
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                  {/* email address */}
                                  <div>
                                    <div className="input-container w-full">
                                      <select
                                        type="text"
                                        placeholder="city"
                                        className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                                      >
                                        <option className="bg-card">
                                          city
                                        </option>
                                        <option className="bg-card">
                                          LSETF-4339
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                  {/* gender */}
                                  <div>
                                    <div className="input-container w-full">
                                      <select
                                        type="text"
                                        placeholder="state"
                                        className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                                      >
                                        <option className="bg-card">
                                          state
                                        </option>
                                        <option className="bg-card">
                                          LSETF-4339
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                  {/* country */}
                                  <div>
                                    <div className="input-container w-full">
                                      <select
                                        type="text"
                                        placeholder="country"
                                        className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                                      >
                                        <option className="bg-card">
                                          country
                                        </option>
                                        <option className="bg-card">
                                          LSETF-4339
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                  {/* postal code */}
                                  <div>
                                    <div className="input-container w-full">
                                      <select
                                        type="text"
                                        placeholder="country"
                                        className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                                      >
                                        <option className="bg-card">
                                          postal code
                                        </option>
                                        <option className="bg-card">
                                          LSETF-4339
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    </FramerAccordian>
                    <FramerAccordian heading={"Separation Information"}>
                      <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                        {/* employee id */}
                        <div>
                          <div className="input-container w-full">
                            <label className="text-sm mb-1 block">
                              Date of exit
                            </label>

                            <select
                              type="text"
                              placeholder="Date of exit"
                              className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                            >
                              <option className="bg-card">Date of exit</option>
                              <option className="bg-card">John Doe</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </FramerAccordian>
                    {/* ctrl btns */}
                    <div className="form-buttons flex justify-between mt-2 mb-4">
                      <button className="py-2 px-4  rounded text-sm  font-medium">
                        Cancel
                      </button>
                      <button
                        className="py-2 px-4 bg-caramel rounded text-sm text-white font-medium"
                        onClick={handleSubmit}
                      >
                        Save next
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* handle duplicate */}
              {activeStep === 3 && (
                <div className="mt-4 pb-6">
                  <div className="px-6 py-3 flex flex-col gap-6">
                    {/* view record box */}
                    <div className="flex flex-col align-center text-center text-xs border border-dotted border-gray-400 px-1 py-2 gap-3 pb-4">
                      <i className="ri-download-2-line text-caramel text-2xl cursor-pointer"></i>
                      <h6 className="text-bold text-base mb-2">
                        The selected file has been imported Successfully.
                      </h6>

                      <div className="button-container mt-2">
                        <button
                          className="py-1 px-2 rounded text-sm text-caramel border font-medium"
                          style={{ borderColor: "var(--caramel)" }}
                        >
                          View Records
                        </button>
                      </div>
                    </div>
                    {/* info section */}
                    <div className="grid grid-cols-2 gap-4">
                      {successInfo.map((item) => (
                        <div>
                          <div
                            key={item.title}
                            className="info-container py-2 px-3 flex items-center justify-between rounded-md bg-white"
                          >
                            <p className="text-slate-400 text-sm">
                              {item.title}
                            </p>
                            <span className="block border-caramel border py-0.5 px-1 rounded-sm text-xs">
                              {item.count}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* ctrl btns */}
                    <div className="form-buttons flex justify-between mt-2 mb-4">
                      <button
                        className="py-2 px-4  rounded text-sm  font-medium border border-black"
                        onClick={handleClose}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Themes>
    </Modal>
  );
};

export default UploadFileModal;
