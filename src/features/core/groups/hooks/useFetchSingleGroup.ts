import { useSignOut } from "react-auth-kit";
import { useQuery } from "react-query";
import { TGroup, TGroupMember } from "../types";
import axios from "axios";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";

export interface IGetSingleGroupProps {
  id: number;
}

export const QUERY_KEY_FOR_SINGLE_GROUP = "single-group";
export const getSingleGroup = async (vals: {
  props: IGetSingleGroupProps;
  auth: ICurrentCompany;
}): Promise<TGroup> => {
  const { props, auth } = vals;
  const id = props.id;

  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/group/${id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
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

export const useFetchSingleGroup = ({ id }: IGetSingleGroupProps) => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_GROUP, id],
    () =>
      getSingleGroup({
        auth: {
          companyId,

          token,
        },
        props: {
          id,
        },
      }),
    {
      // refetchInterval: false,
      // refetchIntervalInBackground: false,
      // refetchOnWindowFocus: false,
      onError: (err: any) => {},
    }
  );

  return queryData;
};
