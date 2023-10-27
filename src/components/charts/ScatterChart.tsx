import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { IChartProps } from "./types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

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

export const ScatterChart: React.FC<IChartProps> = ({
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
            label: dataEntityLabel,
            borderColor: "transparent",
            data,
            backgroundColor: bgColors,
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
              display: true,
            },
          },
          y: {
            grid: {
              display: true,
            },
          },
        },
      }}
      data={dataSrc}
    />
  );
};
