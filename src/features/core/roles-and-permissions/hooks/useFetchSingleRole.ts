import axios from "axios";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { TRole, TPermission } from "../types";
import { useApiAuth } from "hooks/useApiAuth";

const QUERY_KEY_FOR_SINGLE_ROLE = "single-role";

interface IGetDataProps {
  id: number;
}

const getSingleRole = async (
  props: IGetDataProps,
  auth: ICurrentCompany
): Promise<TRole> => {
  const url = `${process.env.REACT_APP_AUTHENTICATION_BASE_URL}/permission/role/${props.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data.data;

  const data: TRole = {
    id: item.id,
    name: item.name,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    label: item.label,

    userCount: item.employeeCount ?? 0,
    permissions: item?.permissions.map(
      (item: TPermission): TPermission => ({
        ...item,
      })
    ),
  };
  return data;
};

export const useFetchSingleRole = (props: IGetDataProps) => {
  const { companyId, token } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_ROLE, props.id],
    () =>
      getSingleRole(props, {
        companyId,
        token,
      }),
    {
      enabled: props.id !== 0,
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
