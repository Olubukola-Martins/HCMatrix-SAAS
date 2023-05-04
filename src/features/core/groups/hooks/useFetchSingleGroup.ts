import { useSignOut } from "react-auth-kit";
import { useQuery } from "react-query";
import { IGetSingleGroupProps, TGroup, TGroupMember } from "../types";
import axios from "axios";

export const QUERY_KEY_FOR_SINGLE_GROUP = "single-group";
export const getSingleGroup = async (
  props: IGetSingleGroupProps
): Promise<TGroup> => {
  const id = props.id;

  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/group/${id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data.data;

  const data: TGroup = {
    id: item.id,
    name: item.name,
    email: item.email,
    description: item.description,
    employees: item?.employees.map(
      (item: any): TGroupMember => ({
        id: item.id,

        firstName: item.employee.firstName,
        isLead: item.isLead,
        lastName: item.employee.lastName,
        employeeId: item.employeeId,
        empUid: item.empUid,
        email: item.employee.email,
      })
    ),
  };
  return data;
};

export const useFetchSingleGroup = ({
  id,
  companyId,

  token,
}: IGetSingleGroupProps) => {
  const signOut = useSignOut();

  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_GROUP, id],
    () =>
      getSingleGroup({
        companyId,
        id,

        token,
      }),
    {
      // refetchInterval: false,
      // refetchIntervalInBackground: false,
      // refetchOnWindowFocus: false,
      onError: (err: any) => {
        signOut();
        localStorage.clear();
      },
    }
  );

  return queryData;
};
