import { TSingleEmployee } from "features/core/employees/types";

export const determineEmployeeGrossPay = (
  info?: TSingleEmployee["jobInformation"]
): number => {
  if (!info) return 0;
  let pay = 0;
  switch (info.payrollType) {
    case "direct-salary":
      pay = info?.monthlyGross ? +info?.monthlyGross : 0;

      break;
    case "office":
      pay = info.payGrade?.grossPay ? +info.payGrade?.grossPay : 0;

      break;
    case "wages":
      pay = info?.hourlyRate ?? 0;

      break;

    default:
      break;
  }

  return pay;
};
