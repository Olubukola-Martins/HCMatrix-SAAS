import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TSinglePayroll } from "features/payroll/types";

interface IDataProps {
  id?: number;
}
export const QUERY_KEY_FOR_SINGLE_PAYROLL = "single-payroll";
const getData = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<TSinglePayroll> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/payroll/${props.data.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TSinglePayroll = res.data.data;

  const data: TSinglePayroll = {
    ...item,
  };

  return data;
};

export const useGetSinglePayroll = (props: IDataProps) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_PAYROLL],
    () =>
      getData({
        auth: {
          companyId,
          token,
        },
        data: { ...props },
      }),
    {
      enabled: props.id === undefined ? false : true,
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
