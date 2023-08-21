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
  // TODO: Refactor to use only dataset
  dataSets?: {
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    label: string;
  }[];
  useDataSet?: boolean;
}
export const LineChart: React.FC<IProps> = ({
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
