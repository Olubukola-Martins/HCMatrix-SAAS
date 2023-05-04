import { Tabs } from "antd";
import Maintenance from "./Maintenance";
import AssigneeHistory from "./AssigneeHistory";
import { TVehicle } from "../hooks/useFetchVehicles";
import { Repair } from "./Repair";
import { RequiredDocuments } from "./RequiredDocuments";

export const SingleVehicleTabs: React.FC<{ vehicle: TVehicle }> = ({
  vehicle,
}) => {
  const tabItems = [
    {
      label: "Maintenance",
      children: <Maintenance vehicle={vehicle} />,
      key: "Maintenance",
    },
    {
      label: "Repair",
      children: <Repair vehicle={vehicle} />,
      key: "Repair",
    },
    {
      label: "Required Documents",
      children: <RequiredDocuments vehicle={vehicle} />,
      key: "Required Documents",
    },
    {
      label: "Assignee History",
      children: <AssigneeHistory vehicle={vehicle} />,
      key: "Assignee History",
    },
  ];
  return (
    <div>
      <Tabs items={tabItems} />
    </div>
  );
};
