import { RequireAuth } from "react-auth-kit";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import SystemAdmins from "../Pages/SystemAdmins";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/system-administration-login"
        element={
          <RequireAuth loginPath={"/login"}>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="/system-administrators"
        element={
          <RequireAuth loginPath={"/login"}>
            <SystemAdmins />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
