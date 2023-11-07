import axios from "axios";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { TOnboarding } from "../types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { useApiAuth } from "hooks/useApiAuth";

export const QUERY_KEY_FOR_ONBOARDING = "all-onboarding";

// TO DO : need to exist in the general data entities and refactored
interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}

const getAllOnboarding = async (vals: {
  props: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<{ data: TOnboarding[]; total: number }> => {
  const { props, auth } = vals;
  const { pagination } = props;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.searchParams?.name ?? "";

  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/self-service/onboarding`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
    params: {
      limit,
      offset,
      search: name,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

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

export const useFetchAllOnboarding = (props: IGetDataProps = {}) => {
  const { companyId, token } = useApiAuth();
  const { pagination, searchParams } = props;
  const queryData = useQuery(
    [QUERY_KEY_FOR_ONBOARDING, pagination?.limit, searchParams?.name],
    () =>
      getAllOnboarding({
        auth: {
          token,
          companyId,
        },
        props,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
