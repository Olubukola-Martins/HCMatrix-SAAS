import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { ICurrentCompany } from "types";
import { IApprovalProcessProps } from "../../../types/setting";

export const QUERY_KEY_FOR_GET_APPROVAL_PROCESS = "companyPolicy";

const getData = async (
  props: ICurrentCompany
): Promise<IApprovalProcessProps> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/loan/setting/approval`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };
  const res = await axios.get(url, config);
  const item: IApprovalProcessProps = res.data.data;
  const data: IApprovalProcessProps = {
    ...item,
  };

  return data;
};
export const useGetApprovalProcess = () => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_GET_APPROVAL_PROCESS],
    () => getData({ token, companyId }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
