import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthRoutes from "./Auth/Routes/AuthRoutes";
import BillingRoutes from "./Billing/Routes/BillingRoutes";
// import NotFoundPage from "./Layout/Components/NotFoundPage";
import SettingRoutes from "./Settings/Routes/SettingRoutes";

function App() {
  return (
    <Router>
      <AuthRoutes />
      <SettingRoutes/>
        <BillingRoutes/>
      {/* <Routes>
      <Route path="*" element={<NotFoundPage /> }/>
      </Routes> */}
    </Router>
  );
}

export default App;
