import { DatePicker, Select } from "antd";
import { TPayrollGraphAnalyticsItemType } from "features/payroll/types/payroll";
import { useGetPayrollGraphAnalytics } from "features/payroll/hooks/payroll/analytics/useGetPayrollGraphAnalytics";
import {
  parsePayrollGraphAnalyticsData,
  selectPayrollGraphAnalyticsData,
} from "features/payroll/utils/parsePayrollGraphData";
import dayjs from "dayjs";
import PayrollGraphsContainer from "../../graphs/PayrollGraphsContainer";
import { IDivProps } from "types/html";
import { TPayrollWalletDashboardAnalytics } from "features/payroll/types/wallet";

const CHART_ITEMS: TPayrollGraphAnalyticsItemType[] = [
  "bar-chart",
  "line-chart",
  "scatter-chart",
  "waterfall-chart",
  "pie-chart",
  "histogram",
  "area-graph",
  "spider-chart",
];

type IProps = Pick<IDivProps, "className">&{
  setChartItem: React.Dispatch<React.SetStateAction<TPayrollGraphAnalyticsItemType>>,
  setYear: React.Dispatch<React.SetStateAction<string>>,
  year:string, 
  chartItem:TPayrollGraphAnalyticsItemType,
  isLoading?:boolean
  data?: TPayrollWalletDashboardAnalytics['graphData']
};

const WalletOverviewBalanceGraph: React.FC<IProps> = ({
  className = "flex flex-col gap-4",
  year, 
  setYear, 
  chartItem, 
  setChartItem,
  data, 
  isLoading
}) => {
 



  // const parseAnalyticData = parsePayrollGraphAnalyticsData({ chartItem, data });
  // const analyticsData = selectPayrollGraphAnalyticsData(
  //   parseAnalyticData,
  //   "Gross Pay"
  // );
  return (
    <div className={className}>
      {/* header */}
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold">Wallet Balance</h4>

        <div className="flex gap-2 text-sm">
          <div>
            <Select
              value={chartItem}
              onSelect={(val: TPayrollGraphAnalyticsItemType) =>
                setChartItem(val)
              }
              options={CHART_ITEMS.map((item) => ({
                value: item,
                label: (
                  <span className="capitalize">
                    {item.split("-").join(" ")}
                  </span>
                ),
              }))}
              placeholder={`Select Component`}
            />
          </div>
          <div>
            <DatePicker
              value={dayjs(year)}
              picker="year"
              className="w-full"
              placeholder="Select Year"
              onChange={(val) => setYear(val.format("YYYY"))}
            />
          </div>
        </div>
      </div>
      {/* container 4 graphs */}
    
    </div>
  );
};

export default WalletOverviewBalanceGraph;
