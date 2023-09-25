// type TSTATUS = "pending" | "approved" | "rejected" | "in-review";

const ECOLOR: { [key: string]: string } = {
  pending: "#FFA600",
  approved: "#01966B",
  rejected: "#FF221E",
  "in-review": "#FFA600",
};

export const getAppropriateColorForStatus = (status: string) => {
  return ECOLOR[status] ?? "#aaa";
};
