import { appRoutes } from "AppRoutes";
import { RequireAuth } from "react-auth-kit";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import SystemAdmins from "../Pages/SystemAdmins";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path={appRoutes.systemAdminLogin}
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path={appRoutes.systemAdmins}
        element={
          <RequireAuth loginPath={appRoutes.login}>
            <SystemAdmins />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
