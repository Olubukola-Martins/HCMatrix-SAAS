import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TLeaveType } from "../../types";

interface IDataProps {
  id: number;
}
export const QUERY_KEY_FOR_SINGLE_LEAVE_TYPE = "single-leave-type";
const getData = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<TLeaveType> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/leave/type/${props.data.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TLeaveType = res.data.data;

  const data: TLeaveType = {
    ...item,
  };

  return data;
};

export const useGetSingleLeaveType = (props: IDataProps) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_LEAVE_TYPE, props.id],
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
