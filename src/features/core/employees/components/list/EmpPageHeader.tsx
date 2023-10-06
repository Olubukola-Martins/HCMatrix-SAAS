import { ExportOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Button } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AddMultipleEmployees } from "../AddMultipleEmployees";
import FilterEmployeeDrawer from "../FilterEmployeeDrawer";
import { PageIntro } from "components/layout/PageIntro";
import ImportEmployees from "../bulkImport/ImportEmployees";

// TODO: Use +234 in number imports as opposed to country name

// Personal
// Job
// Employee Info - add branch
// Emergency Contact

// thehcmsnapnetsolutionsdb

// TODO: Update Activity log

// TODO: Probably weekend work on aws: fin: cloud practitioner this week
// TODO: For holiday, refactor input to be a datepicker(month), and a day(with validation based on month picked)

// TODO: Work on add single employee, refactor
// TODO: Also ability to change employee status, and the different statuses [probation, active, inactive{on-leave}, disengaged]
// TODO: Also ability to delete employee provided there are no connections
// TODO: Implement BUlk actions for employee table like add 2 department, assign job, refer to hcm v2, ... assign line manager

type TAction = "bulk-import" | "invite" | "filter-employees" | "test-import";
const EmpPageHeader = () => {
  const [action, setAction] = useState<TAction>();
  const clearAction = () => {
    setAction(undefined);
  };
  return (
    <>
      {/* TODO: Test and implement bulk upload */}

      {/* TODO: Implement filter for employees, as per by department, expatriate, role */}
      <FilterEmployeeDrawer
        open={action === "filter-employees"}
        handleClose={clearAction}
      />
      <AddMultipleEmployees
        open={action === "invite"}
        handleClose={clearAction}
      />
      <ImportEmployees
        open={action === "bulk-import"}
        handleClose={clearAction}
      />
      <div className="flex justify-between">
        <PageIntro title="Employees" link="/settings" />
        <div className="flex items-center gap-3">
          {/* TODO: Create an Export Modal to allow for filtering before export */}
          <Button
            icon={<ExportOutlined />}
            type="text"
            title="Export Employee Data"
          />
          {/* TODO: Reafactor to Be a Dropdown Btn */}
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  <Link to="/settings/add-employee">Add Single Employee</Link>
                </Menu.Item>
                <Menu.Item onClick={() => setAction("invite")}>
                  Invite Multiple Users
                </Menu.Item>
                <Menu.Item onClick={() => setAction("bulk-import")}>
                  Import Employees
                </Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <button className="button flex items-center gap-2">
              <span>Add Employees</span>{" "}
              <i className="fa-solid fa-chevron-down"></i>
            </button>
          </Dropdown>

          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>Import from GApps</Menu.Item>
                <Menu.Item>Import from Office 365</Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <button className="transparentButton flex items-center gap-2">
              <span>Sync</span> <i className="fa-solid fa-chevron-down"></i>
            </button>
          </Dropdown>
          {/* <Button
            icon={<FilterOutlined />}
            type="text"
            onClick={() => setOpenF(true)}
            title="Filter Employees"
          /> */}
          <button
            className="transparentButton flex items-center gap-2"
            onClick={() => setAction("filter-employees")}
          >
            <span>Filter</span>
          </button>

          {/* <Button
            icon={<QuestionCircleFilled />}
            type="text"
            title="Provides information on page"
          /> */}
        </div>
      </div>
    </>
  );
};

export default EmpPageHeader;
