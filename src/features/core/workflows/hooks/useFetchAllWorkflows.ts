import axios from "axios";
import { useApiAuth } from "hooks/useApiAuth";
import { useQuery } from "react-query";
import { IPaginationProps, ICurrentCompany, ISearchParams } from "types";
import { TAllWorkflow } from "../types/allWorkflows";
import { DEFAULT_PAGE_SIZE } from "constants/general";

// TO DO : need to exist in the general data entities and refactored
interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}

const getWorkflows = async (
  props: IGetDataProps & ICurrentCompany
): Promise<{ data: TAllWorkflow[]; total: number }> => {
  const { pagination } = props;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.searchParams?.name ?? "";
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/workflow`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
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

  const data: TAllWorkflow[] = result.map(
    (item: TAllWorkflow): TAllWorkflow => ({
      ...item,
    })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useFetchAllWorkflows = (props: IGetDataProps) => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    ["workflows", props.pagination],
    () =>
      getWorkflows({
        ...props,
        token,
        companyId,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
