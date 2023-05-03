import axios from "axios";
import { useApiAuth } from "hooks/useApiAuth";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { TSingleWorkflow } from "../types";

export const QUERY_KEY_FOR_SINGLE_WORKFLOW = "single-workflow";

// TO DO : need to exist in the general data entities and refactored
interface IGetDataProps {
  id?: number;
}

const getSingleWorkflow = async (
  props: IGetDataProps & ICurrentCompany
): Promise<TSingleWorkflow> => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/workflow/${props.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TSingleWorkflow = res.data.data;

  return item;
};

export const useFetchSingleWorkflow = (props: IGetDataProps) => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_WORKFLOW, props.id],
    () =>
      getSingleWorkflow({
        ...props,
        token,
        companyId,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      // ...preventUnnecessaryRefresh
    }
  );

  return queryData;
};
