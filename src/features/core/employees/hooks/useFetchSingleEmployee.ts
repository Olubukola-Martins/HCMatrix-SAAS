import { ICurrentCompany } from "types";

import axios from "axios";
import { useQuery } from "react-query";
import { useApiAuth } from "hooks/useApiAuth";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import {
  TEmployee,
  TWallet,
  TBank,
  TPension,
  TSkill,
  TManagerHistory,
  TDirectReport,
  TUserGroup,
  TEmployementHistory,
  TEducationDetail,
  TEmployeeDependant,
} from "../types";

export const QUERY_KEY_FOR_SINGLE_EMPLOYEE = "single-employee";

export const getSingleEmployee = async (
  props: ICurrentCompany & { employeeId: number }
): Promise<TEmployee> => {
  let url = `${MICROSERVICE_ENDPOINTS.UTILITY}/employee/${props.employeeId}`;

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
  const managerHistory = fetchedData?.managerHistory?.map(
    (item: any): TManagerHistory => ({
      id: item.id,
      currentManager: item.currentManager,
      from: item.from,
      to: item.to,
      lineManager: {
        id: item.lineManager.id,
        firstName: item.lineManager.firstName,
        lastName: item.lineManager.lastName,
        email: item.lineManager.email,
      },
    })
  );
  const directReports = fetchedData?.directReport?.map(
    (item: any): TDirectReport => ({
      id: item.id,
      currentManager: item.currentManager,
      from: item.from,
      to: item.to,
      employee: {
        id: item.employee.id,
        firstName: item.employee.firstName,
        lastName: item.employee.lastName,
        email: item.employee.email,
      },
    })
  );
  const userGroups = fetchedData?.userGroups?.map(
    (item: any): TUserGroup => ({
      id: item.id,

      name: item.group.name,
      description: item.group.description,
      isLead: item.isLead,
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
    userGroups,
    managerHistory,
    directReports,
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
export const useFetchSingleEmployee = ({
  employeeId,
}: {
  employeeId: number;
}) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_EMPLOYEE, employeeId],
    () =>
      getSingleEmployee({
        companyId,
        token,
        employeeId,
      }),

    {
      enabled: !!employeeId,
      onError: (err: any) => {},
    }
  );

  return queryData;
};
