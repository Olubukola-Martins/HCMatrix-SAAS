import { Menu, Skeleton } from "antd";
import { appRoutes } from "config/router/paths";
import { Link } from "react-router-dom";
import { useGetActivatedSelfServiceLinksAndAnalytics } from "../hooks/useGetActivatedSelfServiceLinksAndAnalytics";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";
import ErrorBoundary from "components/errorHandlers/ErrorBoundary";
import { TNavRoute } from "types/navigation-routes";

const DEFAULT_ROUTES: TNavRoute[] = [
  { title: "Dashboard", path: appRoutes.selfServiceHome, hidden: false },
];

const SelfServiceSubNav = () => {
  const { data, isError, isLoading, error } =
    useGetActivatedSelfServiceLinksAndAnalytics();
  const primaryDataRoutes: TNavRoute[] = !data
    ? []
    : data?.primaryData.map((item) => ({
        title: item.item.title,
        path: item.item.link,
        hidden: item.hidden,
      }));
  const mainPrimaryDataRoutes = primaryDataRoutes.slice(0, 5);
  const morePrimaryDataRoutes = primaryDataRoutes.slice(5);
  const requisitionRoutes: TNavRoute[] = !data
    ? []
    : [
        {
          title: "Requisitions",
          hidden:
            data.requisitionData.requisitions.filter(
              (item) => item.hidden === false
            ).length === 0,
          children: data?.requisitionData.requisitions.map((item) => ({
            title: item.title,
            path: item.link,
            hidden: item.hidden,
          })),
        },
      ];
  const settingRoutes: TNavRoute[] = !data
    ? []
    : [
        {
          hidden:
            data.settingsData.settings.filter((item) => item.hidden === false)
              .length === 0,

          title: "Setting",
          children: data?.settingsData.settings.map((item) => ({
            title: item.title,
            path: item.link,
            hidden: item.hidden,
          })),
        },
      ];
  const routes: TNavRoute[] = [
    ...DEFAULT_ROUTES,
    ...mainPrimaryDataRoutes,
    ...requisitionRoutes,
    ...settingRoutes,
    { title: "More", children: morePrimaryDataRoutes, hidden: false },
  ];
  return (
    <ErrorBoundary>
      <ErrorWrapper
        isError={isError}
        message={
          error?.response.data.message ?? error?.response.data.error.message
        }
      >
        <Skeleton loading={isLoading} paragraph={{ rows: 2 }}>
          <Menu
            className="bg-white py-4 px-3 text-accent rounded mb-9 shadow-md  text-sm font-medium"
            mode="horizontal"
            items={routes
              .filter((item) => item.hidden === false)
              .map((item, i) => ({
                key: i,

                label: (
                  <>
                    {item?.path ? (
                      <Link to={item.path} className="">
                        <span className="">{item.title}</span>
                      </Link>
                    ) : (
                      <span>{item.title}</span>
                    )}
                  </>
                ),
                children: item?.children
                  ?.filter((item) => item.hidden === false)
                  .map((item) => ({
                    key: item.title,
                    label: (
                      <>
                        {item?.path ? (
                          <Link to={item.path} className="">
                            <span className="">{item.title}</span>
                          </Link>
                        ) : (
                          <span>{item.title}</span>
                        )}
                      </>
                    ),
                  })),
              }))}
          />
        </Skeleton>
      </ErrorWrapper>
    </ErrorBoundary>
  );
};

export default SelfServiceSubNav;
