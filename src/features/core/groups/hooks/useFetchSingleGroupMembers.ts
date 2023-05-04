import axios from "axios";
import { useQuery } from "react-query";
import {
  IFRQSingleGroupMembersDataProps,
  IGetSingleGroupMembersProps,
  TGroupMember,
} from "../types";

export const QUERY_KEY_FOR_SINGLE_GROUP_MEMBERS = "single-group-members";

export const getSingleGroupMembers = async (
  props: IGetSingleGroupMembersProps
): Promise<{ total: number; data: TGroupMember[] }> => {
  const id = props.id;
  const { pagination, searchParams } = props;
  const limit = pagination?.limit ?? 10;
  const offset = pagination?.offset ?? 0;
  const search = searchParams?.name;

  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/group/${id}/management`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
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

export const useFetchSingleGroupMembers = ({
  pagination,
  companyId,
  onSuccess,
  token,
  searchParams,
  id,
}: IFRQSingleGroupMembersDataProps) => {
  const queryData = useQuery(
    [
      QUERY_KEY_FOR_SINGLE_GROUP_MEMBERS,
      id,
      pagination?.limit,
      searchParams?.name,
    ],
    () =>
      getSingleGroupMembers({
        companyId,
        pagination,
        searchParams,
        token,
        id,
      }),
    {
      onSuccess: (data) => {
        onSuccess && onSuccess(data);
      },
    }
  );

  return queryData;
};
