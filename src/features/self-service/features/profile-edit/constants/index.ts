import { TProfileEditRequestType } from "../types";

export const PROFILE_EDIT_REQUEST_TYPES: {
  type: TProfileEditRequestType;
  name: string;
}[] = [
  {
    name: "Bank Details",
    type: "bank-detail",
  },
  {
    name: "ITF",
    type: "itf",
  },
  {
    name: "NSITF",
    type: "nsitf",
  },
  {
    name: "Pension",
    type: "pension",
  },
  {
    name: "Tax",
    type: "tax",
  },
  {
    name: "Personal Information",
    type: "personal-information",
  },

  {
    name: "Job Information",
    type: "job-information",
  },
];
