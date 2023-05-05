import { appPagesData } from "./routes";

import { Route, Routes } from "react-router-dom";
import { TRouteData } from "./types";
import { RequireAuth } from "react-auth-kit";
import { appRoutes } from "./paths";
import DashboardLayout from "components/layout/DashboardLayout";

const Router = () => {
  const pageRoutes = appPagesData.map(
    ({ path, element, category }: TRouteData) => {
      if (category === "doesnt-require-authentication") {
        return <Route key={path} path={`${path}`} element={element} />;
      }
      return (
        <Route element={<DashboardLayout />}>
          <Route
            key={path}
            path={`${path}`}
            element={
              // <RequireAuth loginPath={appRoutes.login}>
              element
              // {/* </RequireAuth> */}
            }
          />
        </Route>
      );
    }
  );

  return <Routes>{pageRoutes}</Routes>;
};

export default Router;
