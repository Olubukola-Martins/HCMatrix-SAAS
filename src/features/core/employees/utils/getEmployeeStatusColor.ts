import { TEmployeeStatus } from "../types";

export const getEmployeeStatusColor = (status: TEmployeeStatus): string => {
  let color = "";
  switch (status) {
    case "confirmed":
      color = "text-[#097969]";
      break;
    case "terminated":
      color = "text-[#F6350C]";

      break;
    case "probation":
      color = "text-[#FFC300]";

      break;
    case "suspended":
      color = "text-[#FFC300]";

      break;

    default:
      color = "text-[#aaa]";

      break;
  }
  return color;
};
