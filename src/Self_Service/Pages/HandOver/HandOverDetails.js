import { Checkbox } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../Layout/DashboardLayout";
import SelfServiceSubNav from "../../Components/SelfServiceSubNav";

const HandOverDetails = () => {
  const boxStyle = "px-4 py-3 shadow rounded-md bg-mainBg";
  const boxTitle = "font-medium text-base pb-1";
  const inputStyle =
    "w-full rounded-md border border-gray-300 py-2 px-2 text-sm bg-mainBg focus:outline-none placeholder:text-accent";
  const assetCheckListWrap = "flex flex-col";
  return (
    <DashboardLayout>
      <SelfServiceSubNav />
      <div className="Container">
        <div className="flex items-center gap-3 font-extrabold ">
          <Link to="/self-service/home">
            <i className="ri-arrow-left-s-line text-lg cursor-pointer hover:text-caramel"></i>
          </Link>
          <h2 className="text-xl md:text-2xl text-accent">Hand Over Details</h2>
        </div>
        <div className="bg-card px-5 py-7  rounded-md mt-7 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-accent">
            {/* first grid */}
            <div className="flex flex-col gap-4">
              <div className={boxStyle}>
                <h5 className={boxTitle}>Separation Date</h5>
                <input
                  type="text"
                  className={inputStyle}
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  placeholder="DD/MM/YY"
                />
              </div>
              <div className={boxStyle}>
                <h5 className={boxTitle}>Notice Period</h5>
                <input
                  type="text"
                  className={inputStyle}
                  placeholder="2 weeks"
                />
              </div>
              <div className={boxStyle}>
                <h5 className={boxTitle}>Reason for leaving</h5>
                <input
                  type="text"
                  className={inputStyle}
                  placeholder="Lorem Ipsum Dolor Amiet sit"
                />
              </div>
              <div className={boxStyle}>
                <h5 className={boxTitle}>
                  Will you continue to work at this company?
                </h5>
                <input
                  type="text"
                  className={inputStyle}
                  placeholder="Lorem Ipsum Dolor Amiet sit"
                />
              </div>

              <div className={boxStyle}>
                <h5 className={boxTitle}>
                  What about the company did you like the most?
                </h5>
                <input
                  type="text"
                  className={inputStyle}
                  placeholder="Lorem Ipsum Dolor Amiet sit"
                />
              </div>
              <div className={boxStyle}>
                <h5 className={boxTitle}>
                  What do you think the company should do to enhance employees
                  welfare
                </h5>
                <input
                  type="text"
                  className={inputStyle}
                  placeholder="Lorem Ipsum Dolor Amiet sit"
                />
              </div>
              <div className={boxStyle}>
                <h5 className={boxTitle}>
                  Any other thing you wish to share with us?
                </h5>
                <input
                  type="text"
                  className={inputStyle}
                  placeholder="Lorem Ipsum Dolor Amiet sit"
                />
              </div>
            </div>

            {/* second grid */}
            <div className="flex flex-col gap-4">
              <div className={boxStyle}>
                <h5 className={boxTitle}>Asset Checklist</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {/* 1 */}
                  <div className={`${assetCheckListWrap} gap-2`}>
                    <div className="flex gap-2 border-b pb-2">
                      <Checkbox checked />
                      <div className={`${assetCheckListWrap} gap-1`}>
                        <span>Company Vehicle </span>
                        <span>Name: Toyota Camry (00000)</span>
                        <span>ID: #00000</span>
                      </div>
                    </div>
                    <div className="flex gap-2 border-b pb-2">
                      <Checkbox />
                      <div className={`${assetCheckListWrap} gap-1`}>
                        <span>Company Vehicle </span>
                        <span>Name: Toyota Camry (00000)</span>
                        <span>ID: #00000</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Checkbox />
                      <div className={`${assetCheckListWrap} gap-1`}>
                        <span>Company Vehicle </span>
                        <span>Name: Toyota Camry (00000)</span>
                        <span>ID: #00000</span>
                      </div>
                    </div>
                  </div>
                  {/* 2 */}
                  <div className={`${assetCheckListWrap} gap-2`}>
                    <div className="flex gap-2 border-b pb-2">
                      <Checkbox />
                      <div className={`${assetCheckListWrap} gap-1`}>
                        <span>Company Vehicle </span>
                        <span>Name: Toyota Camry (00000)</span>
                        <span>ID: #00000</span>
                      </div>
                    </div>
                    <div className="flex gap-2 border-b pb-2">
                      <Checkbox />
                      <div className={`${assetCheckListWrap} gap-1`}>
                        <span>Company Vehicle </span>
                        <span>Name: Toyota Camry (00000)</span>
                        <span>ID: #00000</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Checkbox />
                      <div className={`${assetCheckListWrap} gap-1`}>
                        <span>Company Vehicle </span>
                        <span>Name: Toyota Camry (00000)</span>
                        <span>ID: #00000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={boxStyle}>
                <h5 className={boxTitle}>Upload Supporting Document</h5>
                <input
                  type="text"
                  className={inputStyle}
                  onFocus={(e) => (e.target.type = "file")}
                  onBlur={(e) => (e.target.type = "text")}
                  placeholder="xxxxxxxx.Pdf"
                />
              </div>
              <div className={boxStyle}>
                <h5 className={boxTitle}>Manager/Supervisor Clearance</h5>
                <input
                  type="text"
                  className={inputStyle}
                  onFocus={(e) => (e.target.type = "file")}
                  onBlur={(e) => (e.target.type = "text")}
                  placeholder="xxxxxxxx.Pdf"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-5">
            <button type="submit" className="transparentButton text-neutral">
              Reject
            </button>
            <button type="submit" className="button">
              Approve
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HandOverDetails;
