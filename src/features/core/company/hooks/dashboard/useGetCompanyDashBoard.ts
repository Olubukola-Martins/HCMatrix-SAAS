import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";

import { useApiAuth } from "hooks/useApiAuth";
import { TCompanyDashboard } from "../../types/companyDashboard";

interface IGetDataProps {
  year?: string; // TODO: Flesh out when endpoint is ready
}
export const QUERY_KEY_FOR_COMPANY_DASHBOARD = "company-dashboard";
const getData = async (
  auth: ICurrentCompany,
  props: IGetDataProps
): Promise<TCompanyDashboard> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/company/dashboard`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
    params: {
      year: props?.year,
    },
  };

  const res = await axios.get(url, config);
  const item: TCompanyDashboard = res.data.data;

  const data: TCompanyDashboard = {
    ...item,
  };

  return data;
};

export const useGeTCompanyDashboard = (props: IGetDataProps = {}) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_COMPANY_DASHBOARD, props.year],
    () =>
      getData(
        { token, companyId },
        {
          ...props,
        }
      ),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
