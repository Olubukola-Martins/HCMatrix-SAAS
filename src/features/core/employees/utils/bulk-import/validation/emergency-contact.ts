import { RELATIONSHIPS } from "constants/general";
import { TCountry } from "types/country";
import { z } from "zod";

const ACCEPTED_RELATIONSHIP_VALUES = RELATIONSHIPS.map((item) => item.value);

type TValidateProps = { countries?: TCountry[] };

export const emergencyContactValidationSchema = (props: TValidateProps) => {
  const { countries } = props;
  return z
    .object({
      fullName: z.string(),
      address: z.string().min(10),
      //   relationship: (typeof RELATIONSHIPS)[number]["value"];
      relationship: z.string().transform((val) => val.toLowerCase()),
      phoneNumber: z.string(),
    })
    .superRefine((data, ctx) => {
      if (!ACCEPTED_RELATIONSHIP_VALUES.includes(data.relationship)) {
        ctx.addIssue({
          code: "custom",
          message: `Relationship has to be one of ${ACCEPTED_RELATIONSHIP_VALUES}`,
          path: ["relationship"],
        });
      }
    });
};
