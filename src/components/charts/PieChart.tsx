import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,

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

interface IProps {
  labels: string[];
  data: number[];
  axis?: "x" | "y";
  bgColors?: string | string[];
  dataEntityLabel?: string;
}
export const PieChart: React.FC<IProps> = ({
  labels,
  data = [],
  axis = "x",
  bgColors = "#1B59F8CC",
  dataEntityLabel = "items",
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
    <Pie
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
