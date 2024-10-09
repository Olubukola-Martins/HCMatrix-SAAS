import { Skeleton, Tabs } from "antd";
import React from "react";
import { LeaveWhoIsOut } from "./LeaveWhoIsOut";
import { RemoteWhoIsOut } from "./RemoteWhoIsOut";
import { TCompanyOwnerDashboard } from "features/core/company/types/companyDashboard";
import { IDivProps } from "types/html";
type IProps = {
  data?: TCompanyOwnerDashboard;
  isLoading?: boolean;
} & IDivProps;
const WhoIsOut: React.FC<IProps> = ({
  data,
  isLoading,
  className = "col-span-2 bg-mainBg shadow border rounded-lg p-3",
}) => {
  return (
    <div className={className}>
      <h3 className="text-base">Who is out today?</h3>

      <Skeleton loading={isLoading} paragraph={{ rows: 12 }}>
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: `Leave (${data?.outToday?.leave?.totalCount})`,
              children: <LeaveWhoIsOut data={data?.outToday?.leave?.result} />,
            },
            {
              key: "2",
              label: `Remote Work (${data?.outToday?.remoteWork?.totalCount})`,
              children: (
                <RemoteWhoIsOut data={data?.outToday?.remoteWork?.result} />
              ),
            },
          ]}
        />
      </Skeleton>
    </div>
  );
};

export default WhoIsOut;
