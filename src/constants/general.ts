import { TEmploymentEligibity } from "types/employementEligibilities";
import { TPriority } from "types/priorities";

export const DEFAULT_ROLES_CREATED_BY_SYSTEM = 2; //admin n employee
export const DEFAULT_EMPLOYEES_CREATED_BY_SYSTEM = 1; //the purchaser of the system
export const DEFAULT_DEPARTMENTS_CREATED_BY_SYSTEM = 0;
export const DEFAULT_DESIGNATIONS_CREATED_BY_SYSTEM = 0;
export const MAX_NO_OF_WORKING_DAYS_PER_WEEK = 7;

// The purpose of this file to prevent repetition
export const MONTH_CHART_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Nov",
  "Dec",
];

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE_SIZE_OPTIONS = [DEFAULT_PAGE_SIZE, 20, 50, 100];
export const DEFAULT_EXPORT_PAGE_SIZE = 500;
export const DEFAULT_GRID_PAGE_SIZE = 10;
export const PRIORITIES: { value: TPriority; label: string }[] = [
  { label: "High", value: "high" },
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
];
export const GENDERS = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
];
export const COMPETENCIES = [
  {
    label: "Advanced",
    value: "advanced",
  },
  {
    label: "Average",
    value: "average",
  },
  {
    label: "Basic",
    value: "basic",
  },
];

export const MARITAL_STATUSES = [
  {
    label: "Single",
    value: "single",
  },
  {
    label: "Married",
    value: "married",
  },
  {
    label: "Widowed",
    value: "widowed",
  },
  {
    label: "Divorced",
    value: "divorced",
  },
];

export const EMPLOYMENT_ELIGIBILITIES: TEmploymentEligibity[] = [
  "citizen",
  "expatriate",
];
export const EMPLOYMENT_ELIGIBILITIES_OPTIONS = EMPLOYMENT_ELIGIBILITIES.map(
  (item) => ({ label: item, value: item })
);

export const WORK_MODELS = [
  {
    label: "On Site",
    value: "on-site",
  },
  {
    label: "Hybrid",
    value: "hybrid",
  },
  {
    label: "Remote",
    value: "remote",
  },
];
export const RELATIONSHIPS = [
  {
    label: "Brother",
    value: "brother",
  },
  {
    label: "Sister",
    value: "sister",
  },
  {
    label: "Girlfriend",
    value: "girlfriend",
  },
  {
    label: "Boyfriend",
    value: "boyfriend",
  },
  {
    label: "Husband",
    value: "husband",
  },
  {
    label: "Wife",
    value: "wife",
  },
  {
    label: "Father",
    value: "father",
  },
  {
    label: "Mother",
    value: "mother",
  },
  {
    label: "Son",
    value: "son",
  },
  {
    label: "Daughter",
    value: "daughter",
  },
  {
    label: "Nephew",
    value: "nephew",
  },
  {
    label: "Niece",
    value: "niece",
  },
  {
    label: "Cousin",
    value: "cousin",
  },
  {
    label: "Uncle",
    value: "uncle",
  },
  {
    label: "Aunt",
    value: "aunt",
  },
  {
    label: "Grandfather",
    value: "grandfather",
  },
  {
    label: "Grandmother",
    value: "grandmother",
  },
  {
    label: "Grandson",
    value: "grandson",
  },
  {
    label: "Granddaughter",
    value: "granddaughter",
  },
  {
    label: "Stepfather",
    value: "stepfather",
  },
  {
    label: "Stepmother",
    value: "stepmother",
  },
  {
    label: "Stepson",
    value: "stepson",
  },
  {
    label: "Stepdaughter",
    value: "stepdaughter",
  },
  {
    label: "Step-brother",
    value: "step-brother",
  },
  {
    label: "Step-sister",
    value: "step-sister",
  },
  {
    label: "Friend",
    value: "friend",
  },
  {
    label: "Fiancé",
    value: "fiance",
  },
  {
    label: "Fiancée",
    value: "fiancee",
  },
];

export const DEFAULT_PROFILE_IMAGE_URL = "https://picsum.photos/193";
export const DEFAULT_LOGO_IMAGE_URL = "https://picsum.photos/190";
export const EMPLOYMENT_TYPES = [
  {
    label: "Contract",
    value: "contract",
  },
  {
    value: "full-time",
    label: "Full Time",
  },
  {
    value: "part-time",
    label: "Part Time",
  },
];
