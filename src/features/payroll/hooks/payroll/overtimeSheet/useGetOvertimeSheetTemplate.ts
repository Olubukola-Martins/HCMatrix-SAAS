import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";

type TResponse = any;
interface IDataProps {
  id?: number;
}
export const QUERY_KEY_FOR_PAYROLL_OVERTIME_SHEET = "payroll-overtime-sheet";
const getData = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<TResponse> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/payroll/${props.data.id}/overtime-sheet`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TResponse = res.data.data;

  const data: TResponse = {
    ...item,
  };

  return data;
};

export const useGetOvertimeSheetTemplate = (props: IDataProps) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_PAYROLL_OVERTIME_SHEET, props.id],
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
