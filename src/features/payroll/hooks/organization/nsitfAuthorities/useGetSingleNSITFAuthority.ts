import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TTaxAuthority } from "features/payroll/types";

interface IDataProps {
  id: number;
}
export const QUERY_KEY_FOR_SINGLE_NSITF_AUTHORITY = "single-nsitf-authority";
export const getSingleNsitfAuthority = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<TTaxAuthority> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/organization/nsitf-authority/${props.data.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TTaxAuthority = res.data.data;

  const data: TTaxAuthority = {
    ...item,
  };

  return data;
};

export const useGetSingleNSITFAuthority = (props: IDataProps) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_NSITF_AUTHORITY],
    () =>
      getSingleNsitfAuthority({
        auth: {
          companyId,
          token,
        },
        data: { ...props },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
