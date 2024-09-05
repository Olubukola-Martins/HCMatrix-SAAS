export interface IChartProps {
  maintainAspectRatio?: boolean;
  labels: string[];
  data?: number[];
  axis?: "x" | "y";
  bgColors?: string | string[];
  dataEntityLabel?: string;
  // TODO: Refactor to use only dataset
  dataSets?: {
    data: number[] | number[][];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    label: string;
    stack?: string;
    borderSkipped?: boolean;
  }[];
  useDataSet?: boolean;
  loading?: boolean;
}
