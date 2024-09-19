// type TSTATUS = "pending" | "approved" | "rejected" | "in-review";

import { ECOLOR } from "constants/color";

export const getAppropriateColorForStatus = (status: string) => {
  return ECOLOR[status] ?? "#aaa";
};
