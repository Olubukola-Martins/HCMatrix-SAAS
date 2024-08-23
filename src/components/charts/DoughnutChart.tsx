import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { IChartProps } from "./types";
import { Skeleton } from "antd";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,

  plugins: {
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
  maintainAspectRatio = true,
  loading,
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
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      {loading ? (
        <Skeleton active paragraph={{ rows: 8 }} />
      ) : (
        <Doughnut
          options={{
            ...options,
            maintainAspectRatio,
          }}
          data={dataSrc}
        />
      )}
    </div>
  );
};
