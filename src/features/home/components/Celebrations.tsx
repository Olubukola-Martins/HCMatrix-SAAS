import { Tabs } from "antd";
import { Birthdays } from "./Birthdays";
import { Holidays } from "./Holidays";
import { WorkAnniversary } from "./WorkAnniversary";
import { TCompanyEmployeeDashboard } from "features/core/company/types/companyDashboard";

export const Celebrations: React.FC<{
  data?: TCompanyEmployeeDashboard["celebrationsAndHolidays"];
}> = ({ data }) => {
  return (
    <div>
      <h3 className="pb-1 font-medium">Celebrations & Holidays</h3>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "Birthdays",
            label: "Birthdays",
            children: <Birthdays data={data?.birthdays} />,
          },
          {
            key: "Work Anniversaries",
            label: "Work Anniversaries",
            children: <WorkAnniversary data={data?.workAnniversaries} />,
          },
          {
            key: "Holidays",
            label: "Holidays",
            children: (
              <Holidays
                data={data?.holidays.map((item, i) => ({
                  date: item.date,
                  title: item.title,
                  id: i,
                }))}
              />
            ),
          },
        ]}
      />
    </div>
  );
};
