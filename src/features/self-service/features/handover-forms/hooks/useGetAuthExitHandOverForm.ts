import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { TTHandOverForm } from "../types";
import { useApiAuth } from "hooks/useApiAuth";

export const QUERY_KEY_FOR_AUTH_EXIT_HANDOVER_FORM = "auth-exit-handover-form";
const getData = async (auth: ICurrentCompany): Promise<TTHandOverForm> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/exit-handover-form/mine`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TTHandOverForm = res.data.data;

  const data: TTHandOverForm = {
    ...item,
  };

  return data;
};

export const useGetAuthExitHandOverForm = () => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_AUTH_EXIT_HANDOVER_FORM],
    () =>
      getData({
        companyId,
        token,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
