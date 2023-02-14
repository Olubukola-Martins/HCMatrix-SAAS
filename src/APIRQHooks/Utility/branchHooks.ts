import {
  createBranch,
  getBranches,
  getSingleBranch,
  IGetSingleBranchProps,
  updateBranch,
} from "ApiRequesHelpers/Utility/branches";
import { TBranch } from "AppTypes/DataEntitities";
import { IPaginationProps } from "AppTypes/Pagination";
import { useSignOut } from "react-auth-kit";
import { useMutation, useQuery } from "react-query";

export const useCreateBranch = () => {
  return useMutation(createBranch);
};

export const useUpdateBranch = () => {
  return useMutation(updateBranch);
};
export const useFetchSingleBranch = ({
  branchId,
  companyId,

  token,
}: IGetSingleBranchProps) => {
  const signOut = useSignOut();

  const queryData = useQuery(
    ["single-branch", branchId],
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
      onError: (err: any) => {
        signOut();
        localStorage.clear();
      },

      select: (res: any) => {
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
      },
    }
  );

  return queryData;
};

interface IFRQDataProps {
  pagination?: IPaginationProps;
  companyId: string;
  onSuccess?: Function;
  token: string;
}
interface IFRQDataReturnProps {
  data: TBranch[];
  total: number;
}

export const useFetchBranches = ({
  pagination,
  companyId,
  onSuccess,
  token,
}: IFRQDataProps) => {
  const signOut = useSignOut();

  const queryData = useQuery(
    ["branches", pagination?.current, pagination?.limit],
    () =>
      getBranches({
        companyId,
        pagination: { limit: pagination?.limit, offset: pagination?.offset },
        token,
      }),
    {
      // refetchInterval: false,
      // refetchIntervalInBackground: false,
      // refetchOnWindowFocus: false,
      onError: (err: any) => {
        signOut();
        localStorage.clear();
      },
      onSuccess: (data) => {
        onSuccess && onSuccess(data);
      },

      select: (res: any) => {
        const fetchedData = res.data.data;
        const result = fetchedData.result;

        const data: TBranch[] = result.map(
          (item: any): TBranch => ({
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
          })
        );

        const ans: IFRQDataReturnProps = {
          data,
          total: fetchedData.totalCount,
        };

        return ans;
      },
    }
  );

  return queryData;
};
