const ELEAVESTATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};
const ELEAVECOLOR = {
  PENDING: "#FFA600",
  APPROVED: "#01966B",
  REJECTED: "#FF221E",
};

export const leaveRequestStatusColor = (status) => {
  switch (status) {
    case ELEAVESTATUS.PENDING:
      return ELEAVECOLOR.PENDING;
    case ELEAVESTATUS.APPROVED:
      return ELEAVECOLOR.APPROVED;
    case ELEAVESTATUS.REJECTED:
      return ELEAVECOLOR.REJECTED;

    default:
      return "";
  }
};
