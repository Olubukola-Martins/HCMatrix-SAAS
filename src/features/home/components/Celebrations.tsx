import { Tabs } from "antd";
import { Birthdays } from "./Birthdays";
import { Holidays } from "./Holidays";
import { WorkAnniversary } from "./WorkAnniversary";
import { useFetchEmployees } from "features/core/employees/hooks/useFetchEmployees";

export const Celebrations = () => {
  const { data, isLoading } = useFetchEmployees();
  return (
    <div>
      <h3 className="pb-1 font-medium">Celebrations & Holidays</h3>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "Birthdays",
            label: "Birthdays",
            children: (
              <Birthdays
                data={data?.data.map((item) => ({ ...item, dob: "8/9/01" }))}
                loading={isLoading}
              />
            ),
          },
          {
            key: "Work Anniversaries",
            label: "Work Anniversaries",
            children: (
              <WorkAnniversary
                data={data?.data.map((item) => ({
                  ...item,
                  startDate: "8/9/01",
                }))}
                loading={isLoading}
              />
            ),
          },
          {
            key: "Holidays",
            label: "Holidays",
            children: (
              <Holidays
                data={[
                  { date: "8/9/01", id: 0, title: "Salah" },
                  { date: "3/1/01", id: 0, title: "Easter" },
                ]}
                loading={isLoading}
              />
            ),
          },
        ]}
      />
    </div>
  );
};
