import { Menu, Skeleton } from "antd";
import { appRoutes } from "config/router/paths";
import { Link } from "react-router-dom";
import { useGetActivatedSelfServiceLinksAndAnalytics } from "../hooks/useGetActivatedSelfServiceLinksAndAnalytics";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";
import ErrorBoundary from "components/errorHandlers/ErrorBoundary";

type TNavRoute = {
  title: string;
  path?: string;
  children?: TNavRoute[];
};
const DEFAULT_ROUTES: TNavRoute[] = [
  { title: "Dashboard", path: appRoutes.selfServiceHome },
];

const SelfServiceSubNav = () => {
  const { data, isError, isLoading } =
    useGetActivatedSelfServiceLinksAndAnalytics();
  const primaryDataRoutes: TNavRoute[] = !data
    ? []
    : data?.primaryData
        ?.filter((item) => item.hidden === false)
        .map((item) => ({
          title: item.item.title,
          path: item.item.link,
        }));
  const mainPrimaryDataRoutes = primaryDataRoutes.slice(0, 5);
  const morePrimaryDataRoutes = primaryDataRoutes.slice(5);
  const requisitionRoutes: TNavRoute[] = !data
    ? []
    : [
        {
          title: "Requisitions",
          children: data?.requisitionData.requisitions
            .filter((item) => item.hidden === false)
            .map((item) => ({
              title: item.title,
              path: item.link,
            })),
        },
      ];
  const settingRoutes: TNavRoute[] = !data
    ? []
    : [
        {
          title: "Setting",
          children: data?.settingsData.settings
            .filter((item) => item.hidden === false)
            .map((item) => ({
              title: item.title,
              path: item.link,
            })),
        },
      ];
  const routes: TNavRoute[] = [
    ...DEFAULT_ROUTES,
    ...mainPrimaryDataRoutes,
    ...requisitionRoutes,
    ...settingRoutes,
    { title: "More", children: morePrimaryDataRoutes },
  ];
  return (
    <ErrorBoundary>
      <ErrorWrapper isError={isError}>
        <Skeleton loading={isLoading} paragraph={{ rows: 2 }}>
          <Menu
            className="bg-white py-4 px-3 text-accent rounded mb-9 shadow-md  text-sm font-medium"
            mode="horizontal"
            items={routes.map((item, i) => ({
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
              children: item?.children?.map((item) => ({
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
