import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import AssetList from "../components/AssetList";
import AssetOverview from "../components/AssetOverview";
import AssetType from "../components/AssetType";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import PageSubHeader from "components/layout/PageSubHeader";
import { Tabs } from "antd";
import AssetRequestsContainer from "../components/AssetRequestsContainer";

const Assets = () => {
  const tabItems = [
    {
      label: "Asset Overview",
      children: <AssetOverview />,
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
      label: "Requisitions",
      children: <AssetRequestsContainer />,
      key: "Requisitions",
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
          <Tabs items={tabItems} />
        </div>
      </div>
    </>
  );
};

export default Assets;
