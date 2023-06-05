import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import React, { useState } from "react";
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
import { ErrorComponent } from "components/errorHandlers/ErrorComponent";

const AssetDetails = () => {
  const params = useParams();
  const entityId: number = +(params.id as unknown as string);

  const { token, companyId } = useApiAuth();

  const { data, isSuccess, isFetching } = useGetSingleAsset({
    token,
    companyId,
    id: entityId,
  });

  return (
    <>
      <SelfServiceSubNav />
      <div className="Container">
        {isFetching && !isSuccess && <Skeleton paragraph={{ rows: 20 }} />}
        {isSuccess ? (
          <>
            <PageIntro
              title="Asset Details"
              link={appRoutes.selfServiceAssets}
            />
            <AssetDetailsSubHeader data={data} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              <EntityImageCard src={data.imageUrl} />
              <AssetInfo asset={data} />

              <CurrentAssetAssignee asset={data} />
            </div>

            {/* Tabs */}
            <div className="mt-6">
              <SingleAssetTabs asset={data} />
            </div>
          </>
        ) : (
          <ErrorComponent message="Oops, not found!" />
        )}
      </div>
    </>
  );
};

export default AssetDetails;
