import { TWorkSheduleShiftSwapSetting } from "../types";

export const SHIFT_SWAP_ELIGIBILITY_VALUES: TWorkSheduleShiftSwapSetting["swapEligibility"][] =
  ["same_department", "same_designation", "same_role"];
export const SHIFT_SWAP_ELIGIBILITY_VALUE_OPTIONS: {
  label: string;
  value: TWorkSheduleShiftSwapSetting["swapEligibility"];
}[] = [
  {
    value: "same_department",
    label: "Employees must belong to the same department",
  },
  {
    value: "same_designation",
    label: "Employees must have the same designation",
  },
  {
    value: "same_role",
    label: "Employees must have the same role",
  },
  {
    value: "any",
    label: "Employees can swap with anyone in the organization",
  },
];
