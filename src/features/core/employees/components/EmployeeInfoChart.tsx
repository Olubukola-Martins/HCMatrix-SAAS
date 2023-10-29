import React, { useState } from "react";

// import { Line } from "react-chartjs-2";
import ChartTabHeader, { TChartTabItem } from "./ChartTabHeader";
import { DatePicker } from "antd";
import moment, { Moment } from "moment";
import { Histogram, LineChart } from "components/charts";
import { generateHexColor } from "utils/colorHelpers/generateHexColor";

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "November",
  "December",
];
const tabItems: TChartTabItem[] = [
  { name: "Total Active Employees" },
  { name: "Employees per Department" },
  // { name: "Turn Over" },
];
const EmployeeInfoChart = () => {
  const [year, setYear] = useState<Moment | null>(moment());
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
            data={[30, 10, 67, 30, 10, 67]}
            labels={[
              "Human Resources",
              "IT",
              "Sales",
              "Marketing",
              "Finance",
              "Admin",
            ]}
            dataEntityLabel="Departments"
            bgColors={[
              "Human Resources",
              "IT",
              "Sales",
              "Marketing",
              "Finance",
              "Admin",
            ].map((val) => `${generateHexColor(`${val}`)}`)}
          />
        )}
        {activeTab === tabItems[0].name && (
          <LineChart
            maintainAspectRatio={false}
            data={[30, 10, 67, 30, 10, 67, 30, 5, 98, 120]}
            labels={labels}
            dataEntityLabel="Employees"
            bgColors={`#ff6647`}
          />
        )}
      </div>
    </div>
  );
};

export default EmployeeInfoChart;
