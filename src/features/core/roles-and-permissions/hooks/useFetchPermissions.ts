import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { TPermission } from "../types";
import axios from "axios";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { openNotification } from "utils/notifications";

export const QUERY_KEY_FOR_PERMISSIONS = "permissions";

interface IGetPemProps extends ICurrentCompany {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}
export const getPermissions = async (props: IGetPemProps) => {
  const { pagination } = props;
  const limit = pagination?.limit ?? 10;
  const offset = pagination?.offset ?? 0;

  const url = `${MICROSERVICE_ENDPOINTS.AUTHENTICATION}/permission`;

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

  const response = await axios.get(url, config);
  return response;
};

interface IFRQDataProps {
  companyId: number;
  token: string;
}

interface ICategory {
  id: number;
  name: string;
}

interface IFRQDataReturnProps {
  permissions: TPermission[];
  categories: ICategory[];
}

export const useFetchPermissions = ({ companyId, token }: IFRQDataProps) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_PERMISSIONS],
    () =>
      getPermissions({
        companyId,
        token,
      }),
    {
      // refetchInterval: false,
      // refetchIntervalInBackground: false,
      // refetchOnWindowFocus: false,
      onError: (err: any) => {
        // show notification
        openNotification({
          state: "error",
          title: "Error Occured",
          description:
            err?.response.data.message ?? err?.response.data.error.message,
        });
      },

      select: (res: any) => {
        // for all for now
        const result = res.data.data;

        const categories: ICategory[] = [];
        const permissions: TPermission[] = [];

        result.forEach((category: any) => {
          categories.push({ id: category.id, name: category.name });
          category.permissions.forEach((item: TPermission) => {
            permissions.push({
              ...item,
            });
          });
        });
        const ans: IFRQDataReturnProps = {
          permissions,
          categories: [
            {
              id: 0,
              name: "all",
            },
            ...categories,
          ],
        };

        return ans;
      },
    }
  );

  return queryData;
};
