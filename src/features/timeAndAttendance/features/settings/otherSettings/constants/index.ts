import { TLatenessPolicy } from "../types";

export const POLICY_REPORT_FREQUENCIES: TLatenessPolicy["reportFrequency"][] = [
  "daily",
  "monthly",
  "weekly",
];
export const POLICY_GRACE_PERIODS: TLatenessPolicy["gracePeriod"][] = [
  "0 minutes",
  "10 minutes",
  "20 minutes",
  "30 minutes",
];
