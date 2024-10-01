import {
  GENDERS,
  MARITAL_STATUSES,
  EMPLOYMENT_ELIGIBILITIES,
} from "constants/general";
import { TIME_ZONES } from "constants/timeZones";
import { TExchangeRateListItem } from "features/payroll/types";
import { TCountry } from "types/country";
import { TEmploymentEligibity } from "types/employementEligibilities";
import { TLga } from "types/lgas";
import { TState } from "types/states";
import { z } from "zod";

type TValidateProps = {
  exchangeRates?: TExchangeRateListItem[];
  countries?: TCountry[];
  states?: TState[];
  lgas?: TLga[];
};

const ACCEPTED_GENDER_VALUES = GENDERS.map((item) => item.value);
const ACCEPTED_MARITAL_STATUS_VALUES = MARITAL_STATUSES.map(
  (item) => item.value
);
const ACCEPTED_EMPLOYMENT_ELIGIBILITIES_VALUES = EMPLOYMENT_ELIGIBILITIES;
const ACCEPTED_TIMEZONE_VALUES = TIME_ZONES.map((item) =>
  item.value.toLowerCase()
);

export const personalInfoValidationSchema = (props: TValidateProps) => {
  const { exchangeRates, countries, states, lgas } = props;
  return z
    .object({
      dob: z.string().datetime(),
      gender: z.string().transform((val) => val.toLowerCase()),
      phoneNumber: z.string(),
      eligibility: z.string().transform((val) => val.toLowerCase()),
      exchangeRateId: z
        .string()
        .optional()
        .transform((val) => {
          if (val) {
            return exchangeRates?.find(
              (item) => item.currency.toLowerCase() === val.toLowerCase()
            )?.id;
          }
          return undefined;
        }),
      maritalStatus: z.string().transform((val) => val.toLowerCase()),
      nationality: z.string().transform((val) => val.toLowerCase()),
      address: z.object({
        streetAddress: z.string(),
        timezone: z.string().optional(),
        countryId: z.string().transform((val) => {
          if (val) {
            return countries?.find(
              (item) => item.name.toLowerCase() === val.toLowerCase()
            )?.id;
          }
          return undefined;
        }),
        stateId: z.string().transform((val) => {
          if (val) {
            return states?.find(
              (item) => item.name.toLowerCase() === val.toLowerCase()
            )?.id;
          }
          return undefined;
        }),
        lgaId: z
          .string()
          .optional()
          .transform((val) => {
            if (val) {
              return lgas?.find(
                (item) => item.name.toLowerCase() === val.toLowerCase()
              )?.id;
            }
            return undefined;
          }),
      }),
      passportExpirationDate: z
        .string()
        .transform((val) => {
          if (val !== "" || val) {
            return val;
          }
          return undefined;
        })
        .optional(),
      validDocumentUrl: z.string().url().optional(),
      alternativeEmail: z.string().email().optional(),
      alternativePhoneNumber: z.string().optional(),
      nin: z
        .number()
        .optional()
        .transform((val) => (val ? `${val}` : null)), // TODO: add validation for needed if eligibility is citizen
    })
    .superRefine((data, ctx) => {
      // dob should be in format ACCEPTED_DATE_FORMAT, and not in future
      if (data.dob) {
        const date = new Date(data.dob);
        if (date > new Date()) {
          ctx.addIssue({
            code: "custom",
            message: "Date of Birth cannot be in the future",
          });
        }
      }
      if (!ACCEPTED_GENDER_VALUES.includes(data.gender)) {
        ctx.addIssue({
          code: "custom",
          message: `Gender has to be one of ${ACCEPTED_GENDER_VALUES}`,
        });
      }
      if (!ACCEPTED_MARITAL_STATUS_VALUES.includes(data.maritalStatus)) {
        ctx.addIssue({
          code: "custom",
          message: `Marital Status has to be one of ${ACCEPTED_MARITAL_STATUS_VALUES}`,
        });
      }
      if (
        !ACCEPTED_EMPLOYMENT_ELIGIBILITIES_VALUES.includes(
          data.eligibility as TEmploymentEligibity
        )
      ) {
        ctx.addIssue({
          code: "custom",
          message: `Eligibility has to be one of ${ACCEPTED_EMPLOYMENT_ELIGIBILITIES_VALUES}`,
        });
      }
      //   exchangeRateId
      if (data.exchangeRateId) {
        if (!exchangeRates?.some((item) => item.id === data.exchangeRateId)) {
          ctx.addIssue({
            code: "custom",
            message: `Exchange Rate has to be one of ${exchangeRates?.map(
              (item) => item.currency
            )}`,
          });
        }
      }
      // nationality
      if (
        !countries?.some(
          (item) => item.name.toLowerCase() === data.nationality.toLowerCase()
        )
      ) {
        ctx.addIssue({
          code: "custom",
          message: `Nationality has to be one of ${countries?.map(
            (item) => item.name
          )}`,
        });
      }
      // address
      if (!countries?.some((item) => item.id === data.address.countryId)) {
        ctx.addIssue({
          code: "custom",
          message: `Country has to be one of ${countries?.map(
            (item) => item.name
          )}`,
        });
      }
      if (!states?.some((item) => item.id === data.address.stateId)) {
        ctx.addIssue({
          code: "custom",
          message: `State has to be one of ${states?.map((item) => item.name)}`,
        });
      }
      if (
        data.address.lgaId &&
        !lgas?.some((item) => item.id === data.address.lgaId)
      ) {
        ctx.addIssue({
          code: "custom",
          message: `Lga has to be one of ${lgas?.map((item) => item.name)}`,
        });
      }
      if (
        data.address.timezone &&
        !ACCEPTED_TIMEZONE_VALUES.includes(data.address.timezone.toLowerCase())
      ) {
        ctx.addIssue({
          code: "custom",
          message: `Timezone has to be one of ${ACCEPTED_TIMEZONE_VALUES}`,
        });
      }
      // passportExpirationDate is only required if eligigibility is `expatriate`
      if (
        (data.eligibility as TEmploymentEligibity) === "expatriate" &&
        !data.passportExpirationDate
      ) {
        ctx.addIssue({
          code: "custom",
          message:
            "Passport Expiration Date is required when eligibility is expatriate",
        });
      }
      if (
        (data.eligibility as TEmploymentEligibity) === "expatriate" &&
        data.passportExpirationDate
      ) {
        // should not be in the past
        if (new Date(data.passportExpirationDate) < new Date()) {
          ctx.addIssue({
            code: "custom",
            message: "Passport Expiration Date cannot be in the past",
          });
        }
      }
    });
};

export type TJobInfo = {
  startDate: string;
  employmentType: string;
  workModel: string;
  numberOfDaysPerWeek: number;
  hireDate: string;
  probationEndDate: string;
  confirmationDate: string;
  lineManagerId?: number;
  branchId?: number;
  payrollType?: "direct-salary" | "office" | "wages";
  monthlyGross: number;
  gradeId?: number;
  frequency?: "daily" | "monthly";
  hourlyRate: number;
};
