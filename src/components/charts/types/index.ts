export interface IChartProps {
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
    stack?: string;
  }[];
  useDataSet?: boolean;
}
