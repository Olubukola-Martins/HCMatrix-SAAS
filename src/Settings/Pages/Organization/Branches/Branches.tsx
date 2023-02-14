import { Dropdown, Menu } from "antd";
import { appRoutes } from "AppRoutes";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AddBranchModal } from "Settings/Components/Organization/Branches/AddBranchModal";
import BranchesViewContainer from "Settings/Components/Organization/Branches/BranchesViewContainer";
import { ImportBranchModal } from "Settings/Components/Organization/Branches/ImportBranchModal";
import { PageIntro } from "../../../../Layout/Components/PageIntro";
import DashboardLayout from "../../../../Layout/DashboardLayout";

const Branches = () => {
  const [showA, setShowA] = useState(false);
  const [showI, setShowI] = useState(false);

  return (
    <DashboardLayout>
      <AddBranchModal open={showA} handleClose={() => setShowA(false)} />
      <ImportBranchModal open={showI} handleClose={() => setShowI(false)} />

      <div className="Container">
        {
          <div className="mt-4">
            <PageIntro title="Branches" link={appRoutes.settings} />
            <div className="flex flex-col mt-4 gap-2 md:flex-row md:justify-between md:items-center bg-card p-2 rounded text-sm">
              <p>Manage all the branches in your organization.</p>

              <div className="flex gap-4 items-center">
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item onClick={() => setShowA(true)}>
                        Add Branch
                      </Menu.Item>
                      <Menu.Item onClick={() => setShowI(true)}>
                        Import Branches
                      </Menu.Item>
                    </Menu>
                  }
                  trigger={["click"]}
                >
                  <button className="py-1 px-2 bg-caramel rounded text-sm text-white font-medium flex items-center gap-2">
                    <span>Add Branch(es)</span>{" "}
                    <i className="fa-solid fa-chevron-down"></i>
                  </button>
                </Dropdown>
              </div>
            </div>
            <BranchesViewContainer />
          </div>
        }
      </div>
    </DashboardLayout>
  );
};

export default Branches;
