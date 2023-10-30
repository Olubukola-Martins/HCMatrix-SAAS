import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TLeaveCycle } from "../../types/leaveCycle";

export const QUERY_KEY_FOR_LEAVE_CYCLE = "leave-cycle";

const getData = async ({
  auth,
}: {
  auth: ICurrentCompany;
}): Promise<TLeaveCycle> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/leave/cycle`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TLeaveCycle = res.data.data;

  const data: TLeaveCycle = {
    ...item,
  };

  return data;
};

export const useGetLeaveCycle = () => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_LEAVE_CYCLE],
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
