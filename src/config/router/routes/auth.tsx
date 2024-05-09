import { VerifyMicrosoftAuthentication } from "features/authentication/pages/VerifyMicrosoftAuthentication";
import { appRoutes } from "../paths";
import { TRouteData } from "../types";
import { Login } from "features/authentication/pages/Login";
import { Register } from "features/authentication/pages/Register";
import { VerifyAdminEmail } from "features/authentication/pages/VerifyAdminEmail";
import { EmployeeRegister } from "features/authentication/pages/EmployeeRegister";
import { ForgotPassword } from "features/authentication/pages/ForgotPassword";
import { ResetPassword } from "features/authentication/pages/ResetPassword";
import { InvitedEmployeeForm } from "features/authentication/pages/InvitedEmployeeForm";

const authRoutes: Omit<TRouteData, "isSearchable">[] = [
  {
    element: <VerifyMicrosoftAuthentication />,
    path: appRoutes.microsoftCallback,
  },
  {
    element: <Login />,
    path: appRoutes.login,
  },
  {
    element: <Register />,
    path: appRoutes.register,
  },
  {
    element: <VerifyAdminEmail />,
    path: appRoutes.verify,
  },
  {
    element: <EmployeeRegister />,
    path: appRoutes.verifyEmployee,
  },
  {
    element: <ForgotPassword />,
    path: appRoutes.forgotPassword,
  },
  {
    element: <ResetPassword />,
    path: appRoutes.resetPassword,
  },
  {
    element: <InvitedEmployeeForm />,
    path: appRoutes.invitedEmployee,
  },
];

export const authRoutesDontRequireAuthentication: TRouteData[] = authRoutes.map(
  (item) => ({
    ...item,
    category: "doesnt-require-authentication",
    isSearchable: false,
  })
);
