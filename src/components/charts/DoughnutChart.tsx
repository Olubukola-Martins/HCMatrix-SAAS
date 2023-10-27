import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { IChartProps } from "./types";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    // legend: {
    //   position: "top" as const,
    // },
    title: {
      display: false,
      text: "Data",
    },
  },
};

export const DoughnutChart: React.FC<IChartProps> = ({
  labels,
  data = [],
  axis = "x",
  bgColors = "#1B59F8CC",
  dataEntityLabel = "items",
  useDataSet = false,
  dataSets = [],
}) => {
  const dataSrc = {
    labels,
    datasets: [
      {
        label: dataEntityLabel,

        data,
        backgroundColor: bgColors,
      },
    ],
  };
  return (
    <Doughnut
      options={{
        ...options,

        // indexAxis: axis,

        // scales: {
        //   x: {
        //     grid: {
        //       display: false,
        //     },
        //   },
        //   y: {
        //     grid: {
        //       display: false,
        //     },
        //   },
        // },
      }}
      data={dataSrc}
    />
  );
};
