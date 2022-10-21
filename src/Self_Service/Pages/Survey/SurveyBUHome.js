import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../Layout/DashboardLayout";
import SelfServiceSubNav from "../../Components/SelfServiceSubNav";
import { Popover, Select, Switch, Tooltip } from "antd";
const { Option } = Select;

const SurveyHome = () => {
  const [switchGrid, setSwitchGrid] = useState(true);
  return (
    <DashboardLayout>
      <SelfServiceSubNav />

      <div className="Container">
        <div className="flex items-center gap-3 font-extrabold ">
          <Link to="/self-service/home">
            <i className="ri-arrow-left-s-line text-lg cursor-pointer hover:text-caramel"></i>
          </Link>
          <h5 className="text-xl md:text-2xl text-accent">Survey</h5>
        </div>

        <div className="flex items-center justify-between text-lg font-normal my-5">
          <h4>Templates</h4>

          <Popover
            placement="topLeft"
            content={() => (
              <div>
                <Switch />
              </div>
            )}
            title="Hide all Template"
            trigger="click"
          >
            <i className="ri-more-2-fill text-lg cursor-pointer"></i>
          </Popover>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {[1, 2, 3, 4].map(() => (
            <div className="bg-card shadow-md rounded py-5 px-3 text-center flex flex-col gap-16">
              <h4>Survey Form</h4>

              <h2 className="font-medium text-lg">HR Survey Form</h2>
              <div className="flex items-center justify-between">
                <span className="underline text-sm text-caramel">Edit</span>
                <span className="underline text-sm text-neutral">Delete</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-lg font-normal mb-5 mt-14">
          <h4>Recent Forms</h4>

          <div className="flex items-center gap-3">
            <Select defaultValue="Owned By Me">
              <Option value="Owned By Anyone">Owned By Anyone</Option>
              <Option value="Owned By Me">Owned By Me</Option>
              <Option value="Not Owned By Me">Not Owned By Me</Option>
            </Select>

            {switchGrid ? (
              <Tooltip title="List View">
                <i
                  className="ri-list-unordered text-2xl cursor-pointer"
                  onClick={() => setSwitchGrid(false)}
                ></i>
              </Tooltip>
            ) : (
              <Tooltip title="Grid View">
                <i
                  className="ri-layout-grid-line text-2xl cursor-pointer"
                  onClick={() => setSwitchGrid(true)}
                ></i>
              </Tooltip>
            )}
          </div>
        </div>
        {switchGrid ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {[1, 2, 3, 4].map(() => (
              <div className="bg-card shadow-md rounded py-5 px-3 text-center flex flex-col gap-16">
                <h4>Survey Form</h4>

                <h2 className="font-medium text-lg">HR Survey Form</h2>
                <div className="flex items-center justify-between">
                  <span>Opened DD/MM/YY</span>
                  <Popover
                    content={() => (
                      <div className="flex flex-col gap-3">
                        <span>View</span>
                        <span>Delete</span>
                        <span>Rename</span>
                      </div>
                    )}
                    trigger="click"
                  >
                    <i className="ri-more-2-fill text-lg cursor-pointer"></i>
                  </Popover>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <table className="payroll-table text-accent mt-6">
            <thead>
              <tr>
                <th>Name</th>
                <th>Owner</th>

                <th>Modified</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((item) => (
                <tr key={item}>
                  <td>HR Survey Form</td>
                  <td>Me</td>

                  <td>DD/MM/YY</td>

                  <td>
                    <i className="ri-more-2-fill text-lg"></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SurveyHome;
