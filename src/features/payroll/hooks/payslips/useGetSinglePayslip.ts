import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TSinglePayslip } from "features/payroll/types/payslip";

interface IDataProps {
  id: number;
}
export const QUERY_KEY_FOR_SINGLE_PAYSLIP = "single-payslip";
const getData = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<TSinglePayslip> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/payslip/${props.data.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TSinglePayslip = res.data.data;

  const data: TSinglePayslip = {
    ...item,
  };

  return data;
};

export const useGetSinglePayslip = (props: IDataProps) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_PAYSLIP],
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
