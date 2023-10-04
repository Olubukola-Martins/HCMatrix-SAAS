import axios from "axios";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { TBranch } from "../types";
import { useApiAuth } from "hooks/useApiAuth";

export const QUERY_KEY_FOR_SINGLE_BRANCH = "single-branch";

export interface IGetSingleBranchProps {
  branchId: number;
}

export const getSingleBranch = async (vals: {
  props: IGetSingleBranchProps;
  auth: ICurrentCompany;
}): Promise<TBranch> => {
  const { props, auth } = vals;
  const id = props.branchId;

  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/branch/${id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TBranch = res.data.data;

  return item;
};

export const useFetchSingleBranch = ({ branchId }: IGetSingleBranchProps) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_BRANCH, branchId],
    () =>
      getSingleBranch({
        props: {
          branchId,
        },
        auth: {
          companyId,

          token,
        },
      }),
    {
      // refetchInterval: false,
      // refetchIntervalInBackground: false,
      // refetchOnWindowFocus: false,
      onError: (err: any) => {},
    }
  );

  return queryData;
};
