import { Tabs } from "antd";

import { TAsset } from "../types";
import { AssetAssigneeHistory } from "./AssetAssigneeHistory";
import { AssetDocuments } from "./AssetDocuments";

export const SingleAssetTabs: React.FC<{ asset: TAsset }> = ({ asset }) => {
  const tabItems = [
    {
      label: "Assignee History",
      children: <AssetAssigneeHistory asset={asset} />,
      key: "Assignee History",
    },
    {
      label: "Documents",
      children: <AssetDocuments asset={asset} />,
      key: "Documents",
    },
  ];
  return (
    <div>
      <Tabs items={tabItems} />
    </div>
  );
};
