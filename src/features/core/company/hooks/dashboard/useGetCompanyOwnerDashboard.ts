import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TCompanyOwnerDashboard } from "../../types/companyDashboard";

interface IGetDataProps {
  year?: string;
}
export const QUERY_KEY_FOR_COMPANY_OWNER_DASHBOARD = "company-dashboard-owner";
const getData = async (
  auth: ICurrentCompany,
  props: IGetDataProps
): Promise<TCompanyOwnerDashboard> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/company/dashboard/owner`;

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
  const item: TCompanyOwnerDashboard = res.data.data;

  const data: TCompanyOwnerDashboard = {
    ...item,
  };

  return data;
};

export const useGetCompanyOwnerDashboard = (props: IGetDataProps = {}) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_COMPANY_OWNER_DASHBOARD, props.year],
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
