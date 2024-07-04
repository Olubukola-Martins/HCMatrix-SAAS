import { z } from "zod";

const ACCEPTED_LICENSE_TYPE_VALUES = ["licensed", "unlicensed", "deactivated"];
export const employeeInformationValidationSchema = () => {
  return z
    .object({
      firstName: z.string().trim(),
      lastName: z.string().trim(),
      email: z.string().email().trim(),
      licenseType: z
        .string()
        .trim()
        .transform((val) => val.toLowerCase()),
      empUid: z.string().min(4).trim(),
    })
    .superRefine((data, ctx) => {
      if (!ACCEPTED_LICENSE_TYPE_VALUES.includes(data.licenseType)) {
        ctx.addIssue({
          code: "custom",
          message: `License type has to be one of ${ACCEPTED_LICENSE_TYPE_VALUES}`,
          path: ["licenseType"],
        });
      }
    });
};
