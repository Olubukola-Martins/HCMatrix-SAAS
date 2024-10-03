import { ActiveModuleSubscription } from "./module";
import { ActivePlanSubscription } from "./plan";

export type AciveCompanySubscription =
  | ActivePlanSubscription
  | ActiveModuleSubscription;
