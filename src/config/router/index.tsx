import { appPagesData } from "./routes";

import { Route, Routes } from "react-router-dom";
import { TRouteData } from "./types";
import { RequireAuth } from "react-auth-kit";
import { appRoutes } from "./paths";
import DashboardLayout from "components/layout/DashboardLayout";
import { useGetUserPermissions } from "components/permission-restriction/PermissionRestrictor";
import ActiveSubscriptionMiddleware from "components/middlewares/ActiveSubscriptionMiddleware";

const Router = () => {
  const { userPermissions, licenseType, isOwner, companyActiveSubscription } =
    useGetUserPermissions();
  const pageRoutes = appPagesData({
    userPermissions,
    licenseType,
    isOwner,
    activeSubscription: companyActiveSubscription,
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

  return (
    <>
      <Routes key={"app"}>{pageRoutes}</Routes>
    </>
  );
};

export default Router;
