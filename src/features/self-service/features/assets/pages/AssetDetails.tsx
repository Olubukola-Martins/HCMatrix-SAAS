import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import { useParams } from "react-router-dom";

import { useApiAuth } from "hooks/useApiAuth";
import { useGetSingleAsset } from "../hooks/useGetSingleAsset";
import { Skeleton } from "antd";
import { appRoutes } from "config/router/paths";
import { PageIntro } from "components/layout/PageIntro";
import { AssetDetailsSubHeader } from "../components/AssetDetailsSubHeader";
import { EntityImageCard } from "components/cards/EntityImageCard";
import { AssetInfo } from "../components/AssetInfo";
import { CurrentAssetAssignee } from "../components/CurrentAssetAssignee";
import { SingleAssetTabs } from "../components/SingleAssetTabs";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";

const AssetDetails = () => {
  const params = useParams();
  const entityId: number = +(params.id as unknown as string);

  const { token, companyId } = useApiAuth();

  const { data, isError, isFetching } = useGetSingleAsset({
    token,
    companyId,
    id: entityId,
  });

  return (
    <>
      <SelfServiceSubNav />
      <div className="Container">
        <>
          <PageIntro
            title={isError ? "Back" : "Asset Details"}
            link={appRoutes.selfServiceAssets}
          />
          <Skeleton active paragraph={{ rows: 16 }} loading={isFetching}>
            <ErrorWrapper
              isError={isError}
              backLink={appRoutes.selfServiceAssets}
              message="Asset not found"
            >
              {data && (
                <>
                  <AssetDetailsSubHeader data={data} />

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                    <EntityImageCard src={data?.imageUrl} />
                    <AssetInfo asset={data} />

                    <CurrentAssetAssignee asset={data} />
                  </div>

                  {/* Tabs */}
                  <div className="mt-6">
                    <SingleAssetTabs asset={data} />
                  </div>
                </>
              )}
            </ErrorWrapper>
          </Skeleton>
        </>
      </div>
    </>
  );
};

export default AssetDetails;
