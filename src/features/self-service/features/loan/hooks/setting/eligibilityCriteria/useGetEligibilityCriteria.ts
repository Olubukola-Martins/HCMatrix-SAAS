import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { ICurrentCompany } from "types";
import { IEligibilityCriteriaProps } from "../../../types/setting";

export const QUERY_KEY_FOR_GET_ELIGIBILITY_CRITERIA = "GET_ELIGIBILITY_CRITERIA";

const getData = async (
  props: ICurrentCompany
): Promise<IEligibilityCriteriaProps> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/loan/setting/eligibility-criteria`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };
  const res = await axios.get(url, config);
  const item: IEligibilityCriteriaProps = res.data.data;
  const data: IEligibilityCriteriaProps = {
    ...item,
  };

  return data;
};
export const useGetEligibilityCriteria = () => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_GET_ELIGIBILITY_CRITERIA],
    () => getData({ token, companyId }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
