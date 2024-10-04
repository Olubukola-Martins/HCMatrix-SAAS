import SubsciptionManagement from "features/billing/pages/SubsciptionManagement";
import { appRoutes } from "../paths";
import { TAppPageDataFnProps, TRouteData } from "../types";
import BillingHistory from "features/billing/pages/billing/BillingHistory";
import PurchaseEmployeeLicenses from "features/billing/pages/PurchaseEmployeeLicenses";
import SingleBillingHistory from "features/billing/pages/billing/SingleBillingHistory";
import StorageManagements from "features/billing/pages/StorageManagements";
import CompanyTrainingSessionManagement from "features/billing/pages/CompanyTrainingSessionManagement";
import InformEmployeeOfInActiveSubscription from "features/billing/pages/InformEmployeeOfInActiveSubscription";
import InformOwnerOfInActiveSubscription from "features/billing/pages/InformOwnerOfInActiveSubscription";
import PurchaseExtraLicense from "features/billing/pages/PurchaseExtraLicense";
import PurchaseModules from "features/billing/pages/PurchaseModules";
import UpgradePlanPage from "features/billing/pages/UpgradePlanPage";
import PurchaseSubscriptionByPlanPage from "features/billing/pages/PurchaseSubscriptionByPlanPage";

export const billingRoutes = (
  props: Omit<TAppPageDataFnProps, "isOwner" & { isOwner: boolean }>
): TRouteData[] => {
  const { isOwner } = props;
  return [
    {
      element: <div />,
      path: appRoutes.billingStatement,
      isSearchable: false,
    },
    {
      element: <SingleBillingHistory />,
      path: appRoutes.singleBillingSummary().format,
      isSearchable: false,
      hidden: isOwner === false,
    },
    {
      element: <BillingHistory />,
      path: appRoutes.billingSummary,
      isSearchable: false,
      hidden: isOwner === false,
    },
    {
      element: <PurchaseEmployeeLicenses />,
      path: appRoutes.purchaseUserLicense,
      isSearchable: false,
      hidden: isOwner === false,
    },
    {
      element: <PurchaseExtraLicense />,
      path: appRoutes.purchaseExtraLiense,
      isSearchable: false,
      hidden: isOwner === false,
    },
    {
      element: <PurchaseModules />,
      path: appRoutes.purchaseModules,
      isSearchable: false,
      hidden: isOwner === false,
    },
    {
      element: <UpgradePlanPage />,
      path: appRoutes.upgradePlan,
      isSearchable: false,
      hidden: isOwner === false,
    },
    {
      element: <PurchaseSubscriptionByPlanPage />,
      path: appRoutes.purchaseSubscriptionByPlan().format,
      isSearchable: false,
      hidden: isOwner === false,
    },
    {
      element: <SubsciptionManagement />,
      path: appRoutes.billingSubscription,
      title: "Subscriptions",
      isSearchable: true,
      hidden: isOwner === false,
      category: "doesnt-require-active-subscription",
    },
    {
      element: <InformEmployeeOfInActiveSubscription />,
      path: appRoutes.billingInactiveSubscriptionInformEmployee,
      isSearchable: false,
      category: "doesnt-require-active-subscription",
    },
    {
      element: <InformOwnerOfInActiveSubscription />,
      path: appRoutes.billingInactiveSubscriptionInformOwner,
      isSearchable: false,
      category: "doesnt-require-active-subscription",
    },
    {
      element: <StorageManagements />,
      path: appRoutes.billingStorageManagement,
      title: "Storage Management",
      isSearchable: true,
      hidden: isOwner === false,
    },
    {
      element: <CompanyTrainingSessionManagement />,
      path: appRoutes.billingTrainingSession,
      title: "Training Session",
      isSearchable: true,
      hidden: isOwner === false,
    },
  ];
};
