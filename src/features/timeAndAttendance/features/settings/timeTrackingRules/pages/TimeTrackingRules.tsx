import { AppButton } from "components/button/AppButton";
import { useState } from "react";
// import "../../assets/style.css";
import { radioFormOptions } from "features/timeAndAttendance/constants";
import checkboxBase from "../../../../assets/images/CheckboxBase.svg";

import faceReg from "../../../../assets/images/lucide_scan-face.svg";
import locationIcon from "../../../../assets/images/symbols_location.svg";
import editPenIcon from "../../../../assets/images/edit-outline.svg";
import { Empty } from "antd";
import { ScaleLoader } from "react-spinners";
import { AttendanceSettingsIntro } from "../../components/AttendanceSettingsIntro";
import { CreateTrackingRule } from "../components/CreateTrackingRule";
import { TimeAttendanceSettingsNav } from "../../components/TimeAttendanceSettingsNav";
import { useGetActiveTrackingPolicy } from "../hooks/useGetActiveTrackingPolicy";

const TimeTrackingRules = () => {
  const [openAddTRule, setOpenAddTRule] = useState<boolean>(false);
  const { data, isLoading } = useGetActiveTrackingPolicy();

  return (
    <>
      <TimeAttendanceSettingsNav active={"time tracking rules"} />

      <AttendanceSettingsIntro
        title="Time tracking policies"
        description="Take control of how your team members clock in and out. Choose from presets and make advanced changes Later."
      />

      <CreateTrackingRule
        open={openAddTRule}
        handleClose={() => setOpenAddTRule(false)}
      />

      <div className="Container mt-2">
        <div className="flex justify-end">
          <AppButton
            label="Set Time Policy"
            handleClick={() => setOpenAddTRule(true)}
          />
        </div>
        <div className="flex justify-center mt-5">
          <ScaleLoader color="var(--caramel)" loading={isLoading} />
        </div>
        <div className="mt-6">
          <div>
            {radioFormOptions
              .filter((option) => option.id === data?.id)
              .map((option) => (
                <label
                  key={option.value}
                  htmlFor={option.value}
                  className="relative flex flex-col bg-white p-4 rounded-lg shadow-sm border border-gray-300 my-5"
                >
                  <div className="flex justify-between mb-4">
                    <div className="flex items-center gap-x-3">
                      <div className="text-sm">
                        <span className="font-medium text-orange-600">
                          {option.label}
                        </span>
                        <p className="pt-1">{option.description}</p>
                      </div>
                    </div>

                    <img
                      src={checkboxBase}
                      alt="checkbox"
                      className="h-4 mt-1"
                    />
                  </div>
                  <div className="px-10">
                    <hr />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-7 lg:gap-y-3 lg:gap-x-3 mt-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={faceReg}
                        alt="face recognition"
                        className="h-11"
                      />
                      <div>
                        <h3 className="font-medium text-base">
                          {option.faceRTitle}
                        </h3>
                        <p className="text-xs pt-1">{option.faceRDes}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={locationIcon} alt="GPS" className="h-11" />
                      <div>
                        <h3 className="font-medium text-base">
                          {option.locationTitle}
                        </h3>
                        <p className="text-xs pt-1">Goefence disable</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src={editPenIcon}
                        alt="Editable Time Entries"
                        className="h-11"
                      />
                      <div>
                        <h3 className="font-medium text-base">
                          Editable Time Entries
                        </h3>
                      </div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="plan"
                    id={option.value}
                    value={option.id}
                    className="absolute h-0 w-0 appearance-none"
                    disabled
                  />
                  <span
                    style={{ background: "#fff" }}
                    aria-hidden="true"
                    className="hidden absolute inset-0 border pl-4 bg-opacity-1 border-caramel rounded-lg"
                  >
                    <div className="flex items-center gap-x-3 mt-3 mb-4">
                      <div className="text-sm">
                        <span className="font-medium text-orange-600">
                          {option.label}
                        </span>
                        <p className="pt-1">{option.description}</p>
                      </div>
                    </div>
                    <span className="absolute top-4 right-4 h-4 w-4 mt-2 inline-flex items-center justify-center rounded-full bg-caramel">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5 text-white"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <div className="px-10">
                      <hr />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-7 lg:gap-y-3 lg:gap-x-3 mt-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={faceReg}
                          alt="face recognition"
                          className="h-11"
                        />
                        <div>
                          <h3 className="font-medium text-base">
                            {option.faceRTitle}
                          </h3>
                          <p className="text-xs pt-1">{option.faceRDes}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src={locationIcon} alt="GPS" className="h-11" />
                        <div>
                          <h3 className="font-medium text-base">
                            {option.locationTitle}
                          </h3>
                          <p className="text-xs pt-1">Goefence disable</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <img
                          src={editPenIcon}
                          alt="Editable Time Entries"
                          className="h-11"
                        />
                        <div>
                          <h3 className="font-medium text-base">
                            Editable Time Entries
                          </h3>
                        </div>
                      </div>
                    </div>
                  </span>
                </label>
              ))}
            {!isLoading && (
              <div className="flex justify-center mt-2">
                <button
                  onClick={() => setOpenAddTRule(true)}
                  className="hover:border-caramel justify-center shadow border rounded px-3 border-slate-300 flex items-center gap-x-2"
                >
                  <i className="ri-pencil-line text-lg"></i> <span>Change</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeTrackingRules;
