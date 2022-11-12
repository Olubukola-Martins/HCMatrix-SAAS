import { useState } from "react";
import { Dropdown, Switch, Tabs, Tooltip } from "antd";
import { PageIntro } from "../../../../Layout/Components/PageIntro";
import DashboardLayout from "../../../../Layout/DashboardLayout";
import { EducationDetails } from "../../../Components/Organization/EmployeeProfiles/MyProfile/Background/EducationDetails";
import { EmploymentHistory } from "../../../Components/Organization/EmployeeProfiles/MyProfile/Background/EmploymentHistory";
import { Skills } from "../../../Components/Organization/EmployeeProfiles/MyProfile/Background/Skills";
import { Finance } from "../../../Components/Organization/EmployeeProfiles/MyProfile/Finance";
import { FingerPrint } from "../../../Components/Organization/EmployeeProfiles/MyProfile/FingerPrint";
import { JobInformation } from "../../../Components/Organization/EmployeeProfiles/MyProfile/JobInformation";
import { DirectReports } from "../../../Components/Organization/EmployeeProfiles/MyProfile/ManagerDirectReport/DirectReports";
import { Managers } from "../../../Components/Organization/EmployeeProfiles/MyProfile/ManagerDirectReport/Managers";
import { Dependents } from "../../../Components/Organization/EmployeeProfiles/MyProfile/Profile/Dependents";
import { EmergencyContact } from "../../../Components/Organization/EmployeeProfiles/MyProfile/Profile/EmergencyContact";
import { Profile } from "../../../Components/Organization/EmployeeProfiles/MyProfile/Profile/Profile";
import { UserGroups } from "../../../Components/Organization/EmployeeProfiles/MyProfile/UserGroups";
import { EditMyProfile } from "../../../Components/Organization/EmployeeProfiles/MyProfile/EditMyProfile";
import { Resignation } from "../../../Components/Organization/EmployeeProfiles/MyProfile/Resignation";

export const MyProfile = () => {
  const [role, setRole] = useState("employee");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openResignation, setOpenResignation] = useState(false);
  return (
    <DashboardLayout>
      <div className="Container mt-3">
        <PageIntro title="Profile" link="/" />
        <EditMyProfile
          open={openDrawer}
          handleClose={() => setOpenDrawer(false)}
        />
        <Resignation
          open={openResignation}
          handleClose={() => setOpenResignation(false)}
        />
        <div className="bg-card p-5 mt-5">
          <div className="bg-mainBg shadow-sm rounded-md p-4 flex gap-3 justify-between">
            <div className="flex gap-3 items-center">
              <img
                src="https://res.cloudinary.com/ddvaelej7/image/upload/v1639659955/HCmatrix/User-Icon_wdkmsf.png"
                alt="user"
                className="h-24"
              />
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-medium">Isaac Temi</h3>
                <h4 className="font-medium">UI Designer | CSI</h4>
                <h5 className="text-sm">Manager</h5>
                <div className="text-sm flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <i className="ri-mail-line text-caramel"></i>
                    <span>isaactemi@gmail.com | </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-phone-line text-caramel"></i>
                    <span> 09023865543 | </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-map-pin-line text-caramel"></i>
                    <span>1B Ayobami Shonuga </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 text-xl">
              <Tooltip title="Edit">
                <i
                  className="ri-pencil-line cursor-pointer hover:text-caramel"
                  onClick={() => setOpenDrawer(true)}
                ></i>
              </Tooltip>
              <Dropdown
                overlay={
                  <div>
                    {role === "admin" && (
                      <ul className="bg-mainBg rounded border shadow-sm p-2 flex gap-1 flex-col mb-2">
                        <li className="flex items-center gap-3">
                          <span>Enable Self Service</span>
                          <Switch size="small" defaultChecked />
                        </li>
                        <li className="cursor-pointer hover:text-caramel">
                          Enable User
                        </li>
                        <li className="cursor-pointer hover:text-caramel">
                          Suspend User
                        </li>
                      </ul>
                    )}

                    {role === "employee" && (
                      <ul className="bg-mainBg rounded border shadow-sm p-2  mb-2">
                        <li
                          onClick={() => setOpenResignation(true)}
                          className="cursor-pointer hover:text-caramel"
                        >
                          Submit Resignation
                        </li>
                      </ul>
                    )}
                  </div>
                }
                placement="topLeft"
                trigger={["click"]}
              >
                <i className="ri-more-2-fill cursor-pointer hover:text-caramel"></i>
              </Dropdown>
            </div>
          </div>
          <Tabs defaultActiveKey="1" className="mt-5 tabBlackActive">
            <Tabs.TabPane tab="Profile" key="1">
              <Profile />
              <EmergencyContact />
              <Dependents />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Job Information" key="2">
              <JobInformation />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Finance" key="8">
              <Finance />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Background" key="3">
              <div className="bg-mainBg shadow-sm rounded-md py-6 px-4 mt-5">
                <EmploymentHistory />
                <EducationDetails />
                <Skills />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Manager(s)/Direct Report(s)" key="4">
              <div className="bg-mainBg shadow-sm rounded-md py-6 px-4 mt-5">
                <Managers />
                <DirectReports />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="User Groups" key="5">
              <UserGroups />
            </Tabs.TabPane>
            <Tabs.TabPane tab="History" key="6">
              History
            </Tabs.TabPane>
            <Tabs.TabPane tab="Finger Prints" key="7">
              <FingerPrint />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};
