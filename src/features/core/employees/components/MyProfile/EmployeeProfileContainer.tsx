import { useContext, useState } from "react";
import { Dropdown, Switch, Tabs, Tooltip } from "antd";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { useFetchSingleEmployee } from "../../hooks/useFetchSingleEmployee";
import { EducationDetails } from "./Background/EducationDetails";
import { EmploymentHistory } from "./Background/EmploymentHistory";
import { Skills } from "./Background/Skills";
import { EditMyProfile } from "./EditMyProfile";
import { Finance } from "./Finance";
import { FingerPrint } from "./FingerPrint";
import { DisciplinaryHistory } from "./History/DisciplinaryHistory";
import { PromotionHistory } from "./History/PromotionHistory";
import { RoleHistory } from "./History/RoleHistory";
import { TrainingHistory } from "./History/TrainingHistory";
import { JobInformation } from "./JobInformation";
import { DirectReports } from "./ManagerDirectReport/DirectReports";
import { Managers } from "./ManagerDirectReport/Managers";
import { MedicalHistory } from "./MedicalHistory/MedicalHistory";
import { Dependents } from "./Profile/Dependents";
import { EmergencyContact } from "./Profile/EmergencyContact";
import { Profile } from "./Profile/Profile";
import { Resignation } from "./Resignation";
import { UserGroups } from "./UserGroups";
import { DEFAULT_PROFILE_IMAGE_URL } from "constants/general";
import { IAuthDets } from "features/authentication/types";
import { useAuthUser } from "react-auth-kit";
import { GlobalContext } from "stateManagers/GlobalContextProvider";
import { useApiAuth } from "hooks/useApiAuth";
import { EmployeeProjects } from "./EmployeeProjects";

export const EmployeeProfileContainer = ({
  employeeId,
}: {
  employeeId: number;
}) => {
  const { data: employee } = useFetchSingleEmployee({
    employeeId: employeeId ? +employeeId : 0,
  });
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openResignation, setOpenResignation] = useState(false);

  const auth = useAuthUser();
  const authDetails = auth() as unknown as IAuthDets;
  const companies = authDetails?.companies;
  const { companyId } = useApiAuth();

  const currentCompany = companies.find((item) => item.companyId === companyId);

  return (
    <>
      <div className="Container mt-3">
        <PageIntro title="Employee Profile" link={appRoutes.employeeSettings} />
        <EditMyProfile
          open={openDrawer}
          employee={employee}
          handleClose={() => setOpenDrawer(false)}
        />
        <Resignation
          open={openResignation}
          handleClose={() => setOpenResignation(false)}
        />
        <div className="bg-card p-1 md:p-5 mt-5">
          <div className="bg-mainBg shadow-sm rounded-md p-4 flex gap-3 justify-between">
            <div className="flex gap-3 items-center md:flex-row flex-col">
              <img
                src={
                  !!employee?.avatarUrl
                    ? employee?.avatarUrl
                    : DEFAULT_PROFILE_IMAGE_URL
                }
                alt={employee?.firstName}
                className="h-24"
              />

              <div className="flex flex-col gap-1 text-accent">
                <h3 className="text-lg font-medium text-accent">
                  {employee?.firstName} {employee?.lastName}
                </h3>
                <h4 className="font-medium text-accent">
                  {employee?.designation?.name ?? "_"} |{" "}
                  {employee?.designation?.department?.name ?? "_"}
                </h4>
                <h5 className="text-sm text-accent">
                  {typeof employee?.role === "string"
                    ? employee?.role
                    : employee?.role.name}
                </h5>
                <div className="text-sm flex md:items-center gap-3 md:flex-row flex-col mt-1">
                  <div className="flex items-center gap-2">
                    <i className="ri-profile-line text-caramel"></i>
                    <span>{employee?.empUid} | </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-mail-line text-caramel"></i>
                    <span>{employee?.email} | </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-phone-line text-caramel"></i>
                    <span> {employee?.personalInformation?.phoneNumber}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <i className="ri-map-pin-line text-caramel"></i>
                  <span>
                    {employee?.personalInformation?.address.streetAddress}{" "}
                  </span>
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
                    {currentCompany?.role.name === "admin" && (
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

                    {currentCompany?.role.name === "employee" && (
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
              <Profile employee={employee} />
              <EmergencyContact employee={employee} />
              <Dependents employee={employee} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Job Information" key="2">
              <JobInformation employee={employee} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Finance" key="8">
              <Finance employee={employee} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Background" key="3">
              <div className="bg-mainBg shadow-sm rounded-md py-6 px-4 mt-5">
                <EmploymentHistory employee={employee} />
                <EducationDetails employee={employee} />
                <Skills employee={employee} />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Manager(s)/Direct Report(s)" key="4">
              <div className="bg-mainBg shadow-sm rounded-md py-6 px-4 mt-5">
                <Managers employee={employee} />
                <DirectReports employee={employee} />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="User Groups" key="5">
              <UserGroups employee={employee} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="History" key="6">
              <div className="bg-mainBg shadow-sm rounded-md py-6 md:px-4 mt-5">
                <RoleHistory />
                <PromotionHistory />
                <TrainingHistory />
                <DisciplinaryHistory />
                <MedicalHistory />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Finger Prints" key="7">
              <FingerPrint />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Projects" key="90">
              <EmployeeProjects
                data={[
                  {
                    endDate: "3/7/2023",
                    startDate: "3/7/2023",
                    grossIncome: 505000,
                    id: 1,
                    name: "HcMatrix",
                    noOfPaymentsMade: "2 out of 4",
                    totalPaid: 2 * 505000,
                  },
                ]}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};
