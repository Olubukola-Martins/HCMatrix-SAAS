import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TExtraStorage } from "features/billing/types/addOns/extraStorage";

export const QUERY_KEY_FOR_ALL_EXTRA_STORAGES = "all-extra-storages";

const getData = async (props: {
  auth: ICurrentCompany;
}): Promise<{ data: TExtraStorage[]; total: number }> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription/add-ons/storage`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const result = res.data.data;

  const data: TExtraStorage[] = result.map(
    (item: TExtraStorage): TExtraStorage => ({ ...item })
  );

  const ans = {
    data,
    total: data.length,
  };

  return ans;
};

export const useGetAllExtraStorages = () => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_ALL_EXTRA_STORAGES],
    () =>
      getData({
        auth: { token, companyId },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
