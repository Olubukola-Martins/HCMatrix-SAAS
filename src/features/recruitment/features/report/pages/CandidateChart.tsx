import ChartTabHeader, {
  TChartTabItem,
} from "features/core/employees/components/ChartTabHeader";
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

// import React from 'react'
import { Line } from "react-chartjs-2";
import { useState } from "react";

export const CandidateChartDiagram = () => {
  const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

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
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "November",
    "December",
    "January",
    "February",
    "March",
  ];
  const tabItems: TChartTabItem[] = [
    { name: "Weekly" },
    { name: "Monthly" },
    { name: "Yearly" },
  ];

  return (
    <>
      <div className="flex flex-col gap-4 mt-8  bg-mainBg shadow border rounded-lg py-5 px-7 max-sm:p-3  relative h-96">
        <div>
          <ChartTabHeader items={tabItems} />
        </div>
        <div style={{ height: "100%" }}>
          <Line
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: false,
                  max: 0.6,
                  min: -0.4,
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
                  text: "Candidate Chart",
                },
              },
            }}
            data={{
              labels,
              datasets: [
                {
                  label: "",
                  data: data,
                  borderColor: "rgb(205, 99, 12)",
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
              ],
            }}
          />
        </div>
      </div>
      ;
    </>
  );
};

const CandidateChart = () => {
  return (
    <>
      <h3>
        This demonstrates how successful sources are in turning candidates into
        employees.
        <CandidateChartDiagram />
      </h3>

      {/* Chart Start */}
    </>
  );
};

export default CandidateChart;
