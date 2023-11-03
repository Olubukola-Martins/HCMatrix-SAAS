import axios from "axios";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { TDelegation } from "../types";
import { useApiAuth } from "hooks/useApiAuth";

interface IGetDataProps {
  id: number;
}

export const QUERY_KEY_FOR_SINGLE_DELEGATION = "single-delegation";

const getDelegation = async (vals: {
  props: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<TDelegation> => {
  const { props, auth } = vals;

  const url = `${process.env.REACT_APP_AUTHENTICATION_BASE_URL}/permission/delegation/${props.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TDelegation = res.data.data;

  return item;
};

export const useFetchSingleDelegation = (props: IGetDataProps) => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_DELEGATION, props.id],
    () =>
      getDelegation({
        auth: {
          token,
          companyId,
        },
        props,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
