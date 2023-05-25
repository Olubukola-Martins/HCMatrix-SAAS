import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { TReimbursementRequisition } from "../../types/reimbursement";

interface IGetDataProps extends ICurrentCompany {
  id: number;
}
export const QUERY_KEY_FOR_SINGLE_REIMBURSEMENT_REQUISITION =
  "single-reimbursement-requisition";
const getData = async (
  props: IGetDataProps
): Promise<TReimbursementRequisition> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/requisition/reimbursement/${props.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TReimbursementRequisition = res.data.data;

  const data: TReimbursementRequisition = {
    ...item,
  };

  return data;
};

export const useGetSingleReimbursementRequisition = (props: IGetDataProps) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_REIMBURSEMENT_REQUISITION, props.id],
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
