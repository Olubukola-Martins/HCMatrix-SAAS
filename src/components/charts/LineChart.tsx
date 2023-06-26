import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export const options = {
  responsive: true,

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

interface IProps {
  labels: string[];
  data?: number[];
  axis?: "x" | "y";
  bgColors?: string | string[];
  dataEntityLabel?: string;
}
export const LineChart: React.FC<IProps> = ({
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
