import React, { useState } from "react";

// import { Line } from "react-chartjs-2";
import ChartTabHeader, { TChartTabItem } from "./ChartTabHeader";
import { DatePicker } from "antd";
import { Dayjs } from "dayjs";
import { Histogram, LineChart } from "components/charts";
import { generateHexColor } from "utils/colorHelpers/generateHexColor";
import { TCompanyOwnerDashboard } from "features/core/company/types/companyDashboard";

const tabItems: TChartTabItem[] = [
  { name: "Total Active Employees" },
  { name: "Employees per Department" },
  // { name: "Turn Over" },
];
type TProps = {
  year: Dayjs | null;
  setYear: (props: Dayjs | null) => void;
  data?: TCompanyOwnerDashboard["employeesBreakdown"];
};
const EmployeeInfoChart: React.FC<TProps> = ({ setYear, year, data }) => {
  const [activeTab, setActiveTab] = useState<string>(tabItems[0].name);

  return (
    <div style={{ height: "100%" }} className="flex flex-col gap-4">
      <div className="flex gap-6 items-stretch">
        <div className="flex-1">
          <ChartTabHeader
            items={tabItems}
            handleChange={(val) => setActiveTab(val)}
          />
        </div>
        <div>
          <DatePicker
            value={year}
            onChange={(val) => setYear(val)}
            picker="year"
            placeholder="Year"
          />
        </div>
      </div>
      <div style={{ height: "70%" }}>
        {activeTab === tabItems[1].name && (
          <Histogram
            maintainAspectRatio={false}
            data={data ? Object.values(data?.employeesPerDepartment) : []}
            labels={data ? Object.keys(data?.employeesPerDepartment) : []}
            dataEntityLabel="Departments"
            bgColors={
              data
                ? Object.keys(data?.employeesPerDepartment)?.map(
                    (val) => `${generateHexColor(`${val}`)}`
                  )
                : undefined
            }
          />
        )}
        {activeTab === tabItems[0].name && (
          <LineChart
            maintainAspectRatio={false}
            data={data ? Object.values(data?.totalActiveEmployees) : []}
            labels={data ? Object.keys(data?.totalActiveEmployees) : []}
            dataEntityLabel="Active Employees"
            bgColors={`#ff6647`}
          />
        )}
      </div>
    </div>
  );
};

export default EmployeeInfoChart;
