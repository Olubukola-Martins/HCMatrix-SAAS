import { Collapse } from "antd";
import { UserOneBriefInfoCards } from "components/cards/UserOneBriefInfoCard";
import { TCompanyEmployeeDashboard } from "features/core/company/types/companyDashboard";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import moment from "moment";

import { truncateString } from "utils/dataHelpers/truncateString";
const { Panel } = Collapse;

export const Birthdays: React.FC<{
  data?: TCompanyEmployeeDashboard["celebrationsAndHolidays"]["birthdays"];
}> = ({ data }) => {
  return (
    <div>
      <>
        {" "}
        <Collapse>
          <Panel header="Birthdays" key="1">
            {data && data.today.length === 0 && (
              <h4 className="text-gray-300 text-xl text-center py-5">
                No Birthdays Today!
              </h4>
            )}
            {/* TODO: use a scroll area to ensure that overflow is visible */}

            {data && data.today.length > 0 && (
              <UserOneBriefInfoCards
                data={data.today.map((item) => ({
                  info: moment(item.dob).format("MMMM DD"),

                  name: truncateString(getEmployeeFullName(item.employee), 12),
                  avatarUrl: item.employee.avatarUrl,
                }))}
              />
            )}
          </Panel>
          <Panel header="Upcoming Birthdays" key="2">
            {data && data.upcoming.length === 0 && (
              <h4 className="text-gray-300 text-xl text-center py-5">
                No Upcoming Birthday
              </h4>
            )}
            {/* TODO: use a scroll area to ensure that overflow is visible */}

            {data && data.upcoming.length > 0 && (
              <UserOneBriefInfoCards
                data={data.today.map((item) => ({
                  info: moment(item.dob).format("MMMM DD"),
                  name: truncateString(getEmployeeFullName(item.employee), 12),
                  avatarUrl: item.employee.avatarUrl,
                }))}
              />
            )}
          </Panel>
        </Collapse>
      </>
    </div>
  );
};
