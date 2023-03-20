import { ICurrentCompany } from "AppTypes/DataEntitities";

import axios from "axios";
import { useQuery } from "react-query";
import { TOnboarding, TOnboardingTask } from "./useFetchAllOnboarding";

// TO DO : need to exist in the general data entities and refactored
interface IGetDataProps extends ICurrentCompany {
  id: number;
}

const getSingleOnboarding = async (
  props: IGetDataProps
): Promise<TOnboarding> => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/self-service/onboarding/${props.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data.data;

  const tasks = item?.tasks?.map(
    (item: any): TOnboardingTask => ({
      id: item.id,
      name: item.name,
      description: item.description,
      priority: item.priority,
      supervisor: {
        id: item.supervisor.id,
        firstName: item.supervisor.firstName,
        lastName: item.supervisor.lastName,
      },
      startDate: item.startDate,
      endDate: item.endDate,
    })
  );

  const data: TOnboarding = {
    id: item.id,
    status: item.status,
    tasks,
    resumptionInformation: item.resumptionInformation
      ? {
          branchId: item.resumptionInformation?.branchId,
          documentUrl: item.resumptionInformation?.documentUrl,
          whoToCallId: item.resumptionInformation?.whoToCallId,
          resumptionDateAndTime:
            item.resumptionInformation?.resumptionDateAndTime,
        }
      : undefined,

    employee: {
      companyId: item.employee.companyId,
      avatarUrl: item.employee.avatarUrl,

      createdAt: item.employee.createdAt,
      deletedAt: item.employee.deletedAt,
      designation: item.employee.designation, //adhered to backend
      designationId: item.employee.designationId,
      email: item.employee.email,
      empUid: item.employee.empUid,
      firstName: item.employee.firstName,
      hasSelfService: item.employee.hasSelfService,
      id: item.employee.id,
      jobInformation: item.employee.jobInformation,
      lastName: item.employee.lastName,
      personalInformation: item.employee.personalInformation,
      role: item.employee.role,
      roleId: item.employee.roleId,
      status: item.employee.status,
      updatedAt: item.employee.updatedAt,
      userId: item.employee.userId,
    },
  };
  return data;
};

export const useFetchSingleOnboarding = (props: IGetDataProps) => {
  const queryData = useQuery(
    ["single-onboarding", props.id],
    () =>
      getSingleOnboarding({
        ...props,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
