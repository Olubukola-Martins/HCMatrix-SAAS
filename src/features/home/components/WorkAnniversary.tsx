import { Collapse } from "antd";
import { UserOneBriefInfoCards } from "components/cards/UserOneBriefInfoCard";
import { TCompanyEmployeeDashboard } from "features/core/company/types/companyDashboard";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import moment from "moment";

import { truncateString } from "utils/dataHelpers/truncateString";
const { Panel } = Collapse;

export const WorkAnniversary: React.FC<{
  data?: TCompanyEmployeeDashboard["celebrationsAndHolidays"]["workAnniversaries"];
}> = ({ data }) => {
  return (
    <div>
      <>
        {" "}
        <Collapse>
          <Panel header="Work Anniversaries" key="1">
            {data && data.length === 0 && (
              <h4 className="text-gray-300 text-xl text-center py-5">
                No Work Anniversaries Today!
              </h4>
            )}
            {data && data.length > 0 && (
              <UserOneBriefInfoCards
                data={data.map((item) => ({
                  info: moment(item.startDate).format("MMMM DD"),

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
