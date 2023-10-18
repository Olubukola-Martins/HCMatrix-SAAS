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
import { EmployeeAssetRequisitionHistory } from "../components/requisitions/EmployeeAssetRequisitionHistory";
import { AllEmployeeAssetAssigneeHistory } from "../components/assignee-history/AllEmployeeAssetAssigneeHistory";
import ErrorBoundary from "components/errorHandlers/ErrorBoundary";
import { AssetRequestSetting } from "../components/AssetRequestSetting";

export type TAssetTabKey =
  | "Asset Overview"
  | "Asset List"
  | "Asset Type"
  | "Approvals"
  | "My Requests"
  | "Asset Assignee History"
  | "Setting"
  | "All Requests";

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
      label: "All Requests",
      children: <AssetRequestsContainer />,
      key: "All Requests",
    },
    {
      label: "Asset Assignee History",
      children: <AllEmployeeAssetAssigneeHistory />,
      key: "Asset Assignee History",
    },
    {
      label: "My Requests",
      children: <EmployeeAssetRequisitionHistory />,
      key: "My Requests",
    },
    {
      label: "Approvals",
      children: <AssetApprovalRequestsContainer />,
      key: "Approvals",
    },
    {
      label: "Setting",
      children: <AssetRequestSetting />,
      key: "Setting",
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
          <ErrorBoundary>
            <Tabs
              activeKey={key}
              onChange={(val) => setKey(val as unknown as TAssetTabKey)}
              items={[...tabItems]}
            />
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};

export default Assets;
