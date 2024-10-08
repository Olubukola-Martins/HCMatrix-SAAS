import axios from "axios";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { TOnboarding } from "../types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { useApiAuth } from "hooks/useApiAuth";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";

export const QUERY_KEY_FOR_ONBOARDING = "all-onboarding";

// TO DO : need to exist in the general data entities and refactored
interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}

const getAllOnboarding = async (vals: {
  props: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<{ data: TOnboarding[]; total: number }> => {
  const { props, auth } = vals;
  const { pagination } = props;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.searchParams?.name ?? "";

  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/onboarding`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
    params: {
      limit,
      offset,
      search: name,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TOnboarding[] = result.map(
    (item: TOnboarding): TOnboarding => ({
      ...item,
    })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useFetchAllOnboarding = (props: IGetDataProps = {}) => {
  const { companyId, token } = useApiAuth();
  const { pagination, searchParams } = props;
  const queryData = useQuery(
    [QUERY_KEY_FOR_ONBOARDING, pagination?.limit, searchParams?.name, pagination?.offset],
    () =>
      getAllOnboarding({
        auth: {
          token,
          companyId,
        },
        props,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
