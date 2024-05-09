import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { useApiAuth } from "hooks/useApiAuth";
import { TStorageTransaction } from "features/billing/types/addOns/extraStorage/strorageTransaction";

interface IGetDataProps {
  pagination?: IPaginationProps;
}

export const QUERY_KEY_FOR_ALL_STORAGE_TRANSACTIONS =
  "all-storage-transactions";

const getData = async (props: {
  data: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<{ data: TStorageTransaction[]; total: number }> => {
  const { pagination } = props.data;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;

  let url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription/add-ons/extra-storage/transaction`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
    params: {
      limit,
      offset,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TStorageTransaction[] = result.map(
    (item: TStorageTransaction): TStorageTransaction => ({
      ...item,
    })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetAllStorageTransactions = ({
  props,
}: {
  props: IGetDataProps;
}) => {
  const { token, companyId } = useApiAuth();

  const { pagination } = props;
  const queryData = useQuery(
    [QUERY_KEY_FOR_ALL_STORAGE_TRANSACTIONS, pagination],
    () =>
      getData({
        auth: { token, companyId },
        data: {
          ...props,
        },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
