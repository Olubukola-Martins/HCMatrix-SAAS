import {
  EMPLOYMENT_TYPES,
  MAX_NO_OF_WORKING_DAYS_PER_WEEK,
  MIN_NO_OF_WORKING_DAYS_PER_WEEK,
  WORK_MODELS,
} from "constants/general";
import { TBranch } from "features/core/branches/types";
import { TEmployee } from "features/core/employees/types";
import { PAYROLL_SCHEME_OPTIONS } from "features/payroll/constants";
import { TPayGrade } from "features/payroll/types";
import { TPayrollSchemeType } from "features/payroll/types/payrollSchemes";
import { z } from "zod";

type TValidateProps = {
  employees?: TEmployee[];
  branches?: TBranch[];
  payGrades?: TPayGrade[];
};
const ACCEPTED_EMPLOYMENT_TYPE_VALUES = EMPLOYMENT_TYPES.map((item) =>
  item.value.toLowerCase()
);
const ACCEPTED_WORK_MODEL_VALUES = WORK_MODELS.map((item) =>
  item.value.toLowerCase()
);
const ACCEPTED_PAYROLL_FREQUENCY_VALUES = ["daily", "monthly"];
const ACCEPTED_PAYROLL_TYPE_VALUES = PAYROLL_SCHEME_OPTIONS.filter(
  (item) => item.value !== "project"
).map((item) => item.value);
export const jobInformationValidationSchema = (props: TValidateProps) => {
  const { branches, payGrades, employees } = props;
  return z
    .object({
      hireDate: z.string().datetime(),
      startDate: z.string().datetime(),
      probationEndDate: z.string().datetime(),
      confirmationDate: z.string().datetime(),
      employmentType: z.string().transform((val) => val.toLowerCase()),
      workModel: z.string().transform((val) => val.toLowerCase()),
      numberOfDaysPerWeek: z
        .number()
        .min(MIN_NO_OF_WORKING_DAYS_PER_WEEK)
        .max(MAX_NO_OF_WORKING_DAYS_PER_WEEK),
      lineManagerId: z
        .string()
        .optional()
        .nullable()
        .transform((val) => {
          if (val) {
            return employees?.find((item) => item.empUid === val)?.id;
          }
          return undefined;
        }),
      branchId: z.string().transform((val) => {
        if (val) {
          return branches?.find(
            (item) => item.name.toLowerCase() === val.toLowerCase()
          )?.id;
        }
        return undefined;
      }),
      payrollType: z.string().transform((val) => val.toLowerCase()),
      monthlyGross: z
        .number()
        .optional()
        .nullable()
        .transform((val) => {
          if (val) {
            return +val;
          }
          return undefined;
        }),
      gradeId: z
        .string()
        .nullable()
        .optional()
        .transform((val) => {
          if (val) {
            return payGrades?.find(
              (item) => item.name.toLowerCase() === val.toLowerCase()
            )?.id;
          }
          return undefined;
        }),
      frequency: z.string().transform((val) => val.toLowerCase()),
      hourlyRate: z
        .number()
        .optional()
        .nullable()
        .transform((val) => {
          if (val) {
            return +val;
          }
          return undefined;
        }),
    })
    .superRefine((data, ctx) => {
      // hire date should not be in the future
      if (data.hireDate) {
        const hireDate = new Date(data.hireDate);
        if (hireDate > new Date()) {
          ctx.addIssue({
            code: "custom",
            message: "Hire Date cannot be in the future",
            path: ["hireDate"],
          });
        }
      }
      // start date should not be before hire date
      if (data.startDate) {
        const hireDate = new Date(data.hireDate);
        const startDate = new Date(data.startDate);
        if (hireDate > startDate) {
          ctx.addIssue({
            code: "custom",
            message: "Start Date cannot be before Hire Date",
            path: ["startDate"],
          });
        }
      }
      // probation end date should not be before start date
      if (data.probationEndDate) {
        const startDate = new Date(data.startDate);
        const probationEndDate = new Date(data.probationEndDate);
        if (startDate > probationEndDate) {
          ctx.addIssue({
            code: "custom",
            message: "Probation End Date cannot be before Start Date",
            path: ["probationEndDate"],
          });
        }
      }
      // confirmation date should not be before probation end date
      if (data.confirmationDate) {
        const probationEndDate = new Date(data.probationEndDate);
        const confirmationDate = new Date(data.confirmationDate);
        if (probationEndDate > confirmationDate) {
          ctx.addIssue({
            code: "custom",
            message: "Confirmation Date cannot be before Probation End Date",
            path: ["confirmationDate"],
          });
        }
      }
      //   employment type should be one of the accepted values
      if (!ACCEPTED_EMPLOYMENT_TYPE_VALUES.includes(data.employmentType)) {
        ctx.addIssue({
          code: "custom",
          message: `Employment Type has to be one of ${ACCEPTED_EMPLOYMENT_TYPE_VALUES}`,
          path: ["employmentType"],
        });
      }
      //   work model should be one of the accepted values
      if (!ACCEPTED_WORK_MODEL_VALUES.includes(data.workModel)) {
        ctx.addIssue({
          code: "custom",
          message: `Work Model has to be one of ${ACCEPTED_WORK_MODEL_VALUES}`,
          path: ["workModel"],
        });
      }
      // line manager if present should be an existing employee
      if (data.lineManagerId) {
        if (!employees?.find((item) => item.id === data.lineManagerId)) {
          ctx.addIssue({
            code: "custom",
            message: "Line Manager should be an existing employee",
            path: ["lineManagerId"],
          });
        }
      }
      // branch should be an existing branch

      if (!branches?.some((item) => item.id === data.branchId)) {
        ctx.addIssue({
          code: "custom",
          message: `Branch has to be one of the following: ${branches?.map(
            (item) => item.name
          )}`,
        });
      }

      // payroll type should be an accepted value
      if (
        !ACCEPTED_PAYROLL_TYPE_VALUES.includes(
          data.payrollType as TPayrollSchemeType
        )
      ) {
        ctx.addIssue({
          code: "custom",
          message: `Payroll Type has to be one of ${ACCEPTED_PAYROLL_TYPE_VALUES}`,
          path: ["payrollType"],
        });
      }
      // if payroll type is office or direct-salary, frequency should be monthly and only if wages is frequency allowed to be monthly or daily
      if (!ACCEPTED_PAYROLL_FREQUENCY_VALUES.includes(data.frequency)) {
        ctx.addIssue({
          code: "custom",
          message: `Frequency has to be one of ${ACCEPTED_PAYROLL_FREQUENCY_VALUES}`,
          path: ["frequency"],
        });
      }
      if (
        ["office", "direct-salary"].includes(
          data.payrollType as TPayrollSchemeType
        ) &&
        !["monthly"].includes(data.frequency)
      ) {
        ctx.addIssue({
          code: "custom",
          message: `Frequency has to be monthly for payroll type ${data.payrollType}`,
          path: ["frequency"],
        });
      }
      // if payroll type is direct salary, then monthly gross should be specified
      const monthlyGross = data.monthlyGross ?? 0;
      if (data.payrollType === "direct-salary" && monthlyGross <= 0) {
        ctx.addIssue({
          code: "custom",
          message: `Monthly Gross has to be greater than 0 for payroll type ${data.payrollType}`,
          path: ["monthlyGross"],
        });
      }

      // if payroll type is wages, then hourly rate should be specified
      const hourlyRate = data.hourlyRate ?? 0;
      if (data.payrollType === "wages" && hourlyRate <= 0) {
        ctx.addIssue({
          code: "custom",
          message: `Hourly rate has to be greater than 0 for payroll type ${data.payrollType}`,
          path: ["hourlyRate"],
        });
      }
      // if payroll type is office, then gradeId should be present and valid
      const gradeId = data.gradeId;

      if (
        data.payrollType === "office" &&
        !payGrades?.some((item) => item.id === gradeId)
      ) {
        ctx.addIssue({
          code: "custom",
          message: `Pay grade has to be one of the following ${payGrades?.map(
            (item) => item.name
          )} for an ${data.payrollType} payroll`,
          path: ["gradeId"],
        });
      }
    });
};
