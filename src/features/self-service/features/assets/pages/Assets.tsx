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
import { useNavigate } from "react-router-dom";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";

export type TAssetTabKey =
  | "Asset Overview"
  | "Asset List"
  | "Asset Type"
  | "My Approvals"
  | "My Requests"
  | "Asset Assignee History"
  | "Setting"
  | "All Requests";

const Assets: React.FC = () => {
  const { userPermissions } = useGetUserPermissions();
  const [key, setKey] = useState<TAssetTabKey>("Asset Overview");
  const handleTabKey = (val: TAssetTabKey) => {
    setKey(val);
  };
  const tabItems: {
    label: TAssetTabKey;
    key: TAssetTabKey;
    children: React.ReactNode;
    hidden: boolean;
  }[] = [
    {
      label: "Asset Overview",
      children: <AssetOverview handleTabKey={handleTabKey} />,
      key: "Asset Overview",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-asset-overview"],
      }),
    },
    {
      label: "Asset List",
      children: <AssetList />,
      key: "Asset List",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-assets"],
      }),
    },
    {
      label: "Asset Type",
      children: <AssetType />,
      key: "Asset Type",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-assets"],
      }),
    },
    {
      label: "All Requests",
      children: <AssetRequestsContainer />,
      key: "All Requests",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-all-asset-requests"],
      }),
    },
    {
      label: "Asset Assignee History",
      children: <AllEmployeeAssetAssigneeHistory />,
      key: "Asset Assignee History",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-all-asset-requests"],
      }),
    },
    {
      label: "My Requests",
      children: <EmployeeAssetRequisitionHistory />,
      key: "My Requests",
      hidden: false,
    },
    {
      label: "My Approvals",
      children: <AssetApprovalRequestsContainer />,
      key: "My Approvals",
      hidden: false,
    },
  ];
  const navigate = useNavigate();
  return (
    <>
      <SelfServiceSubNav />
      <div className="Container">
        <div className="flex flex-col gap-6">
          <div>
            <PageIntro title="Assets" link={appRoutes.selfServiceHome} />
            <PageSubHeader
              description={`You can now manage assets and requests`}
              actions={[
                {
                  name: "Setting",
                  handleClick: () =>
                    navigate(appRoutes.selfServiceAssetSetting),
                  btnVariant: "transparent",
                  hidden: !canUserAccessComponent({
                    userPermissions,
                    requiredPermissions: ["manage-requsition-settings"],
                  }),
                },
              ]}
            />
          </div>
          <ErrorBoundary>
            <Tabs
              activeKey={key}
              onChange={(val) => setKey(val as unknown as TAssetTabKey)}
              items={[...tabItems.filter((item) => item.hidden === false)]}
            />
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};

export default Assets;
