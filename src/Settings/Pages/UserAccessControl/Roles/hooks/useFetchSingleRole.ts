import { ICurrentCompany, TPermission, TRole } from "AppTypes/DataEntitities";

import axios from "axios";
import { useQuery } from "react-query";

// TO DO : need to exist in the general data entities and refactored
interface IGetDataProps extends ICurrentCompany {
  id: number;
}

const getSingleRole = async (props: IGetDataProps): Promise<TRole> => {
  const url = `${process.env.REACT_APP_AUTHENTICATION_BASE_URL}/permission/role/${props.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data.data;

  const data: TRole = {
    id: item.id,
    name: item.name,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    userCount: item.userCount ?? 0,
    permissions: item?.permissions.map(
      (item: any): TPermission => ({
        permissionId: item.permissionId,
        name: item.permission.name,
        label: item.permission.label,
        categoryId: item.permission.categoryId,
        description: item.permission.description,

        id: item.permission.id,
      })
    ),
  };
  return data;
};

export const useFetchSingleRole = (props: IGetDataProps) => {
  const queryData = useQuery(
    ["single-role", props.id],
    () =>
      getSingleRole({
        ...props,
      }),
    {
      enabled: props.id !== 0,
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
