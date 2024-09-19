// type TSTATUS = "pending" | "approved" | "rejected" | "in-review";

const ECOLOR: { [key: string]: string } = {
  pending: "#FFA600",
  credit: "#01966B",
  approved: "#01966B",
  debit: "#FF221E",
  rejected: "#FF221E",
  closed: "#1ace17",
  low: "#06e9ec",
  high: "#FF221E",
  medium: "#08b0f8",
  active: "#08b0f8",
  new: "#f7e930",
  "in-review": "#FFA600",
};

export const getAppropriateColorForStatus = (status: string) => {
  return ECOLOR[status] ?? "#aaa";
};
