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
import { Modal } from "antd";
import UserFeedbackComp from "./GeneralComps/UserFeedbackComp";
const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider
      authType={"localstorage"}
      authName={"hcmatrix_app"}
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === "https:"}
    >
      <QueryClientProvider client={queryClient}>
        <GlobalContextProvider>
          <Router>
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
            <UserFeedbackComp />
          </Router>
        </GlobalContextProvider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
