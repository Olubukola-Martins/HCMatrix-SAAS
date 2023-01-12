import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminRoutes from "./Administration/Routes/AdminRoutes";
import AuthRoutes from "./Auth/Routes/AuthRoutes";
import BillingRoutes from "./Billing/Routes/BillingRoutes";
import PayrollRoutes from "./Payroll/Routes/PayrollRoutes";
import SelfServiceRoutes from "./Self_Service/Routes/SelfServiceRoutes";
import SettingRoutes from "./Settings/Routes/SettingRoutes";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import HomeRoute from "./Home/HomeRoute";
import { AuthProvider } from "react-auth-kit";
import { Notification } from "./Notifications/Notification";
import NotFoundPage from "./Layout/Components/NotFoundPage";
import GlobalContextProvider from "./Contexts/GlobalContextProvider";
import { useEffect } from "react";
import UserFeedbackContainer from "./GeneralComps/UserFeedbackContainer";
import refreshApi from "./Config/refreshTokenApi";
const queryClient = new QueryClient();

function App() {
  // clear darkmode
  useEffect(() => {
    localStorage.removeItem("dark");
  }, []);
  return (
    <AuthProvider
      authType={"localstorage"}
      authName={"hcmatrix_app"}
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === "https:"}
      refresh={refreshApi}
    >
      <QueryClientProvider client={queryClient}>
        <GlobalContextProvider>
          <Router>
            <UserFeedbackContainer />

            <AuthRoutes />
            <HomeRoute />
            <SettingRoutes />
            <BillingRoutes />
            <PayrollRoutes />
            <AdminRoutes />
            <SelfServiceRoutes />
            <Routes>
              <Route path="/notifications" element={<Notification />} />
            </Routes>
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Router>
        </GlobalContextProvider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
