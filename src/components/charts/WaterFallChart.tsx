import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
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

export const WaterFallChart: React.FC<IChartProps> = ({
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
            borderColor: bgColors,
            data,
            backgroundColor: bgColors,
          },
        ],
  };
  return (
    <Bar
      options={{
        ...options,
        interaction: {
          mode: "index" as const,
          intersect: false,
        },
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false,
            },
          },
          y: {
            stacked: true,

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
