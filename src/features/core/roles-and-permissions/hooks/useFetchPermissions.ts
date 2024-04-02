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
): Promise<TResponse> => {
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
  return response.data as unknown as TResponse;
};

interface ICategory {
  id: number;
  name: string;
}

interface IFRQDataReturnProps {
  permissions: TPermission[];
  categories: ICategory[];
}

// response
interface TResponse {
  message: string;
  data: Datum[];
}

interface Datum {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  permissions: TPermission[];
}

// response

export const ARTIFICIAL_KEY_FOR_ALL_PERMISSIONS_CATEGORY = 0;
export const PREDEFINED_LABEL_NAME_FOR_ADMIN_ROLE = "admin";
export const PREDEFINED_LABEL_NAME_FOR_EMPLOYEE_ROLE = "employee";
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

      select: (res) => {
        // for all for now
        const result = res.data;

        const categories: ICategory[] = [];
        const permissions: TPermission[] = [];

        result.forEach((category: Datum) => {
          categories.push({ id: category.id, name: category.name });
          category.permissions.forEach((item) => {
            permissions.push({
              ...item,
            });
          });
        });
        const ans: IFRQDataReturnProps = {
          permissions: [
            ...permissions,
            ...permissions.map((item) => ({
              //group all permissions under all permisions category
              ...item,
              categoryId: ARTIFICIAL_KEY_FOR_ALL_PERMISSIONS_CATEGORY,
            })),
          ],
          categories: [
            {
              id: ARTIFICIAL_KEY_FOR_ALL_PERMISSIONS_CATEGORY,
              name: "all", //all permissions category
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
