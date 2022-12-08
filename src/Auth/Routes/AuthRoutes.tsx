import { Route, Routes } from "react-router-dom";
import { EmployeeRegister } from "../Pages/EmployeeRegister";
import { ForgotPassword } from "../Pages/ForgotPassword";
import { Login } from "../Pages/Login";
import { Register } from "../Pages/Register";
import { ResetPassword } from "../Pages/ResetPassword";
import { VerifyAdminEmail } from "../Pages/VerifyAdminEmail";
const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<VerifyAdminEmail />} />
      <Route path="/verify-employee" element={<EmployeeRegister />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
};

export default AuthRoutes;
