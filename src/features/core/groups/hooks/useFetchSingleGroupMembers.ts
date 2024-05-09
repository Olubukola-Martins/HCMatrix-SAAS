import axios from "axios";
import { useQuery } from "react-query";
import { TGroupMember } from "../types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { useApiAuth } from "hooks/useApiAuth";

export const QUERY_KEY_FOR_SINGLE_GROUP_MEMBERS = "single-group-members";

interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}
export const getSingleGroupMembers = async (vals: {
  props: IGetDataProps;
  id: number;
  auth: ICurrentCompany;
}): Promise<{ total: number; data: TGroupMember[] }> => {
  const { props, id, auth } = vals;
  const { pagination, searchParams } = props;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const search = searchParams?.name;

  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/group/${id}/management`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
    params: {
      offset,
      limit,
      search,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TGroupMember[] = result.map(
    (item: any): TGroupMember => ({
      id: item.id,
      firstName: item.employee.firstName,
      isLead: item.isLead,
      lastName: item.employee.lastName,
      employeeId: item.employeeId,
      empUid: item.empUid,
      email: item.employee.email,
      avatarUrl: item.employee?.avatarUrl,
    })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useFetchSingleGroupMembers = (vals: {
  props: IGetDataProps;
  id: number;
}) => {
  const { token, companyId } = useApiAuth();

  const { props, id } = vals;
  const { pagination, searchParams } = props;
  const queryData = useQuery(
    [
      QUERY_KEY_FOR_SINGLE_GROUP_MEMBERS,
      id,
      pagination?.limit,
      searchParams?.name,
    ],
    () =>
      getSingleGroupMembers({
        auth: {
          companyId,
          token,
        },
        id,
        props,
      }),
    {
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
