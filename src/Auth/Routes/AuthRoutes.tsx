import { appRoutes } from "AppRoutes";
import { InvitedEmployeeForm } from "Auth/Pages/InvitedEmployeeForm";
import { VerifyMicrosoftAuthentication } from "Auth/Pages/VerifyMicrosoftAuthentication";
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
      <Route
        path={appRoutes.microsoftCallback}
        element={<VerifyMicrosoftAuthentication />}
      />
      <Route path={appRoutes.login} element={<Login />} />
      <Route path={appRoutes.register} element={<Register />} />
      <Route path={appRoutes.verify} element={<VerifyAdminEmail />} />
      <Route path={appRoutes.verifyEmployee} element={<EmployeeRegister />} />
      <Route path={appRoutes.forgotPassword} element={<ForgotPassword />} />
      <Route path={appRoutes.resetPassword} element={<ResetPassword />} />
      <Route
        path={appRoutes.invitedEmployee}
        element={<InvitedEmployeeForm />}
      />
    </Routes>
  );
};

export default AuthRoutes;
