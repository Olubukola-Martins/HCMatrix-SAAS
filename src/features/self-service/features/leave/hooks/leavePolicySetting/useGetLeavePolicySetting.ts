import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TLeavePolicy } from "../../types";

interface IGetDataProps extends ICurrentCompany {}
export const QUERY_KEY_FOR_LEAVE_POLICY_SETTING = "leave-policy-setting";
const getData = async (props: IGetDataProps): Promise<TLeavePolicy> => {
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

export const useGetLeavePolicySetting = () => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_LEAVE_POLICY_SETTING],
    () =>
      getData({
        token,
        companyId,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
