import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TPayGrade } from "features/payroll/types";

interface IDataProps {
  id: number;
}
export const QUERY_KEY_FOR_SINGLE_PAY_GRADE = "single-paygrade";
const getData = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<TPayGrade> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/pay-grade/${props.data.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TPayGrade = res.data.data;

  const data: TPayGrade = {
    ...item,
  };

  return data;
};

export const useGetSinglePayGrade = (props: IDataProps) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_PAY_GRADE],
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
