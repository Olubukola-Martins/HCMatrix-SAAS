import axios from "axios";
import {
  ICurrentCompany,
  TBank,
  TEducationDetail,
  TEmployee,
  TEmployeeDependant,
  TEmployeeStatus,
  TEmployementHistory,
  TJobInfo,
  TPension,
  TPersonalInfo,
  TSkill,
  TWallet,
} from "../../AppTypes/DataEntitities";
import { IPaginationProps } from "../../AppTypes/Pagination";
import { ISearchParams } from "../../AppTypes/Search";

export type TBulkEmployeeImport = {
  firstName: string;
  lastName: string;
  email: string;
  hasSelfService: boolean;
  empUid: string;
  roleId: number;
  designationId: number;
  jobInformation: {
    startDate: string;
    jobTitle: string;
    monthlyGross: number;
    employmentType: string;
    workModel: string;
    numberOfDaysPerWeek: number;
    departmentId: string;
  };
};

export interface ICreateEmpProps extends ICurrentCompany {
  firstName: string;
  lastName: string;
  email: string;
  hasSelfService: boolean;
  empUid?: string;
  roleId: number;
  designationId: number;
  jobInformation: {
    startDate: string;
    jobTitle: string;
    monthlyGross: number;
    employmentType: string;
    workModel: string;
    numberOfDaysPerWeek: number;

    lineManagerId?: number;
  };
}

export interface IEmpInviteProps extends ICurrentCompany {
  emails: string;
}

export const createEmployee = async (props: ICreateEmpProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee`;
  const config = {
    headers: {
      // Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes
  const data = {
    firstName: props.firstName,
    lastName: props.lastName,
    email: props.email,
    hasSelfService: props.hasSelfService,
    roleId: props.roleId,
    designationId: props.designationId,
    empUid: props.empUid,
    jobInformation: {
      startDate: props.jobInformation.startDate,
      monthlyGross: props.jobInformation.monthlyGross,
      employmentType: props.jobInformation.employmentType,
      workModel: props.jobInformation.workModel,
      numberOfDaysPerWeek: props.jobInformation.numberOfDaysPerWeek,
      lineManagerId: props.jobInformation.lineManagerId,
    },
  };
  if (!props.empUid) delete data["empUid"];
  if (!props.jobInformation.lineManagerId)
    delete data["jobInformation"]["lineManagerId"];

  const response = await axios.post(url, data, config);
  return response;
};
export interface IUpdateEmpProps extends ICurrentCompany {
  employeeId: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  hasSelfService?: boolean;
  empUid?: string;
  roleId?: number;
  designationId?: number;
  avatarUrl?: string;
}
// serves 4 both update n create
export interface ICreateEmpWalletProps extends ICurrentCompany, TWallet {
  employeeId: number;
}
export const createEmployeeWallet = async (props: ICreateEmpWalletProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}/finance/wallet`;
  const config = {
    headers: {
      // Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes

  // made the data any so that the props that are not needed can be deleted
  const data: any = {
    ...props,
  };
  // delete the props that are not needed as the will result in an error
  delete data["token"]; //not needed
  delete data["companyId"]; //not needed
  delete data["employeeId"]; //not needed

  const response = await axios.post(url, data, config);
  return response;
};
export interface ICreateEmpBankProps extends ICurrentCompany, TBank {
  employeeId: number;
}
export const createEmployeeBank = async (props: ICreateEmpBankProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}/finance/bank`;
  const config = {
    headers: {
      // Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes

  // made the data any so that the props that are not needed can be deleted
  const data: any = {
    ...props,
  };
  // delete the props that are not needed as the will result in an error
  delete data["token"]; //not needed
  delete data["companyId"]; //not needed
  delete data["employeeId"]; //not needed

  const response = await axios.post(url, data, config);
  return response;
};
export interface ICreateEmpPensionProps extends ICurrentCompany, TPension {
  employeeId: number;
}
export const createEmployeePension = async (props: ICreateEmpPensionProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}/finance/pension`;
  const config = {
    headers: {
      // Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes

  // made the data any so that the props that are not needed can be deleted
  const data: any = {
    ...props,
  };
  // delete the props that are not needed as the will result in an error
  delete data["token"]; //not needed
  delete data["companyId"]; //not needed
  delete data["employeeId"]; //not needed

  const response = await axios.post(url, data, config);
  return response;
};
export interface IDelEmpEmploymentHistoryProps extends ICurrentCompany {
  employeeId: number;
  historyId: number;
}
export const deleteEmployeeEmploymentHistory = async (
  props: IDelEmpEmploymentHistoryProps
) => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}/employment-history/${props.historyId}`;

  const config = {
    headers: {
      // Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const response = await axios.delete(url, config);
  return response;
};
export interface IDelEmpEducationDetailProps extends ICurrentCompany {
  employeeId: number;
  detailId: number;
}
export const deleteEmployeeEducationDetail = async (
  props: IDelEmpEducationDetailProps
) => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}/education-detail/${props.detailId}`;

  const config = {
    headers: {
      // Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const response = await axios.delete(url, config);
  return response;
};
export interface IDelEmpSkillProps extends ICurrentCompany {
  employeeId: number;
  skillId: number;
}
export const deleteEmployeeSkill = async (props: IDelEmpSkillProps) => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}/skill/${props.skillId}`;

  const config = {
    headers: {
      // Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const response = await axios.delete(url, config);
  return response;
};
export interface ISaveEmpSkillProps extends ICurrentCompany, TSkill {
  employeeId: number;
  skillId?: number;
}
export const saveEmployeeSkill = async (props: ISaveEmpSkillProps) => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}/skill`;
  if (props.skillId) {
    url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}/skill/${props.skillId}`;
  }
  const config = {
    headers: {
      // Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes

  // made the data any so that the props that are not needed can be deleted
  const data: any = {
    ...props,
  };
  // delete the props that are not needed as the will result in an error
  delete data["token"]; //not needed
  delete data["companyId"]; //not needed
  delete data["employeeId"]; //not needed

  if (props.skillId) {
    delete data["skillId"];
    const response = await axios.patch(url, data, config);
    return response;
  } else {
    const response = await axios.post(url, data, config);
    return response;
  }
};
export interface ISaveEmpEducationDetailProps
  extends ICurrentCompany,
    TEducationDetail {
  employeeId: number;
  detailId?: number;
}
export const saveEmployeeEducationDetail = async (
  props: ISaveEmpEducationDetailProps
) => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}/education-detail`;
  if (props.detailId) {
    url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}/education-detail/${props.detailId}`;
  }
  const config = {
    headers: {
      // Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes

  // made the data any so that the props that are not needed can be deleted
  const data: any = {
    ...props,
  };
  // delete the props that are not needed as the will result in an error
  delete data["token"]; //not needed
  delete data["companyId"]; //not needed
  delete data["employeeId"]; //not needed
  if (props.detailId) {
    delete data["detailId"];

    const response = await axios.patch(url, data, config);
    return response;
  } else {
    const response = await axios.post(url, data, config);
    return response;
  }
};
export interface ISaveEmpEmployementHistoryProps
  extends ICurrentCompany,
    TEmployementHistory {
  employeeId: number;
  historyId?: number;
}
export const saveEmployeeEmployementHistory = async (
  props: ISaveEmpEmployementHistoryProps
) => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}/employment-history`;
  if (props.historyId) {
    url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}/employment-history/${props.historyId}`;
  }
  const config = {
    headers: {
      // Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes

  // made the data any so that the props that are not needed can be deleted
  const data: any = {
    ...props,
  };
  // delete the props that are not needed as the will result in an error
  delete data["token"]; //not needed
  delete data["companyId"]; //not needed
  delete data["employeeId"]; //not needed
  if (props.historyId) {
    delete data["historyId"];

    const response = await axios.patch(url, data, config);
    return response;
  } else {
    const response = await axios.post(url, data, config);
    return response;
  }
};
// serves 4 both update n create
export interface ICreateEmpJobInfoProps extends ICurrentCompany, TJobInfo {
  employeeId: number;
}
export const createEmployeeJobInfo = async (props: ICreateEmpJobInfoProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}/job-information`;
  const config = {
    headers: {
      // Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes

  // made the data any so that the props that are not needed can be deleted
  const data: any = {
    ...props,
  };
  // delete the props that are not needed as the will result in an error
  delete data["token"]; //not needed
  delete data["companyId"]; //not needed
  delete data["employeeId"]; //not needed
  if (!props.lineManagerId) delete data["lineManagerId"];

  const response = await axios.post(url, data, config);
  return response;
};
export const updateEmployeeJobInfo = async (props: ICreateEmpJobInfoProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}/job-information`;
  const config = {
    headers: {
      // Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes

  // made the data any so that the props that are not needed can be deleted
  const data: any = {
    ...props,
  };
  // delete the props that are not needed as the will result in an error
  delete data["token"]; //not needed
  delete data["companyId"]; //not needed
  delete data["employeeId"]; //not needed
  if (!props.lineManagerId) delete data["lineManagerId"];

  const response = await axios.put(url, data, config);
  return response;
};
export interface ICreateEmpPersonalInfoProps
  extends ICurrentCompany,
    TPersonalInfo {
  employeeId: number;
}
export const createEmployeePersonalInfo = async (
  props: ICreateEmpPersonalInfoProps
) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}/personal-information`;
  const config = {
    headers: {
      // Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes

  // made the data any so that the props that are not needed can be deleted
  const data: any = {
    ...props,
  };
  // delete the props that are not needed as the will result in an error
  delete data["token"]; //not needed
  delete data["companyId"]; //not needed
  delete data["employeeId"]; //not needed
  if (!props.address.lgaId) delete data["address"]["lgaId"];

  const response = await axios.post(url, data, config);
  return response;
};
export const updateEmployeePersonalInfo = async (
  props: ICreateEmpPersonalInfoProps
) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}/personal-information`;
  const config = {
    headers: {
      // Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes

  // made the data any so that the props that are not needed can be deleted
  const data: any = {
    ...props,
  };
  // delete the props that are not needed as the will result in an error
  delete data["token"]; //not needed
  delete data["companyId"]; //not needed
  delete data["employeeId"]; //not needed
  if (!props.address.lgaId) delete data["address"]["lgaId"];

  const response = await axios.put(url, data, config);
  return response;
};
export const updateEmployee = async (props: IUpdateEmpProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}`;
  const config = {
    headers: {
      // Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes

  // made the data any so that the props that are not needed can be deleted
  const data: any = {
    ...props,
  };
  // delete the props that are not needed as the will result in an error
  delete data["token"]; //not needed
  delete data["companyId"]; //not needed
  delete data["employeeId"]; //not needed
  delete data["email"]; //not needed

  const response = await axios.patch(url, data, config);
  return response;
};

export const employeeInvite = async (props: IEmpInviteProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/invite`;
  const config = {
    headers: {
      // Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const data: any = {
    emails: props.emails.split(","),
  };

  const response = await axios.post(url, data, config);
  return response;
};

interface IGetEmpsProps extends ICurrentCompany {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
  status?: TEmployeeStatus[];
}
export interface IGetSingleEmpProps extends ICurrentCompany {
  employeeId: number;
}
interface IResendInviteProps extends ICurrentCompany {
  id: number;
}

export const getInvitedEmployees = async (props: IGetEmpsProps) => {
  const { pagination } = props;
  const limit = pagination?.limit ?? 10;
  const offset = pagination?.offset ?? 0;
  const name = props.searchParams?.name ?? "";

  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/invite?limit=${limit}&offset=${offset}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const response = await axios.get(url, config);
  return response;
};
export const resendEmployeeInvite = async (props: IResendInviteProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/invite/${props.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const response = await axios.get(url, config);
  return response;
};
export const getEmployees = async (
  props: IGetEmpsProps
): Promise<{ data: TEmployee[]; total: number }> => {
  const { pagination } = props;
  const limit = pagination?.limit ?? 10;
  const offset = pagination?.offset ?? 0;

  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee?limit=${limit}&offset=${offset}`;
  if (props.status) {
    url += "&status=" + props.status.toString();
  }
  if (props.searchParams?.name) {
    url += `&search=${props.searchParams.name}`;
  }

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TEmployee[] = result.map(
    (item: TEmployee): TEmployee => ({
      ...item,
      // No need as we adhere to same type as backend
    })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};
export const getSingleEmployee = async (
  props: IGetSingleEmpProps
): Promise<TEmployee> => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data.data as TEmployee;
  const fetchedData = res.data.data;
  const wallet = fetchedData?.finance?.find(
    (item: any) => item.key === "wallet"
  )?.value as TWallet;
  const bank = fetchedData?.finance?.find((item: any) => item.key === "bank")
    ?.value as TBank;
  const pension = fetchedData?.finance?.find(
    (item: any) => item.key === "pension"
  )?.value as TPension;
  const skills = fetchedData?.skills?.map(
    (item: any): TSkill => ({
      competency: item.competency,
      skill: item.skill,
      id: item.id,
    })
  );
  const employmentHistory = fetchedData?.employmentHistory?.map(
    (item: any): TEmployementHistory => ({
      organization: item.organization,
      startDate: item.startDate,
      endDate: item.endDate,
      id: item.id,
      position: item.position,
    })
  );
  const educationDetails = fetchedData?.educationDetails?.map(
    (item: any): TEducationDetail => ({
      specialization: item.specialization,
      startDate: item.startDate,
      endDate: item.endDate,
      id: item.id,
      degree: item.degree,
      school: item.school,
    })
  );
  const dependents = fetchedData?.dependents?.map(
    (item: any): TEmployeeDependant => ({
      id: item.id,
      fullName: item.fullName,
      dob: item.dob,
      relationship: item.relationship,
      phoneNumber: item.phoneNumber,
    })
  );

  // const item = fetchedData.result;
  // TO DO -> update employee type and populate with neccessary data
  // TO DO -> default image to be shown 4 user -> use first letter url (laravel)
  // To Do -> updating employee info

  const data: TEmployee = {
    ...item,
    companyId: item.companyId,
    avatarUrl: item.avatarUrl,

    createdAt: item.createdAt,
    deletedAt: item.deletedAt,
    designation: item.designation, //adhered to backend
    designationId: item.designationId,
    email: item.email,
    empUid: item.empUid,
    firstName: item.firstName,
    hasSelfService: item.hasSelfService,
    id: item.id,
    jobInformation: item.jobInformation,
    lastName: item.lastName,
    personalInformation: item.personalInformation,
    role: item.role,
    roleId: item.roleId,
    status: item.status,
    updatedAt: item.updatedAt,
    userId: item.userId,
    // --------------
    finance: {
      wallet,
      bank,
      pension,
    },
    skills,
    employmentHistory,
    educationDetails,
    dependents,
    emergencyContact: item?.emergencyContact,

    // no need to breakdown as we adhere to Backend Schema sent from respone
  };

  return data;
};

// dependants

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type MakeDependantInput = PartialBy<TEmployeeDependant, "id">;
export interface IAddDependantToEmployeeProps
  extends ICurrentCompany,
    MakeDependantInput {
  employeeId: number;
}
export const addDependantToEmployee = async (
  props: IAddDependantToEmployeeProps
) => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}/dependent`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes
  const data: any = {
    ...props,
  };

  delete data["companyId"];
  delete data["token"];
  delete data["id"];
  delete data["employeeId"];

  const response = await axios.post(url, data, config);
  return response;
};
export interface IUpdateDependantOfEmployeeProps
  extends ICurrentCompany,
    TEmployeeDependant {
  employeeId: number;
}
export const updateDependantOfEmployee = async (
  props: IUpdateDependantOfEmployeeProps
) => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}/dependent/${props.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes
  const data: any = {
    ...props,
  };

  delete data["companyId"];
  delete data["token"];
  delete data["id"];
  delete data["employeeId"];

  const response = await axios.patch(url, data, config);
  return response;
};
export interface IDeleteDependantOfEmployeeProps extends ICurrentCompany {
  employeeId: number;
  dependantId: number;
}
export const deleteDependantOfEmployee = async (
  props: IDeleteDependantOfEmployeeProps
) => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}/dependent/${props.dependantId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes
  const data: any = {
    ...props,
  };

  delete data["companyId"];
  delete data["token"];

  const response = await axios.delete(url, config);
  return response;
};

interface ISaveEmergencyContactProps extends ICurrentCompany {
  fullName: string;
  address: string;
  relationship: string;
  phoneNumber: string;
  employeeId: number;
}
// emergency contact
export const saveEmployeeEmergencyContact = async (
  props: ISaveEmergencyContactProps
) => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}/emergency-contact`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes
  const data: any = {
    ...props,
  };

  delete data["companyId"];
  delete data["token"];
  delete data["id"];
  delete data["employeeId"];

  const response = await axios.post(url, data, config);
  return response;
};
