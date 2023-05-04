import {
  ICurrentCompany,
  TBranch,
  TEmployee,
  TEmployeeStatus,
} from "AppTypes/DataEntitities";
import { IPaginationProps } from "AppTypes/Pagination";
import { ISearchParams } from "AppTypes/Search";
import axios from "axios";
import { useQuery } from "react-query";

// TO DO : need to exist in the general data entities and refactored
interface IGetDataProps extends ICurrentCompany {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}
type TResumptionInformation = {
  branchId: number;
  resumptionDateAndTime: string;
  whoToCallId: number;
  documentUrl: string;
};
export type TOnboardingTask = {
  name: string;
  description: string;
  priority: "high" | "low" | "medium";
  supervisor: {
    id: number;
    firstName: string;
    lastName: string;
  };
  startDate: string;
  endDate: string;
  id: number;
};
export type TOnboarding = {
  id: number;
  status: string;
  employee: TEmployee;
  resumptionInformation?: TResumptionInformation;
  tasks?: TOnboardingTask[];
};

const getAllOnboarding = async (
  props: IGetDataProps
): Promise<{ data: TOnboarding[]; total: number }> => {
  const { pagination } = props;
  const limit = pagination?.limit ?? 10;
  const offset = pagination?.offset ?? 0;
  const name = props.searchParams?.name ?? "";

  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/self-service/onboarding`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
    params: {
      limit,
      offset,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;
  console.log("result", result);

  const data: TOnboarding[] = result.map(
    (item: any): TOnboarding => ({
      id: item.id,
      status: item.status,

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
    })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useFetchAllOnboarding = (props: IGetDataProps) => {
  const { pagination, searchParams } = props;
  const queryData = useQuery(
    [
      "all-onboarding",
      pagination?.current,
      pagination?.limit,
      searchParams?.name,
    ],
    () =>
      getAllOnboarding({
        ...props,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
