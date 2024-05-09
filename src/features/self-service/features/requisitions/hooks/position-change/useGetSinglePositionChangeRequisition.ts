import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { TPositionChangeRequisition } from "../../types/positionChange";

interface IGetDataProps extends ICurrentCompany {
  id: number;
}
export const QUERY_KEY_FOR_SINGLE_POSITION_CHANGE_REQUISITION =
  "single-position-change-requisition";
const getData = async (
  props: IGetDataProps
): Promise<TPositionChangeRequisition> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/requisition/position-change/${props.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TPositionChangeRequisition = res.data.data;

  const data: TPositionChangeRequisition = {
    ...item,
  };

  return data;
};

export const useGetSinglePositionChangeRequisition = (props: IGetDataProps) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_POSITION_CHANGE_REQUISITION, props.id],
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
