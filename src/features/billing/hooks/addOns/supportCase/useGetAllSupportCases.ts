import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TSupportCase } from "features/billing/types/addOns/supportCase";

export const QUERY_KEY_FOR_SUPPORT_CASES = "support-cases";

const getData = async (props: {
  auth: ICurrentCompany;
}): Promise<{ data: TSupportCase[]; total: number }> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription/add-ons/support-case`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const result = res.data.data;

  const data: TSupportCase[] = result.map(
    (item: TSupportCase): TSupportCase => ({ ...item })
  );

  const ans = {
    data,
    total: data.length,
  };

  return ans;
};

export const useGetAllTrainingSessions = () => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_SUPPORT_CASES],
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
