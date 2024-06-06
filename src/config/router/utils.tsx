import DashboardLayout from "components/layout/DashboardLayout";
import ActiveSubscriptionMiddleware from "components/middlewares/ActiveSubscriptionMiddleware";
import { RequireAuth } from "react-auth-kit";
import { Route } from "react-router-dom";
import { appRoutes } from "./paths";
import { appPagesData } from "./routes";
import { TAppPageDataFnProps, TRouteData } from "./types";

export const pageRoutes = ({
  userPermissions,
  licenseType,
  isOwner = false,
  activeSubscription,
}: TAppPageDataFnProps) =>
  appPagesData({
    userPermissions,
    licenseType,
    isOwner,
    activeSubscription,
  }).map(({ path, element, category }: TRouteData) => {
    if (category === "doesnt-require-authentication") {
      return <Route key={path} path={`${path}`} element={element} />;
    }
    if (category === "doesnt-require-active-subscription") {
      return (
        <Route element={<DashboardLayout />} key={path}>
          <Route
            path={`${path}`}
            element={
              <RequireAuth loginPath={appRoutes.login}>{element}</RequireAuth>
            }
          />
        </Route>
      );
    }

    return (
      <Route element={<DashboardLayout />} key={path}>
        <Route
          path={`${path}`}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <ActiveSubscriptionMiddleware isOwner={isOwner}>
                {element}
              </ActiveSubscriptionMiddleware>
            </RequireAuth>
          }
        />
      </Route>
    );
  });
