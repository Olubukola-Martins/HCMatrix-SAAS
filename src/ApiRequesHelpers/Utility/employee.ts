import axios from "axios";
import {
  ICurrentCompany,
  TEmployeeStatus,
  TPersonalInfo,
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
    },
  };

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
}

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

  const response = await axios.post(url, data, config);
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
export const getEmployees = async (props: IGetEmpsProps) => {
  const { pagination } = props;
  const limit = pagination?.limit ?? 10;
  const offset = pagination?.offset ?? 0;
  const name = props.searchParams?.name ?? "";

  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee?limit=${limit}&offset=${offset}`;
  if (props.status) {
    url += "&status=" + props.status.toString();
  }

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
export const getSingleEmployee = async (props: IGetSingleEmpProps) => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}`;

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
