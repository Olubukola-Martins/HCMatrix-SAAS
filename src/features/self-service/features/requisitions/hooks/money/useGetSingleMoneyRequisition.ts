import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { TMoneyRequisition } from "../../types/money";

interface IGetDataProps extends ICurrentCompany {
  id: number;
}
export const QUERY_KEY_FOR_SINGLE_MONEY_REQUISITION =
  "single-money-requisition";
const getData = async (props: IGetDataProps): Promise<TMoneyRequisition> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/requisition/money/${props.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TMoneyRequisition = res.data.data;

  const data: TMoneyRequisition = {
    ...item,
  };

  return data;
};

export const useGetSingleMoneyRequisition = (props: IGetDataProps) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_MONEY_REQUISITION, props.id],
    () =>
      getData({
        ...props,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
