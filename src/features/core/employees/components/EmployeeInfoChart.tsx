import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ChartTabHeader, { TChartTabItem } from "./ChartTabHeader";
import { Select } from "antd";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
  { name: "Total Active Employees", handleClick: () => {} },
  { name: "Employees per Department", handleClick: () => {} },
  { name: "Turn Over", handleClick: () => {} },
];
const EmployeeInfoChart = () => {
  return (
    <div style={{ height: "100%" }} className="flex flex-col gap-4">
      <div className="flex gap-6 items-stretch">
        <div className="flex-1">
          <ChartTabHeader items={tabItems} />
        </div>
        <div>
          <Select
            placeholder="Yearly Report"
            options={[
              {
                label: "Last 12 months",
                value: "2022",
              },
              {
                label: "2021",
                value: "2021",
              },
            ]}
            size="small"
          />
        </div>
      </div>
      <div style={{ height: "100%" }}>
        <Line
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: "#b2beb5",
                },
              },
              x: {
                beginAtZero: true,
                grid: {
                  color: "#b2beb5",
                },
              },
            },
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: false,
                text: "Net Income",
              },
            },
          }}
          data={{
            labels,
            datasets: [
              {
                label: "",
                data: [1, 2, 5, 8, 10, 9, 7, 0, 5, 1, 12, 2, 30],
                borderColor: "rgb(205, 99, 12)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default EmployeeInfoChart;
