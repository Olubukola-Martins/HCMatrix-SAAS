import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import AssetList from "../components/AssetList";
import AssetOverview from "../components/AssetOverview";
import AssetType from "../components/AssetType";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import PageSubHeader from "components/layout/PageSubHeader";
import { Tabs } from "antd";
import AssetRequestsContainer from "../components/AssetRequestsContainer";
import { AssetApprovalRequestsContainer } from "../components/AssetApprovalRequestsContainer";
import { useState } from "react";

export type TAssetTabKey =
  | "Asset Overview"
  | "Asset List"
  | "Asset Type"
  | "Settings"
  | "Approvals"
  | "My Requests";

const Assets: React.FC = () => {
  const [key, setKey] = useState<TAssetTabKey>("Asset Overview");
  const handleTabKey = (val: TAssetTabKey) => {
    setKey(val);
  };
  const tabItems: {
    label: TAssetTabKey;
    key: TAssetTabKey;
    children: React.ReactNode;
  }[] = [
    {
      label: "Asset Overview",
      children: <AssetOverview handleTabKey={handleTabKey} />,
      key: "Asset Overview",
    },
    {
      label: "Asset List",
      children: <AssetList />,
      key: "Asset List",
    },
    {
      label: "Asset Type",
      children: <AssetType />,
      key: "Asset Type",
    },
    {
      label: "My Requests",
      children: <AssetRequestsContainer />,
      key: "My Requests",
    },
    {
      label: "Approvals",
      children: <AssetApprovalRequestsContainer />,
      key: "Approvals",
    },
  ];

  return (
    <>
      <SelfServiceSubNav />
      <div className="Container">
        <div className="flex flex-col gap-6">
          <div>
            <PageIntro title="Assets" link={appRoutes.selfServiceHome} />
            <PageSubHeader
              description={`You can now add assets and asset type, view asset requests and request for assets`}
            />
          </div>
          <Tabs
            activeKey={key}
            onChange={(val) => setKey(val as unknown as TAssetTabKey)}
            items={tabItems}
          />
        </div>
      </div>
    </>
  );
};

export default Assets;
