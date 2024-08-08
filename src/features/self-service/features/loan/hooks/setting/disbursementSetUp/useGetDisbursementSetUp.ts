import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { ICurrentCompany } from "types";
import { IDisbursementProps } from "../../../types/setting";

export const QUERY_KEY_FOR_GET_DISBURSEMENT_SET_UP = "GET_DISBURSEMENT_SET_UP";

const getData = async (
  props: ICurrentCompany
): Promise<IDisbursementProps> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/loan/setting/disbursement`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };
  const res = await axios.get(url, config);
  const item: IDisbursementProps = res.data.data;
  const data: IDisbursementProps = {
    ...item,
  };

  return data;
};
export const useGetDisbursementSetUp = () => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_GET_DISBURSEMENT_SET_UP],
    () => getData({ token, companyId }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
