import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TCostCentre } from "features/payroll/types";

interface IDataProps {
  id: number;
}
export const QUERY_KEY_FOR_SINGLE_COST_CENTRE = "single-cost-centre";
const getData = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<TCostCentre> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/cost-centre/${props.data.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TCostCentre = res.data.data;

  const data: TCostCentre = {
    ...item,
  };

  return data;
};

export const useGetSingleCostCentre = (props: IDataProps) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_COST_CENTRE],
    () =>
      getData({
        auth: {
          companyId,
          token,
        },
        data: { ...props },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
