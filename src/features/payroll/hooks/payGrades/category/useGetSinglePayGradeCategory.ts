import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TPayGradeCategory } from "features/payroll/types";

interface IDataProps {
  id: number;
}
export const QUERY_KEY_FOR_SINGLE_PAY_GRADE_CATEGORY =
  "single-paygrade-category";
const getData = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<TPayGradeCategory> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/grade/category/${props.data.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TPayGradeCategory = res.data.data;

  const data: TPayGradeCategory = {
    ...item,
  };

  return data;
};

export const useGetSinglePayGradeCategory = (props: IDataProps) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_PAY_GRADE_CATEGORY],
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
