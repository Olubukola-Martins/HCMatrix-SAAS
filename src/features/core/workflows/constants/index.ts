import { TStageCondition, TStagingType } from "../types";

export const WORKFLOW_STAGE_CONDITION_OPTIONS: {
  label: string;
  value: TStageCondition;
}[] = [
  {
    value: "at-least-one",
    label: "At least One",
  },
  {
    value: "specific",
    label: "Specific",
  },
  {
    value: "everyone",
    label: "Everyone",
  },
];

export const WORKFLOW_STAGE_TYPE_OPTIONS: {
  label: string;
  value: TStagingType;
}[] = [
  { label: "employee", value: "employee" },
  { label: "role", value: "role" },
  { label: "group", value: "group" },
  // {
  //   label: "Department Head",
  //   value: "department-head",
  // },
];
