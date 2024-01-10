import SubsciptionManagement from "features/billing/pages/SubsciptionManagement";
import { appRoutes } from "../paths";
import { TRouteData } from "../types";
import BillingHistory from "features/billing/pages/billing/BillingHistory";
import PurchaseEmployeeLicenses from "features/billing/pages/PurchaseEmployeeLicenses";
import SingleBillingHistory from "features/billing/pages/billing/SingleBillingHistory";
import StorageManagements from "features/billing/pages/StorageManagements";
import CompanyTrainingSessionManagement from "features/billing/pages/CompanyTrainingSessionManagement";

export const billingRoutes: TRouteData[] = [
  {
    element: <div />,
    path: appRoutes.billingStatement,
    isSearchable: false,
  },
  {
    element: <SingleBillingHistory />,
    path: appRoutes.singleBillingSummary().format,
    isSearchable: false,
  },
  {
    element: <BillingHistory />,
    path: appRoutes.billingSummary,
    isSearchable: false,
  },
  {
    element: <PurchaseEmployeeLicenses />,
    path: appRoutes.purchaseUserLicense,
    isSearchable: false,
  },

  {
    element: <SubsciptionManagement />,
    path: appRoutes.billingSubscription,
    title: "Subscriptions",
    isSearchable: true,
  },
  {
    element: <StorageManagements />,
    path: appRoutes.billingStorageManagement,
    title: "Storage Management",
    isSearchable: true,
  },
  {
    element: <CompanyTrainingSessionManagement />,
    path: appRoutes.billingTrainingSession,
    title: "Storage Management",
    isSearchable: true,
  },
];
