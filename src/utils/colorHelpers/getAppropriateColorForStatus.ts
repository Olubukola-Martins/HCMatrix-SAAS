const ESTATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};
const ECOLOR = {
  PENDING: "#FFA600",
  APPROVED: "#01966B",
  REJECTED: "#FF221E",
};

export const getAppropriateColorForStatus = (status: string) => {
  switch (status) {
    case ESTATUS.PENDING:
      return ECOLOR.PENDING;
    case ESTATUS.APPROVED:
      return ECOLOR.APPROVED;
    case ESTATUS.REJECTED:
      return ECOLOR.REJECTED;

    default:
      return "";
  }
};
