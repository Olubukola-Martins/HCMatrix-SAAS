import axios from "axios";
import { useQuery } from "react-query";
import { IGetSingleDesgProps, TDesignation } from "../types";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";

export const QUERY_KEY_FOR_SINGLE_DESIGNATION = "single-designation";
export const getSingleDesignation = async (vals: {
  props: IGetSingleDesgProps;
  auth: ICurrentCompany;
}): Promise<TDesignation> => {
  const { props, auth } = vals;
  const id = props.designationId;

  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/company/designation/${id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TDesignation = res.data.data;

  return item;
};

export const useFetchSingleDesignation = ({
  designationId,
}: IGetSingleDesgProps) => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_DESIGNATION, designationId],
    () =>
      getSingleDesignation({
        auth: {
          companyId,
          token,
        },
        props: {
          designationId,
        },
      }),
    {
      onError: (err: any) => {},
    }
  );

  return queryData;
};
