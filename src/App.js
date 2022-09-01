import { BrowserRouter as Router } from "react-router-dom";
import AuthRoutes from "./Auth/Routes/AuthRoutes";
import BillingRoutes from "./Billing/Routes/BillingRoutes";
import PayrollRoutes from "./Payroll/Routes/PayrollRoutes";
// import NotFoundPage from "./Layout/Components/NotFoundPage";
import SettingRoutes from "./Settings/Routes/SettingRoutes";

function App() {
  return (
    <Router>
      <AuthRoutes />
<<<<<<< HEAD
      <SettingRoutes />
      <BillingRoutes />
      <PayrollRoutes />
=======
      <SettingRoutes/>
        <BillingRoutes/>
        <PayrollRoutes/>
>>>>>>> 1952f40d62968393823f495afa9bc4cd19e63137
      {/* <Routes>
      <Route path="*" element={<NotFoundPage /> }/>
      </Routes> */}
    </Router>
  );
}

export default App;
