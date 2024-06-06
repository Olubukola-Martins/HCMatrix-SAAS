import { Routes } from "react-router-dom";
import { useGetUserPermissions } from "components/permission-restriction/PermissionRestrictor";
import { pageRoutes } from "./utils";
import { useSendGoogleAnalyticsPageView } from "hooks/analtyics";

const Router = () => {
  const { userPermissions, licenseType, isOwner, companyActiveSubscription } =
    useGetUserPermissions();
  const appPageRoutes = pageRoutes({
    userPermissions,
    licenseType,
    isOwner,
    activeSubscription: companyActiveSubscription,
  });

  useSendGoogleAnalyticsPageView();

  return (
    <>
      <Routes key={"app"}>{appPageRoutes}</Routes>
    </>
  );
};

export default Router;
