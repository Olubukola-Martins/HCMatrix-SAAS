import axios from "axios";
import { useQuery } from "react-query";
import { IPaginationProps, ISearchParams } from "types";
import { TPaystackBank } from "types/paystackBank";

interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}

export const QUERY_KEY_FOR_PAYSTACK_BANKS = "paystack-banks";

const getData = async (props: {
  data?: IGetDataProps;
}): Promise<{ data: TPaystackBank[]; total: number }> => {
  const url = `https://api.paystack.co/bank`;

  const config = {
    headers: {
      Accept: "application/json",
    },
    params: {},
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData;

  const data: TPaystackBank[] = result.map(
    (item: TPaystackBank): TPaystackBank => ({ ...item })
  );

  const ans = {
    data,
    total: data.length,
  };

  return ans;
};

export const useGetBanksFromPaystack = (props: IGetDataProps = {}) => {
  const { pagination, searchParams } = props;
  const queryData = useQuery(
    [QUERY_KEY_FOR_PAYSTACK_BANKS, pagination, searchParams],
    () =>
      getData({
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
