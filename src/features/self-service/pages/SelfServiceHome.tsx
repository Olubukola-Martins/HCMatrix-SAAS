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
import { RecentCard } from "components/cards/RecentCard";
import { TSelfServiceDBAnalytics } from "../types";
import { useState } from "react";
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";
import ViewApprovalRequest from "features/core/workflows/components/approval-request/ViewApprovalRequest";
import { truncateString } from "utils/dataHelpers/truncateString";
import { useGetActivatedSelfServiceLinksAndAnalytics } from "../hooks/useGetActivatedSelfServiceLinksAndAnalytics";

const SelfServiceHome: React.FC = () => {
  const { data, isError, isLoading } =
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
              message="Please contact sytem administrator!"
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
                      <RecentSelfServiceRequests
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

const RecentSelfServiceRequests: React.FC<{
  requests?: TSelfServiceDBAnalytics["analytics"]["recentRequests"];
}> = ({ requests }) => {
  const [action, setAction] = useState<"view">();
  const [approvalRequest, setApprovalRequest] = useState<TApprovalRequest>();
  const onClose = () => {
    setAction(undefined);
    setApprovalRequest(undefined);
  };
  return (
    <>
      <ViewApprovalRequest
        handleClose={onClose}
        open={action === "view"}
        request={approvalRequest}
      />
      <RecentCard
        title="Recent Approval Requests"
        data={requests?.map((item) => ({
          title: truncateString(
            `${item.entityType.split("-").join(" ")} Request`,
            14
          ),
          features: [
            {
              name: "Status",
              value: item.status,
            },
          ],

          secondaryCol: {
            type: "options",
            options: [
              {
                name: "View",
                onClick: () => {
                  setAction("view");
                  setApprovalRequest(item);
                },
              },
            ],
          },
        }))}
      />
    </>
  );
};

const BackgroundCurves = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      className="relative right-0 left-0 top-0 -mt-7"
    >
      <path
        fill="var(--card)"
        fillOpacity="1"
        d="M0,160L20,165.3C40,171,80,181,120,165.3C160,149,200,107,240,122.7C280,139,320,213,360,224C400,235,440,181,480,160C520,139,560,149,600,181.3C640,213,680,267,720,266.7C760,267,800,213,840,176C880,139,920,117,960,122.7C1000,128,1040,160,1080,176C1120,192,1160,192,1200,197.3C1240,203,1280,213,1320,234.7C1360,256,1400,288,1420,304L1440,320L1440,0L1420,0C1400,0,1360,0,1320,0C1280,0,1240,0,1200,0C1160,0,1120,0,1080,0C1040,0,1000,0,960,0C920,0,880,0,840,0C800,0,760,0,720,0C680,0,640,0,600,0C560,0,520,0,480,0C440,0,400,0,360,0C320,0,280,0,240,0C200,0,160,0,120,0C80,0,40,0,20,0L0,0Z"
      ></path>
    </svg>
  );
};

export default SelfServiceHome;
