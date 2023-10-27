import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { IChartProps } from "./types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Filler
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Data",
    },
  },
};

export const AreaChart: React.FC<IChartProps> = ({
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
    datasets: useDataSet
      ? dataSets
      : [
          {
            fill: true,
            label: dataEntityLabel,
            borderColor: bgColors,
            data,
            backgroundColor:
              typeof bgColors === "string" ? `${bgColors}90` : bgColors,
          },
        ],
  };
  return (
    <Line
      options={{
        ...options,
        indexAxis: axis,

        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
      }}
      data={dataSrc}
    />
  );
};
