import { TEmployeeStatus } from "../AppTypes/DataEntitities";

export const employeeStatusColor = (status: TEmployeeStatus) => {
  let color;
  switch (status) {
    case "confirmed":
      color = "text-[#097969]";
      break;
    case "terminated":
      color = "text-[#ffa]";

      break;
    case "probation":
      color = "text-[#ffa]";

      break;
    case "suspended":
      color = "text-[#ffa]";

      break;

    default:
      color = "text-[#aaa]";

      break;
  }
  return color;
};
