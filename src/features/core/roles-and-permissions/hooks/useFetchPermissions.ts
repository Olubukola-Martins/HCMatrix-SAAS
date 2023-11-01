import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { TPermission } from "../types";
import axios from "axios";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { openNotification } from "utils/notifications";
import { useApiAuth } from "hooks/useApiAuth";
import { DEFAULT_PAGE_SIZE } from "constants/general";

export const QUERY_KEY_FOR_PERMISSIONS = "permissions";

interface IGetPemProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}
export const getPermissions = async (
  props: IGetPemProps,
  auth: ICurrentCompany
) => {
  const { pagination } = props;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;

  const url = `${MICROSERVICE_ENDPOINTS.AUTHENTICATION}/permission`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
    params: {
      limit,
      offset,
    },
  };

  const response = await axios.get(url, config);
  return response;
};

interface ICategory {
  id: number;
  name: string;
}

interface IFRQDataReturnProps {
  permissions: TPermission[];
  categories: ICategory[];
}

export const useFetchPermissions = (props: IGetPemProps = {}) => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_PERMISSIONS, props],
    () =>
      getPermissions(props, {
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
