import SubsciptionManagement from "features/billing/pages/SubsciptionManagement";
import { appRoutes } from "../paths";
import { TRouteData } from "../types";
import BillingHistory from "features/billing/pages/billing/BillingHistory";
import PurchaseEmployeeLicenses from "features/billing/pages/PurchaseEmployeeLicenses";

export const billingRoutes: TRouteData[] = [
  {
    element: <div />,
    path: appRoutes.billingStatement,
    isSearchable: false,
  },
  {
    element: <div />,
    path: appRoutes.billings,
    isSearchable: false,
  },
  {
    element: <PurchaseEmployeeLicenses />,
    path: appRoutes.purchaseUserLicense,
    isSearchable: false,
  },
  // start here
  {
    element: <BillingHistory />,
    path: appRoutes.billingHistory,
    title: "Billing History",
    isSearchable: true,
  },
  {
    element: <SubsciptionManagement />,
    path: appRoutes.billingSubscription,
    title: "Subscriptions",
    isSearchable: true,
  },
];
