import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { TLeavePolicy } from "../types";

// TO DO : need to exist in the general data entities and refactored
interface IGetDataProps extends ICurrentCompany {}
export const QUERY_KEY_FOR_LEAVE_POLICY = "leave-policy";
const getLeave = async (props: IGetDataProps): Promise<TLeavePolicy> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/leave/policy-setting`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TLeavePolicy = res.data.data;

  const data: TLeavePolicy = {
    ...item,
  };

  return data;
};

export const useFetchLeavePolicy = (props: IGetDataProps) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_LEAVE_POLICY, props.companyId],
    () =>
      getLeave({
        ...props,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
