import { ExportOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Button } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AddMultipleEmployees } from "../AddMultipleEmployees";
import FilterEmployeeDrawer from "../FilterEmployeeDrawer";
import UploadFileModal from "../UploadFileModal";
import { PageIntro } from "components/layout/PageIntro";

const EmpPageHeader = () => {
  const [importEmployeeDrawer, setImportEmployeeDrawer] = useState(false);
  const [openF, setOpenF] = useState(false);

  const [addMEmployees, setAddMEmployees] = useState(false);
  return (
    <>
      <UploadFileModal
        open={importEmployeeDrawer}
        handleClose={() => setImportEmployeeDrawer(false)}
      />
      <FilterEmployeeDrawer open={openF} handleClose={() => setOpenF(false)} />
      <AddMultipleEmployees
        open={addMEmployees}
        handleClose={() => setAddMEmployees(false)}
      />
      <div className="flex justify-between">
        <PageIntro title="Employees" link="/settings" />
        <div className="flex items-center gap-3">
          <Button
            icon={<ExportOutlined />}
            type="text"
            title="Export Employee Data"
          />
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  <Link to="/settings/add-employee">Add Single Employee</Link>
                </Menu.Item>
                <Menu.Item onClick={() => setAddMEmployees(true)}>
                  Invite Multiple Users
                </Menu.Item>
                <Menu.Item onClick={() => setImportEmployeeDrawer(true)}>
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
            onClick={() => setOpenF(true)}
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
