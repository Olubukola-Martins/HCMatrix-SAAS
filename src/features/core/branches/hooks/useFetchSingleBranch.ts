import axios from "axios";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { TBranch } from "../types";

export const QUERY_KEY_FOR_SINGLE_BRANCH = "single-branch";

export interface IGetSingleBranchProps extends ICurrentCompany {
  branchId: number;
}

export const getSingleBranch = async (
  props: IGetSingleBranchProps
): Promise<TBranch> => {
  const id = props.branchId;

  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/branch/${id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data.data;

  const data: TBranch = {
    id: item.id,
    name: item.name,
    description: item.description,
    address: {
      streetAddress: item.address.streetAddress,
      countryId: item.address.countryId,
      stateId: item.address.stateId,
      lgaId: item.address.lgaId,
      timezone: item.address.timezone,
    },
    employeeCount: item?.employeeCount,
  };
  return data;
};

export const useFetchSingleBranch = ({
  branchId,
  companyId,

  token,
}: IGetSingleBranchProps) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_BRANCH, branchId],
    () =>
      getSingleBranch({
        companyId,
        branchId,

        token,
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
