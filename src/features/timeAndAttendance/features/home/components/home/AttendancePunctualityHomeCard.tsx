import { Skeleton } from "antd";
import { LineChart } from "components/charts";
import React from "react";
import { IDivProps } from "types/html";
type IProps = IDivProps & {
  data?: number[];
  labels?: string[];
  isLoading?: boolean;
};

const AttendancePunctualityHomeCard: React.FC<IProps> = ({
  className = "col-span-3 bg-mainBg border mt-4 rounded-lg text-sm shadow p-3",
  data = [],
  labels = [],
  isLoading,
}) => {
  return (
    <div className={className}>
      <div className="flex justify-between">
        <div>
          <h4 className="font-medium text-lg">Punctuality Rate</h4>
        </div>
      </div>
      <Skeleton active paragraph={{ rows: 9 }} loading={isLoading}>
        <LineChart
          data={data}
          labels={labels}
          dataEntityLabel="employees"
          bgColors={"#aaa"}
        />
      </Skeleton>
    </div>
  );
};

export default AttendancePunctualityHomeCard;
