import { Link } from "react-router-dom";
import { Skeleton } from "antd";
import SelfBox, {
  ISelfBoxProps,
  RequisitionBox,
  SelfServiceSettingBox,
  TRequisitionBoxProps,
  TSelfServiceSettingBoxProps,
} from "../components/SelfBox";
import { appRoutes } from "config/router/paths";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";
import ErrorBoundary from "components/errorHandlers/ErrorBoundary";
import { useGetActivatedSelfServiceLinksAndAnalytics } from "../hooks/useGetActivatedSelfServiceLinksAndAnalytics";
import RecentApprovalRequestsCard from "features/core/workflows/components/approval-request/RecentApprovalRequestsCard";
import { BackgroundCurves } from "../components/BackgroundCurves";

const SelfServiceHome: React.FC = () => {
  const { data, isError, isLoading, error } =
    useGetActivatedSelfServiceLinksAndAnalytics();

  return (
    <>
      <div className="relative mb-10">
        <BackgroundCurves />
        <div className="absolute top-4 Container mt-8 w-full">
          <h2 className="font-extrabold text-xl md:text-2xl text-accent">
            Self Service
          </h2>

          <ErrorBoundary>
            <ErrorWrapper
              isError={isError}
              backLink={appRoutes.home}
              message={
                error?.response.data.message ??
                error?.response.data.error.message
              }
            >
              <Skeleton
                active
                loading={isLoading}
                className="w-full"
                paragraph={{ rows: 45 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 mb-10">
                  {data && (
                    <SelfBoxList
                      primaryData={data.primaryData}
                      requisitionData={data.requisitionData}
                      settingsData={data.settingsData}
                    />
                  )}

                  <div className="flex md:col-span-2 lg:col-span-1  col-span-3 flex-col gap-12 w-full">
                    <TotalCompanyAssetCount
                      totalAssetCount={
                        data?.selfServiceDBAnalytics.analytics.totalAssetCount
                      }
                    />

                    <div className="flex-1">
                      <RecentApprovalRequestsCard
                        requests={
                          data?.selfServiceDBAnalytics.analytics.recentRequests
                        }
                      />
                    </div>
                  </div>
                </div>
              </Skeleton>
            </ErrorWrapper>
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};

export const SelfBoxList: React.FC<{
  primaryData?: ({ item: ISelfBoxProps } & { hidden: boolean })[];
  requisitionData?: TRequisitionBoxProps;
  settingsData?: TSelfServiceSettingBoxProps;
  loading?: boolean;
  className?: string;
}> = ({
  primaryData,
  requisitionData,
  settingsData,
  loading,
  className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 col-span-3",
}) => {
  return (
    <Skeleton active loading={loading} paragraph={{ rows: 23 }}>
      <div className={className}>
        {primaryData
          ?.filter((item) => item.hidden === false)
          .map((item, i) => {
            return <SelfBox key={i} {...item.item} loading={loading} />;
          })}
        {requisitionData && <RequisitionBox {...requisitionData} />}
        {settingsData && <SelfServiceSettingBox {...settingsData} />}
      </div>
    </Skeleton>
  );
};

export const SelfBoxListContainer = () => {
  const { data, isError, isLoading } =
    useGetActivatedSelfServiceLinksAndAnalytics();

  return (
    <ErrorWrapper isError={isError} message="Something went wrong!">
      {data && (
        <SelfBoxList
          primaryData={data.primaryData}
          requisitionData={data.requisitionData}
          settingsData={data.settingsData}
          loading={isLoading}
        />
      )}
    </ErrorWrapper>
  );
};

const TotalCompanyAssetCount: React.FC<{ totalAssetCount?: number }> = ({
  totalAssetCount,
}) => {
  return (
    <div className="rounded-lg bg-mainBg border py-5 px-3 shadow">
      <p className="text-sm pb-5 font-medium">Total Company Assets</p>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">{totalAssetCount}</h3>
        <Link
          to={appRoutes.selfServiceAssets}
          className="text-caramel underline cursor-pointer text-sm"
        >
          View {">"}
        </Link>
      </div>
    </div>
  );
};



export default SelfServiceHome;
