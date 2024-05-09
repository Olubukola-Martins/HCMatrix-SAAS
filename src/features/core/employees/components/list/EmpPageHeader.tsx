import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AddMultipleEmployees } from "../AddMultipleEmployees";
import FilterEmployeeDrawer from "../FilterEmployeeDrawer";
import { PageIntro } from "components/layout/PageIntro";
import ImportEmployees from "../bulkImport/ImportEmployees";
import { TEmployeeFilterProps } from "../../types/employee-filter";
import DropdownButton from "components/button/DropdownButton";
import ExportEmployees from "./export/ExportEmployees";

type TAction = "bulk-import" | "invite" | "filter-employees" | "test-import";
const EmpPageHeader: React.FC<{
  handleFilter: (props: TEmployeeFilterProps) => void;
}> = ({ handleFilter }) => {
  const [action, setAction] = useState<TAction>();
  const clearAction = () => {
    setAction(undefined);
  };
  return (
    <>
      <FilterEmployeeDrawer
        open={action === "filter-employees"}
        handleClose={clearAction}
        handleFilter={handleFilter}
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
          <ExportEmployees />
          <DropdownButton
            label="Add Employee"
            items={[
              {
                label: (
                  <Link to="/settings/add-employee">Add Single Employee</Link>
                ),
                key: "Add employee",
              },
              {
                key: "invite",
                label: "Invite Multiple Employees",
                onClick: () => setAction("invite"),
              },
              {
                key: "bulk-import",
                label: "Import Employees",
                onClick: () => setAction("bulk-import"),
              },
            ]}
          />

          {/* <Dropdown
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
          </Dropdown> */}
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
