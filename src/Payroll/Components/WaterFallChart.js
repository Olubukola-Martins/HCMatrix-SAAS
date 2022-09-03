import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  maintainAspectRatio: false,

  plugins: {
    title: {
      display: true,
      text: "Waterfall Chart",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Net Income",
      data: [18, 19, 20, 28, 10, 29, 7, 0, 35, 27, 12, 20, 30],

      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "Dataset 2",
      data: [1, 2, 5, 48, 10, 49, 20, 0, 5, 1, 12, 2, 30],

      backgroundColor: "rgb(75, 192, 192)",
    },
  ],
};

export function WaterFallChart() {
  return <Bar options={options} data={data} />;
}
