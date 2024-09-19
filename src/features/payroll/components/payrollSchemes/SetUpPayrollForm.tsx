import PageSubHeader from "components/layout/PageSubHeader";
import { DatePicker, Form, InputNumber, Skeleton, Switch } from "antd";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { FormWorkflowInput } from "features/core/workflows/components/FormWorkflowInput";
import { SalaryComponentsContainer } from "../salaryComponents/SalaryComponentsContainer";
import { AddSalaryComponentForm } from "../salaryComponents/AddSalaryComponent";
import { useQueryClient } from "react-query";
import { useSetupPayrollScheme } from "features/payroll/hooks/scheme/useSetupPayrollScheme";
import { openNotification } from "utils/notifications";
import { QUERY_KEY_FOR_PAYROLL_SCHEME_BY_TYPE_OR_ID } from "features/payroll/hooks/scheme/useGetPayrollSchemeByTypeOrId";
import {
  TSalaryComponent,
  TSalaryComponentInput,
} from "features/payroll/types/salaryComponents";
import { useUpdatePayrollScheme } from "features/payroll/hooks/scheme/useUpdatePayrollScheme";
import {
  TPayrollSchemeType,
  TProjectParticipantTableEntry,
  TSinglePayrollScheme,
} from "features/payroll/types/payrollSchemes";
import { PayrollSingleProjectParticipantsContainer } from "../projectParticipants/PayrollSingleProjectParticipantsContainer";
import { TSetupPayrollSchemeData } from "features/payroll/types/setUpSchemeInputData";
import { FormCostCentreInput } from "../costCentres/FormCostCentreInput";
import { TSingleProject } from "features/core/projects/types";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { TSingleProjectPayrollScheme } from "features/payroll/types/payrollSchemes/singleProject";
import { Moment } from "moment";
import { convertObjectToKeyMomentValues } from "features/payroll/utils/convertObjectToKeyMomentValues";
import { useUpdateProjectParticipantGrossPay } from "features/payroll/hooks/scheme/project/useUpdateProjectParticipantGrossPay";
import { generalValidationRules } from "utils/formHelpers/validation";
import moment from "moment";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { Link } from "react-router-dom";
import { appRoutes } from "config/router/paths";

const DEFAULT_COMPONENT_LABELS = {
  thirteenthMonthSalary: "thirteenth_month_salary",
  tax: "tax",
  nsitf: "nsitf",
  itf: "itf",
  nif: "nif",
  pension: "pension",
  overtime: "overtime",
  leaveAllowance: "leave_allowance",
  employerPensionContribution: "employer_pension_contribution",
  bonus: "bonus",
};
const boxStyle = "px-4 py-3 shadow rounded-md bg-mainBg";
const boxTitle = "font-medium text-base pb-1";
const inputStyle =
  "w-full rounded-md border border-gray-300 py-2 px-2 text-sm bg-mainBg focus:outline-none";

const initialState: TActionState = {
  allowDisbursement: false,

  allowApproval: false,

  issuePayslip: false,
  runAutomatically: false,
  displayAllowances: false,
  displayDeductions: false,
  display13thMonth: false,
  displayLeaveAllowance: false,
  displayNIF: false,
  displayNSITF: false,
  displayITF: false,
  displayPension: false,
  displayOvertime: false,
  displayTax: false,
  displayEmployerPensionContribution: false,
  displayBonus: false,

  displayProjectParticipantsExpatriate: false,
  displayProjectParticipantsNonExpatriate: false,
  allowances: [],
  deductions: [],
  projectParticipants: [],
};

interface TActionState {
  allowDisbursement: boolean;
  allowApproval: boolean;
  issuePayslip: boolean;
  runAutomatically: boolean;
  displayAllowances: boolean;
  displayDeductions: boolean;
  display13thMonth: boolean;
  displayLeaveAllowance: boolean;
  displayNIF: boolean;
  displayNSITF: boolean;
  displayITF: boolean;
  displayPension: boolean;
  displayOvertime: boolean;
  displayTax: boolean;
  displayEmployerPensionContribution: boolean;
  displayBonus: boolean;

  displayProjectParticipantsExpatriate: boolean;
  displayProjectParticipantsNonExpatriate: boolean;
  allowances: TSalaryComponent[];
  deductions: TSalaryComponent[];
  projectParticipants?: TProjectParticipantTableEntry[];
}

type TActionType =
  | "displayEmployerPensionContribution"
  | "displayBonus"
  | "allowDisbursement"
  | "allowApproval"
  | "issuePayslip"
  | "runAutomatically"
  | "displayAllowances"
  | "displayDeductions"
  | "display13thMonth"
  | "displayLeaveAllowance"
  | "displayNIF"
  | "displayNSITF"
  | "displayITF"
  | "displayPension"
  | "displayOvertime"
  | "displayTax"
  | "displayProjectParticipantsExpatriate"
  | "displayProjectParticipantsNonExpatriate";

type TAllowanceActionType = "setAllowance";
type TDeducutionActionType = "setDeduction";
type TInitializeActionType = "setInitialData";
type TProjectParticipantsActionType = "handleProjectParticipants";

function reducer(
  state: TActionState,
  action:
    | { type: TActionType }
    | {
        type: TAllowanceActionType;
        allowances: TSalaryComponent[];
      }
    | {
        type: TDeducutionActionType;
        deductions: TSalaryComponent[];
      }
    | {
        type: TInitializeActionType;
        state: TActionState;
      }
    | {
        type: TProjectParticipantsActionType;
        projectParticipants: TProjectParticipantTableEntry[];
      }
): TActionState {
  switch (action.type) {
    case "setInitialData":
      return action.state;
    case "setDeduction":
      return {
        ...state,
        deductions: action.deductions,
      };
    case "setAllowance":
      return {
        ...state,
        allowances: action.allowances,
      };
    case "allowDisbursement":
      return {
        ...state,
        allowDisbursement: !state.allowDisbursement,
      };
    case "allowApproval":
      return {
        ...state,
        allowApproval: !state.allowApproval,
      };
    case "issuePayslip":
      return {
        ...state,
        issuePayslip: !state.issuePayslip,
      };
    case "runAutomatically":
      return {
        ...state,
        runAutomatically: !state.runAutomatically,
      };
    case "displayAllowances":
      return {
        ...state,
        displayAllowances: !state.displayAllowances,
      };
    case "displayDeductions":
      return {
        ...state,
        displayDeductions: !state.displayDeductions,
      };
    case "display13thMonth":
      return {
        ...state,
        display13thMonth: !state.display13thMonth,
      };
    case "displayLeaveAllowance":
      return {
        ...state,
        displayLeaveAllowance: !state.displayLeaveAllowance,
      };

    case "displayTax":
      return {
        ...state,
        displayTax: !state.displayTax,
      };
    case "displayProjectParticipantsExpatriate":
      return {
        ...state,
        displayProjectParticipantsExpatriate:
          !state.displayProjectParticipantsExpatriate,
      };
    case "displayProjectParticipantsNonExpatriate":
      return {
        ...state,
        displayProjectParticipantsNonExpatriate:
          !state.displayProjectParticipantsNonExpatriate,
      };
    case "displayOvertime":
      return {
        ...state,
        displayOvertime: !state.displayOvertime,
      };
    case "displayPension":
      return {
        ...state,
        displayPension: !state.displayPension,
      };
    case "displayITF":
      return {
        ...state,
        displayITF: !state.displayITF,
      };
    case "displayNSITF":
      return {
        ...state,
        displayNSITF: !state.displayNSITF,
      };
    case "displayNIF":
      return {
        ...state,
        displayNIF: !state.displayNIF,
      };
    case "displayEmployerPensionContribution":
      return {
        ...state,
        displayEmployerPensionContribution:
          !state.displayEmployerPensionContribution,
      };
    case "displayBonus":
      return {
        ...state,
        displayBonus: !state.displayBonus,
      };
    case "handleProjectParticipants":
      return {
        ...state,
        projectParticipants: action.projectParticipants,
      };
    default:
      return state;
  }
}

export const SetUpPayrollForm: React.FC<{
  scheme?: TSinglePayrollScheme;
  frequency?: "monthly" | "daily" | number;
  isFetching: boolean;
  name: string;
  type: TPayrollSchemeType;
  project?: TSingleProject;
  baseCurrency?: string;
  description?: string;
}> = ({
  scheme,
  isFetching,
  frequency = "monthly",
  name,
  type,
  project,
  baseCurrency,
  description = `Set up payroll based on the gross pay assigned to employees`,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    projectParticipants: project?.employees?.map((item) => ({
      id: item.id,
      key: item.employee.empUid,

      name: getEmployeeFullName(item.employee),
      empuid: item.employee.empUid,
      amount: 0,
      employeeId: item.employeeId,
      grossPay: 0,
      exchangeRate: {
        currency: item.employee.personalInformation.exchangeRate?.currency,
        rate: item.employee.personalInformation.exchangeRate.rate,
      },
      expatriate:
        item.employee.personalInformation.eligibility === "expatriate",
    })),
  });
  const {
    allowApproval,
    allowDisbursement,
    runAutomatically,
    issuePayslip,
    displayAllowances,
    displayDeductions,
    display13thMonth,
    displayLeaveAllowance,
    displayNIF,
    displayNSITF,
    displayITF,
    displayPension,
    displayOvertime,
    displayTax,
    displayProjectParticipantsNonExpatriate,
    displayProjectParticipantsExpatriate,
    allowances,
    deductions,
    projectParticipants,
    displayEmployerPensionContribution,
    displayBonus,
  } = state;
  const {
    mutate: mutateProjectPartcipant,
    isLoading: isLoadingProjectPartcipantUpdate,
  } = useUpdateProjectParticipantGrossPay();
  const handleProjectParticipants = (props: {
    employeeId: number;
    grossPay: number;
    projectParticipantId: number;
  }) => {
    const { employeeId, grossPay, projectParticipantId } = props;
    const updateParticipantsLocally = () => {
      const updatedParticipants = projectParticipants?.map((item) =>
        item.employeeId === employeeId ? { ...item, grossPay: grossPay } : item
      );
      if (updatedParticipants) {
        dispatch({
          type: "handleProjectParticipants",
          projectParticipants: updatedParticipants,
        });
      }
    };
    if (scheme) {
      mutateProjectPartcipant(
        {
          schemeId: scheme?.id,
          projectParticipantId,
          body: {
            grossPay,
          },
        },
        {
          onError: (err: any) => {
            openNotification({
              state: "error",
              title: "Error Occurred",
              duration: 2,
              description:
                err?.response.data.message ?? err?.response.data.error.message,
            });
          },
          onSuccess: (res: any) => {
            openNotification({
              state: "success",

              title: "Success",
              description: res.data.message,
              // duration: 0.4,
            });
            form.resetFields();

            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_PAYROLL_SCHEME_BY_TYPE_OR_ID],
            });
          },
        }
      );
      return;
    }
    updateParticipantsLocally();
  };
  const queryClient = useQueryClient();
  const [frequencyAmount, setFrequencyAmount] = useState<number>(0);

  const [form] = Form.useForm();
  const { mutate: mutateSetup, isLoading: isLoadingSetup } =
    useSetupPayrollScheme();
  const { mutate: mutateUpdate, isLoading: isLoadingUpdate } =
    useUpdatePayrollScheme();

  const handleUpdate = useCallback(
    (data: TSetupPayrollSchemeData) => {
      if (scheme) {
        mutateUpdate(
          {
            schemeId: scheme?.id,
            body: {
              allowApproval,
              allowDisbursement,
              automaticRunDay:
                type === "project"
                  ? JSON.stringify(
                      Array(frequencyAmount)
                        .fill(0)
                        .reduce((values, item, i) => {
                          values[`Payment${i + 1}`] = (data as unknown as any)[
                            `Payment${i + 1}`
                          ].format("YYYY-MM-DD");
                          return values;
                        }, {})
                    )
                  : data.automaticRunDay,
              frequency: type === "project" ? data?.frequency : frequency,
              projectId: type === "project" ? scheme?.projectId : undefined,

              issuePayslip,
              name,

              runAutomatically,
              type,
              workflowId: data.workflowId,
              // costCentreId: data.costCentreId,
            },
          },
          {
            onError: (err: any) => {
              openNotification({
                state: "error",
                title: "Error Occurred",
                duration: 2,
                description:
                  err?.response.data.message ??
                  err?.response.data.error.message,
              });
            },
            onSuccess: (res: any) => {
              openNotification({
                state: "success",

                title: "Success",
                description: res.data.message,
                // duration: 0.4,
              });
              form.resetFields();
              setEditScheme(false);

              queryClient.invalidateQueries({
                queryKey: [QUERY_KEY_FOR_PAYROLL_SCHEME_BY_TYPE_OR_ID],
              });
            },
          }
        );
      }
    },
    [
      scheme,
      mutateUpdate,
      allowApproval,
      allowDisbursement,
      type,
      frequencyAmount,
      frequency,
      issuePayslip,
      name,
      runAutomatically,
      form,
      queryClient,
    ]
  );
  const handleSetup = useCallback(
    (data: TSetupPayrollSchemeData) => {
      mutateSetup(
        {
          salaryComponents: [
            ...allowances.map(
              (item): TSalaryComponentInput => ({ ...item, type: "allowance" })
            ),
            ...deductions.map(
              (item): TSalaryComponentInput => ({ ...item, type: "deduction" })
            ),
          ],
          allowApproval,
          allowDisbursement,
          automaticRunDay:
            type === "project" && runAutomatically
              ? JSON.stringify(
                  Array(frequencyAmount)
                    .fill(0)
                    .reduce((values, item, i) => {
                      values[`Payment${i + 1}`] = (data as unknown as any)[
                        `Payment${i + 1}`
                      ].format("YYYY-MM-DD");
                      return values;
                    }, {})
                )
              : data.automaticRunDay,
          frequency: type === "project" ? data?.frequency : frequency,
          projectParticipants:
            type === "project"
              ? projectParticipants?.map((item) => ({
                  employeeId: item.employeeId,
                  grossPay: item.grossPay,
                }))
              : undefined,
          projectId: project?.id,
          issuePayslip,
          name,

          runAutomatically,
          type,
          workflowId: data.workflowId,
          // costCentreId: data.costCentreId,
        },
        {
          onError: (err: any) => {
            openNotification({
              state: "error",
              title: "Error Occurred",
              duration: 2,
              description:
                err?.response.data.message ?? err?.response.data.error.message,
            });
          },
          onSuccess: (res: any) => {
            openNotification({
              state: "success",

              title: "Success",
              description: res.data.message,
              // duration: 0.4,
            });
            setEditScheme(false);

            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_PAYROLL_SCHEME_BY_TYPE_OR_ID],
            });
          },
        }
      );
    },
    [
      mutateSetup,
      allowances,
      deductions,
      allowApproval,
      allowDisbursement,
      type,
      frequencyAmount,
      frequency,
      projectParticipants,
      project?.id,
      issuePayslip,
      name,
      runAutomatically,
      queryClient,
    ]
  );
  const handleSubmit = useCallback(
    (data: TSetupPayrollSchemeData) => {
      if (scheme) {
        handleUpdate(data);
        return;
      }
      handleSetup(data);
    },
    [scheme, handleUpdate, handleSetup]
  );

  const handleAddAllowance = useCallback(
    (props: TSalaryComponentInput) => {
      if (allowances.find((item) => item.name === props.name)) {
        openNotification({
          state: "error",
          title: "Component Exists Already!",
          description: "This name has been taken by another component",
        });
        return;
      }
      const newAllowance: TSalaryComponent = {
        ...props,
        id: 0,
        updatedAt: "",
        createdAt: "",
        schemeId: 0,
      };
      dispatch({
        type: "setAllowance",
        allowances: [...allowances, newAllowance],
      });
    },
    [allowances]
  );
  const handleAddDeduction = useCallback(
    (props: TSalaryComponentInput) => {
      if (deductions.find((item) => item.name === props.name)) {
        openNotification({
          state: "error",
          title: "Component Exists Already!",
          description: "This name has been taken by another component",
        });
        return;
      }
      const newDeduction: TSalaryComponent = {
        ...props,
        id: 0,
        updatedAt: "",
        createdAt: "",
        schemeId: 0,
      };
      dispatch({
        type: "setDeduction",
        deductions: [...deductions, newDeduction],
      });
    },
    [deductions]
  );
  const handleDeleteAllowance = (props: TSalaryComponent) => {
    dispatch({
      type: "setAllowance",
      allowances: allowances.filter((item) => item.name !== props.name),
    });
  };
  const handleDeleteDeduction = (props: TSalaryComponent) => {
    dispatch({
      type: "setDeduction",
      deductions: deductions.filter((item) => item.name !== props.name),
    });
  };
  const handleEditDeduction = (props: TSalaryComponent) => {
    dispatch({
      type: "setDeduction",
      deductions: deductions.map((item) =>
        item.name === props.name ? { ...item, ...props } : item
      ),
    });
  };
  const handleEditAllowance = (props: TSalaryComponent) => {
    dispatch({
      type: "setAllowance",
      allowances: allowances.map((item) =>
        item.name === props.name ? { ...item, ...props } : item
      ),
    });
  };
  const [editScheme, setEditScheme] = useState(false);

  useEffect(() => {
    if (scheme) {
      type === "project" && setFrequencyAmount(+scheme.frequency);
      const ogAllowances =
        scheme?.salaryComponents.filter((item) => item.type === "allowance") ??
        [];
      const ogDeductions =
        scheme?.salaryComponents.filter((item) => item.type === "deduction") ??
        [];
      const ogSalaryComponents = [...ogAllowances, ...ogDeductions];
      dispatch({
        type: "setInitialData",
        state: {
          ...initialState,
          allowDisbursement: scheme?.allowDisbursement,
          allowApproval: scheme?.allowApproval,
          runAutomatically:
            scheme.type === "wages" ? false : scheme?.runAutomatically,

          displayEmployerPensionContribution: !!ogSalaryComponents.find(
            (item) =>
              item.label ===
              DEFAULT_COMPONENT_LABELS.employerPensionContribution
          )?.isActive,
          displayBonus: !!ogSalaryComponents.find(
            (item) => item.label === DEFAULT_COMPONENT_LABELS.bonus
          )?.isActive,
          display13thMonth: !!ogSalaryComponents.find(
            (item) =>
              item.label === DEFAULT_COMPONENT_LABELS.thirteenthMonthSalary
          )?.isActive,
          displayTax: !!ogSalaryComponents.find(
            (item) => item.label === DEFAULT_COMPONENT_LABELS.tax
          )?.isActive,
          displayNSITF: !!ogSalaryComponents.find(
            (item) => item.label === DEFAULT_COMPONENT_LABELS.nsitf
          )?.isActive,
          displayNIF: !!ogSalaryComponents.find(
            (item) => item.label === DEFAULT_COMPONENT_LABELS.nif
          )?.isActive,
          displayOvertime: !!ogSalaryComponents.find(
            (item) => item.label === DEFAULT_COMPONENT_LABELS.overtime
          )?.isActive,
          displayPension: !!ogSalaryComponents.find(
            (item) => item.label === DEFAULT_COMPONENT_LABELS.pension
          )?.isActive,
          displayLeaveAllowance: !!ogSalaryComponents.find(
            (item) => item.label === DEFAULT_COMPONENT_LABELS.leaveAllowance
          )?.isActive,
          displayITF: !!ogSalaryComponents.find(
            (item) => item.label === DEFAULT_COMPONENT_LABELS.itf
          )?.isActive,

          issuePayslip: scheme?.issuePayslip,
          displayAllowances: ogAllowances.length > 0,
          displayDeductions: ogDeductions.length > 0,

          allowances: ogAllowances,
          deductions: ogDeductions,
          projectParticipants:
            type === "project"
              ? (
                  scheme as TSingleProjectPayrollScheme
                )?.projectParticipants.map((item) => ({
                  id: item.id,
                  key: item.employee.empUid,

                  name: getEmployeeFullName(item.employee),
                  empuid: item.employee.empUid,

                  employeeId: item.employeeId,
                  grossPay: +item.grossPay,
                  exchangeRate: {
                    currency:
                      item.employee.personalInformation.exchangeRate?.currency,
                    rate: item.employee.personalInformation.exchangeRate.rate,
                  },
                  expatriate:
                    item.employee.personalInformation.eligibility ===
                    "expatriate",
                }))
              : undefined,
        },
      });
      form.setFieldsValue({
        disbursement: scheme?.disbursement,
        workflowId: scheme?.workflowId,
        automaticRunDay: scheme?.automaticRunDay,
        // costCentreId: scheme?.costCentreId,
        frequency: +scheme?.frequency,
        ...convertObjectToKeyMomentValues(JSON.parse(scheme.automaticRunDay)),
      });

      setEditScheme(false);
    }
  }, [scheme, dispatch, form, project, type]);

  type TDefaultSalaryComp = {
    title: string;
    type: "allowance" | "deduction";
    handleSave?: (props: TSalaryComponentInput) => void;
    isActive: boolean;
    isDefault: boolean;
    dependencies: string[];
    description: string;
    onSwitch: () => void;
    isTax?: boolean;
    salaryComponent?: TSalaryComponent;

    componentName: string;
    schemeId?: number;
  };
  const salaryComponents = useMemo(
    () => [...allowances, ...deductions],
    [allowances, deductions]
  );
  const dependencies = salaryComponents.map((item) => item.label);
  const DEFAULT_SALARY_COMPONENTS: TDefaultSalaryComp[] = useMemo(
    () => [
      {
        title: "13th Month Salary",
        type: "allowance",
        handleSave: handleAddAllowance,
        isActive: display13thMonth,
        isDefault: true,
        dependencies,
        description: `This allows you to add a percentage of the employees' salary as
          a 13th month bonus(allowance) to be paid at the end of the year.`,
        onSwitch: () => dispatch({ type: "display13thMonth" }),
        salaryComponent: salaryComponents.find(
          (item) =>
            item.label === DEFAULT_COMPONENT_LABELS.thirteenthMonthSalary
        ),
        componentName: DEFAULT_COMPONENT_LABELS.thirteenthMonthSalary,
        schemeId: scheme?.id,
      },
      {
        title: "Tax",
        type: "deduction",
        handleSave: handleAddDeduction,
        isActive: displayTax,
        isDefault: true,
        dependencies,
        isTax: true,
        description: `This allows you to create an Tax component(deduction)`,
        onSwitch: () => dispatch({ type: "displayTax" }),
        salaryComponent: salaryComponents.find(
          (item) => item.label === DEFAULT_COMPONENT_LABELS.tax
        ),
        componentName: DEFAULT_COMPONENT_LABELS.tax,
        schemeId: scheme?.id,
      },
      {
        title: "Overtime",
        type: "allowance",
        handleSave: handleAddAllowance,
        isActive: displayOvertime,
        isDefault: true,
        dependencies,
        salaryComponent: salaryComponents.find(
          (item) => item.label === DEFAULT_COMPONENT_LABELS.overtime
        ),
        description: `This allows you to create an Overtime(allowance)`,
        onSwitch: () => dispatch({ type: "displayOvertime" }),

        componentName: DEFAULT_COMPONENT_LABELS.overtime,
        schemeId: scheme?.id,
      },
      {
        title: "NSITF",
        type: "allowance",
        handleSave: handleAddAllowance,
        isActive: displayNSITF,
        isDefault: true,
        dependencies,
        description: `This allows you to create an nsitf(allowance)`,
        onSwitch: () => dispatch({ type: "displayNSITF" }),
        salaryComponent: salaryComponents.find(
          (item) => item.label === DEFAULT_COMPONENT_LABELS.nsitf
        ),
        componentName: DEFAULT_COMPONENT_LABELS.nsitf,
        schemeId: scheme?.id,
      },
      {
        title: "NIF",
        type: "allowance",
        handleSave: handleAddAllowance,
        isActive: displayNIF,
        isDefault: true,
        dependencies,
        description: `This allows you to create an nif(allowance)`,
        onSwitch: () => dispatch({ type: "displayNIF" }),
        salaryComponent: salaryComponents.find(
          (item) => item.label === DEFAULT_COMPONENT_LABELS.nif
        ),
        componentName: DEFAULT_COMPONENT_LABELS.nif,
        schemeId: scheme?.id,
      },
      {
        title: "ITF",
        type: "allowance",
        handleSave: handleAddAllowance,
        isActive: displayITF,
        isDefault: true,
        dependencies,
        description: `This allows you to create an itf(allowance)`,
        onSwitch: () => dispatch({ type: "displayITF" }),
        salaryComponent: salaryComponents.find(
          (item) => item.label === DEFAULT_COMPONENT_LABELS.itf
        ),
        componentName: DEFAULT_COMPONENT_LABELS.itf,
        schemeId: scheme?.id,
      },
      // {
      //   title: "Leave Allowance",
      //   type: "allowance",
      //   handleSave: handleAddAllowance,
      //   isActive: displayLeaveAllowance,
      //   isDefault: true,
      //   dependencies,
      //   description: `This allows you to create a leave allowance`,
      //   salaryComponent: salaryComponents.find(
      //     (item) => item.label === DEFAULT_COMPONENT_LABELS.leaveAllowance
      //   ),
      //   onSwitch: () => dispatch({ type: "displayLeaveAllowance" }),

      //   componentName: DEFAULT_COMPONENT_LABELS.leaveAllowance,
      //   schemeId: scheme?.id,
      // },
      {
        title: "Pension",
        type: "deduction",
        handleSave: handleAddAllowance,
        isActive: displayPension,
        isDefault: true,
        dependencies,
        description: `This allows you to create an pension(allowance)`,
        onSwitch: () => dispatch({ type: "displayPension" }),
        salaryComponent: salaryComponents.find(
          (item) => item.label === DEFAULT_COMPONENT_LABELS.pension
        ),
        componentName: DEFAULT_COMPONENT_LABELS.pension,
        schemeId: scheme?.id,
      },
      {
        title: "Employer Pension Contribution",
        type: "deduction",
        handleSave: handleAddAllowance,
        isActive: displayEmployerPensionContribution,
        isDefault: true,
        dependencies,
        description: `This allows you to create an employer pension contribution(deduction)`,
        onSwitch: () =>
          dispatch({ type: "displayEmployerPensionContribution" }),
        salaryComponent: salaryComponents.find(
          (item) =>
            item.label === DEFAULT_COMPONENT_LABELS.employerPensionContribution
        ),
        componentName: DEFAULT_COMPONENT_LABELS.employerPensionContribution,
        schemeId: scheme?.id,
      },
      {
        title: "Bonus",
        type: "allowance",
        handleSave: handleAddAllowance,
        isActive: displayBonus,
        isDefault: true,
        dependencies,
        description: `This allows you to create a bonus (allowance)`,
        onSwitch: () => dispatch({ type: "displayBonus" }),
        salaryComponent: salaryComponents.find(
          (item) => item.label === DEFAULT_COMPONENT_LABELS.bonus
        ),
        componentName: DEFAULT_COMPONENT_LABELS.bonus,
        schemeId: scheme?.id,
      },
    ],
    [
      salaryComponents,
      dependencies,
      display13thMonth,
      displayITF,
      displayLeaveAllowance,
      displayNIF,
      displayNSITF,
      displayOvertime,
      displayPension,
      displayTax,
      displayBonus,
      displayEmployerPensionContribution,
      handleAddAllowance,
      handleAddDeduction,
      scheme,
    ]
  );
  const [paymentDates, setPaymentDates] = useState<string[]>([]);
  return (
    <div className="flex flex-col gap-4">
      <PageSubHeader
        hideBackground
        description={description}
        actions={[
          {
            hidden: false,
            name: editScheme ? "Cancel" : "Edit",
            loading: isLoadingSetup,
            handleClick: () => {
              setEditScheme((prev) => !prev);
            },
            btnVariant: "transparent",
          },
          {
            hidden: !editScheme,
            loading: isLoadingSetup || isLoadingUpdate,

            name: "Save Changes",
            handleClick: () => {
              form.submit();
            },
            btnVariant: "default",
          },
        ]}
      />
      <Skeleton active loading={isFetching} paragraph={{ rows: 20 }}>
        <div className="bg-card px-5 py-7  rounded-md mt-7 grid grid-cols-1 md:grid-cols-1 gap-5 text-accent">
          <Form
            form={form}
            onFinish={handleSubmit}
            disabled={editScheme === false}
          >
            {/* first row */}
            <div className="flex flex-col gap-4">
              <div className={boxStyle}>
                <h5 className={boxTitle}>Payroll Scheme Type</h5>
                <input
                  className={inputStyle}
                  value={name ?? scheme?.name}
                  disabled
                />
              </div>

              <div className={boxStyle}>
                <h5 className={boxTitle}>Payroll Frequency</h5>

                {type !== "project" && (
                  <input className={inputStyle} value={frequency} disabled />
                )}
                {type === "project" && (
                  <>
                    <p className="text-sm mb-2">
                      How many split payments would you like to make ?
                    </p>
                    <div className="w-2/5">
                      <Form.Item name="frequency" noStyle>
                        <input
                          disabled={!editScheme}
                          className={`${inputStyle} disabled:cursor-not-allowed`}
                          type="number"
                          onChange={(e) => setFrequencyAmount(+e.target.value)}
                          value={frequencyAmount}
                          min={frequencyAmount}
                          placeholder="Amount of split payments"
                        />
                      </Form.Item>
                    </div>
                  </>
                )}
              </div>
              {type === "project" && (
                <>
                  {" "}
                  <div className={boxStyle}>
                    <div className="flex items-center justify-between">
                      <h5
                        className={boxTitle}
                        title="Set up the gross pay of each project participant "
                      >
                        Project Participants(Non - Expatriates)
                      </h5>
                      <Switch
                        checked={displayProjectParticipantsNonExpatriate}
                        onChange={() =>
                          dispatch({
                            type: "displayProjectParticipantsNonExpatriate",
                          })
                        }
                      />
                    </div>
                    <p className="text-sm">
                      Set up the gross pay of each project participant
                    </p>
                    {displayProjectParticipantsNonExpatriate && (
                      <div className="mt-2">
                        <PayrollSingleProjectParticipantsContainer
                          data={projectParticipants?.filter(
                            (item) => !item.expatriate
                          )}
                          handleParticipants={{
                            fn: handleProjectParticipants,
                            loading: isLoadingProjectPartcipantUpdate,
                          }}
                          baseCurrency={baseCurrency}
                        />
                      </div>
                    )}
                  </div>
                  <div className={boxStyle}>
                    <div className="flex items-center justify-between">
                      <h5
                        className={boxTitle}
                        title="Set up the gross pay of each project participant "
                      >
                        Project Participants(Expatriates)
                      </h5>
                      <Switch
                        checked={displayProjectParticipantsExpatriate}
                        onChange={() =>
                          dispatch({
                            type: "displayProjectParticipantsExpatriate",
                          })
                        }
                      />
                    </div>
                    <p className="text-sm">
                      Set up the gross pay of each project participant
                    </p>
                    {displayProjectParticipantsExpatriate && (
                      <div className="mt-2">
                        <PayrollSingleProjectParticipantsContainer
                          data={projectParticipants?.filter(
                            (item) => item.expatriate
                          )}
                          handleParticipants={{
                            fn: handleProjectParticipants,
                            loading: isLoadingProjectPartcipantUpdate,
                          }}
                          baseCurrency={baseCurrency}
                        />
                      </div>
                    )}
                  </div>
                </>
              )}
              <div className={boxStyle}>
                <div className="flex items-center justify-between">
                  <h5
                    className={boxTitle}
                    title="Do you want to disburse payment after approval/confirmation?"
                  >
                    Payroll Disbursement
                  </h5>

                  <Switch
                    checked={allowDisbursement}
                    onChange={() => dispatch({ type: "allowDisbursement" })}
                  />
                </div>
                <p className="text-sm">
                  Do you want to disburse payment after approval/confirmation?
                </p>
              </div>
              {/* <div className={boxStyle}>
                <h5 className={boxTitle}>Default Cost Centre</h5>
                <p className="text-sm">
                  This is the default cost centre that will be used when payroll
                  runs automatically
                </p>
                <div className="w-2/4 mt-4">
                  <FormCostCentreInput
                    Form={Form}
                    control={{
                      label: "",
                      name: "costCentreId",
                    }}
                  />
                </div>
              </div> */}
              <div className={boxStyle}>
                <div className="flex items-center justify-between">
                  <h5
                    className={boxTitle}
                    title="Manage all of the postive financial benefits that make up employees' pay"
                  >
                    Allowances
                  </h5>
                  <Switch
                    checked={displayAllowances}
                    onChange={() => dispatch({ type: "displayAllowances" })}
                  />
                </div>
                <p className="text-sm">
                  Manage all of the postive financial benefits that make up
                  employees' pay
                </p>
                {displayAllowances && (
                  <div className="mt-2">
                    <SalaryComponentsContainer
                      type={"allowance"}
                      schemeId={scheme?.id}
                      handleDeleteSalaryComponent={
                        scheme ? undefined : handleDeleteAllowance
                      }
                      handleAddSalaryComponent={
                        scheme ? undefined : handleAddAllowance
                      }
                      handleEditSalaryComponent={
                        scheme ? undefined : handleEditAllowance
                      }
                      dependencies={[...allowances, ...deductions]}
                      components={allowances.filter((item) => !item.isDefault)}
                    />
                  </div>
                )}
              </div>
              <div className={boxStyle}>
                <div className="flex items-center justify-between">
                  <h5
                    className={boxTitle}
                    title="Manage all of the negative financial benefits that make up employees' pay"
                  >
                    Deductions
                  </h5>
                  <Switch
                    checked={displayDeductions}
                    onChange={() => dispatch({ type: "displayDeductions" })}
                  />
                </div>
                <p className="text-sm">
                  Manage all of the negative financial benefits that make up
                  employees' pay
                </p>
                {displayDeductions && (
                  <div className="mt-2">
                    <SalaryComponentsContainer
                      type={"deduction"}
                      schemeId={scheme?.id}
                      handleAddSalaryComponent={
                        scheme ? undefined : handleAddDeduction
                      }
                      handleDeleteSalaryComponent={
                        scheme ? undefined : handleDeleteDeduction
                      }
                      handleEditSalaryComponent={
                        scheme ? undefined : handleEditDeduction
                      }
                      dependencies={[...allowances, ...deductions]}
                      components={deductions.filter((item) => !item.isDefault)}
                    />
                  </div>
                )}
              </div>
              <div className={boxStyle}>
                <div className="flex items-center justify-between">
                  <h5
                    className={boxTitle}
                    title="Do you want to add an approval process to payroll before confirmation/disbursement?"
                  >
                    Payroll Approval
                  </h5>
                  <Switch
                    checked={allowApproval}
                    onChange={() => dispatch({ type: "allowApproval" })}
                  />
                </div>
                <p className="text-sm">
                  Do you want to add an approval process to payroll before
                  confirmation/disbursement?
                </p>
                {allowApproval && (
                  <div className="mt-2">
                    <div className="flex items-center lg:justify-between">
                      <div className="w-2/5 space-y-4">
                        <FormWorkflowInput
                          Form={Form}
                          control={{ name: "workflowId", label: "" }}
                        />
                        <Link to={appRoutes.createWorkflow}>
                          Create Workflow
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {type !== "wages" && (
                <div className={boxStyle}>
                  <div className="flex items-center justify-between">
                    <h5 className={boxTitle}>Run Payroll automatically</h5>
                    <Switch
                      checked={runAutomatically}
                      onChange={() => dispatch({ type: "runAutomatically" })}
                    />
                  </div>
                  <p className="text-sm">
                    This will enable payroll to be run automatically every month
                    with the scheme's default settings
                  </p>
                  {runAutomatically && type !== "project" && (
                    <div className="mt-6">
                      <Form.Item
                        name={`automaticRunDay`}
                        noStyle
                        rules={generalValidationRules}
                      >
                        <InputNumber
                          placeholder="Select the day of execution in month"
                          min={1}
                          max={28}
                          className="w-2/5"
                        />
                      </Form.Item>
                    </div>
                  )}
                  {runAutomatically && type === "project" && (
                    <div className="mt-6 items-start grid lg:grid-cols-4 md:grid-cols-3 gap-2">
                      {Array(frequencyAmount)
                        .fill(0)
                        .map((item, i) => (
                          <Form.Item
                            className="w-full flex"
                            key={i}
                            name={`Payment${i + 1}`}
                            label={`Payment ${i + 1}`}
                            labelCol={{ span: 24 }}
                            rules={[
                              {
                                required: true,
                                validator: async (rule, value) => {
                                  // value is a moment object
                                  const isDateGreaterThanCurrentDay = (
                                    date: Moment
                                  ) => {
                                    const currentDate = moment();
                                    return date.isAfter(currentDate, "day"); // Check if selected date is greater than the current day
                                  };

                                  if (!isDateGreaterThanCurrentDay(value)) {
                                    throw new Error(
                                      "Please select a date greater than the current day"
                                    );
                                  }
                                  if (
                                    paymentDates[i] !== DEFAULT_DATE_FORMAT &&
                                    paymentDates.includes(
                                      value.format(DEFAULT_DATE_FORMAT)
                                    )
                                  ) {
                                    throw new Error(
                                      `Please select a date that hasn't been selected!`
                                    );
                                  }
                                  setPaymentDates((prev) => {
                                    const newDates = prev;
                                    newDates[i] =
                                      value.format(DEFAULT_DATE_FORMAT);
                                    return newDates;
                                  });

                                  return true;
                                },
                              },
                            ]}
                          >
                            <DatePicker className="w-full" />
                          </Form.Item>
                        ))}
                    </div>
                  )}
                </div>
              )}
              <div className={boxStyle}>
                <div className="flex items-center justify-between">
                  <h5
                    className={boxTitle}
                    title="Do you want to issue payslip, when payroll is approved/disbursed?"
                  >
                    Payslip Issuance
                  </h5>
                  <Switch
                    checked={issuePayslip}
                    onChange={() => dispatch({ type: "issuePayslip" })}
                  />
                </div>
                <p className="text-sm">
                  Do you want to issue payslip, when payroll is
                  approved/disbursed?
                </p>
              </div>
            </div>
          </Form>

          {/* second */}
          <div className="flex flex-col gap-4">
            {(type === "wages"
              ? DEFAULT_SALARY_COMPONENTS.filter(
                  (item) => item.componentName !== "overtime"
                )
              : DEFAULT_SALARY_COMPONENTS
            ).map((item, i) => (
              <div key={i} className={`${boxStyle} text-sm`}>
                <div className="flex items-center justify-between">
                  <h5 className={boxTitle}>{item.title}</h5>{" "}
                  <Switch
                    checked={item.isActive}
                    onChange={item.onSwitch}
                    disabled={!editScheme}
                  />
                </div>
                <p className="text-sm">{item.description}</p>

                {
                  <div className={`${item.isActive ? "block" : "hidden"}`}>
                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-5 mt-5">
                      <div>
                        <AddSalaryComponentForm
                          disabled={!editScheme}
                          type={item.type}
                          isDefault={item.isDefault}
                          isActive={item.isActive}
                          handleSave={scheme ? undefined : item.handleSave}
                          dependencies={item.dependencies}
                          componentName={item.componentName}
                          schemeId={item.schemeId}
                          isTax={item.isTax}
                          salaryComponent={item.salaryComponent}
                          defaultCalculationMode={
                            item.componentName === "tax"
                              ? "table"
                              : "percentage"
                          }
                        />
                      </div>
                    </div>
                  </div>
                }
              </div>
            ))}
          </div>
        </div>
      </Skeleton>
    </div>
  );
};
