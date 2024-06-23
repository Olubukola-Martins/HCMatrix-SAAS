import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { IPaginationProps } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { PostMySwapShiftRequestProps } from "../types";

export const QUERY_KEY_FOR_BIOMETRIC_DEVICE = "Biometric_Device";

const getData = async (props: {
  token: string;
  companyId: number;
  pagination?: IPaginationProps;
}): Promise<{ data: PostMySwapShiftRequestProps[]; total: number }> => {
  const limit = props.pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = props.pagination?.offset ?? 0;

  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/shift-swap/mine`;
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

  const res = await axios.get(url, config);

  const fetchedData = res.data.data;

  const result = fetchedData.result;

  const data: PostMySwapShiftRequestProps[] = result;

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};
export const useGetMyShiftSwapRequest = (props?: {
  pagination?: IPaginationProps;
}) => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_BIOMETRIC_DEVICE, props?.pagination],
    () => getData({ token, companyId, pagination: props?.pagination }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
